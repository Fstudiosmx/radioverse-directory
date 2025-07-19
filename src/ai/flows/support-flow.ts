
'use server';

/**
 * @fileOverview A support chat flow that can escalate to a human agent.
 *
 * - supportChat - A function that handles a support conversation.
 * - SupportInput - The input type for the supportChat function.
 * - SupportOutput - The return type for the supportChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { customAlphabet } from 'nanoid';

// Define a tool to escalate to a human agent
const createSupportTicket = ai.defineTool(
    {
        name: 'createSupportTicket',
        description: 'Use this tool ONLY when the user explicitly asks to speak to a human or when you cannot resolve their issue after attempting to help. This creates a ticket for a human support agent.',
        inputSchema: z.object({
            summary: z.string().describe('A brief summary of the user\'s problem.'),
        }),
        outputSchema: z.string().describe('The generated ticket ID.'),
    },
    async ({ summary }) => {
        console.log(`Support ticket created for: ${summary}`);
        // Generate a unique, friendly ticket ID
        const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8);
        return `RV-${nanoid()}`;
    }
);


const SupportInputSchema = z.object({
  query: z.string().describe('The user\'s question or problem.'),
  userName: z.string().describe('The name of the user asking the question.'),
});
export type SupportInput = z.infer<typeof SupportInputSchema>;

const SupportOutputSchema = z.object({
  reply: z.string().describe('The AI assistant\'s response to the user.'),
  escalate: z.boolean().describe('Set to true if a support ticket was created.'),
  ticketId: z.string().optional().describe('The ID of the created support ticket, if applicable.'),
});
export type SupportOutput = z.infer<typeof SupportOutputSchema>;


const supportPrompt = ai.definePrompt({
    name: 'supportChatPrompt',
    tools: [createSupportTicket],
    system: `You are a friendly and helpful AI support assistant for a platform called RadioVerse.
    Your goal is to assist users with their problems. Be concise and clear.
    - If the user is asking about pricing, station submission, or general features, provide a helpful answer.
    - If the user's problem is complex (e.g., technical issues with streaming, billing problems, account deletion), or if they explicitly ask to talk to a person, you MUST use the 'createSupportTicket' tool to escalate the issue.
    - When you create a ticket, inform the user that a human agent will contact them and provide the ticket ID.
    - The user's name is: {{userName}}. Address them by their name.
    `,
});


export async function supportChat(input: SupportInput): Promise<SupportOutput> {
    const llmResponse = await supportPrompt({
        prompt: input.query,
        context: { userName: input.userName },
    });

    const toolCalls = llmResponse.toolCalls();

    if (toolCalls.length > 0) {
        const ticketCall = toolCalls.find(call => call.name === 'createSupportTicket');
        if (ticketCall) {
            const ticketId = ticketCall.output as string;
            return {
                reply: `No te preocupes, ${input.userName}. He creado un ticket de soporte para ti. Un agente humano revisará tu caso y se pondrá en contacto contigo por correo electrónico.`,
                escalate: true,
                ticketId: ticketId,
            }
        }
    }
    
    return {
        reply: llmResponse.text(),
        escalate: false,
    };
}
