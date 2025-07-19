
'use server';

/**
 * @fileOverview A flow for translating text using Google AI.
 *
 * - translateText - A function that handles the text translation process.
 * - TranslateInput - The input type for the translateText function.
 * - TranslateOutput - The return type for the translateText function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TranslateInputSchema = z.object({
  text: z.string().describe('The text to be translated.'),
  targetLanguage: z
    .string()
    .describe(
      'The target language for the translation (e.g., "es" for Spanish, "pt" for Portuguese).'
    ),
});
export type TranslateInput = z.infer<typeof TranslateInputSchema>;

const TranslateOutputSchema = z.object({
  translation: z.string().describe('The translated text.'),
});
export type TranslateOutput = z.infer<typeof TranslateOutputSchema>;

export async function translateText(
  input: TranslateInput
): Promise<TranslateOutput> {
  return translateTextFlow(input);
}

const translationPrompt = ai.definePrompt({
  name: 'translationPrompt',
  input: { schema: TranslateInputSchema },
  output: { schema: TranslateOutputSchema },
  prompt: `Translate the following text to {{targetLanguage}}.
Only return the translated text, without any additional explanations or context.

Text to translate:
"{{{text}}}"
`,
  config: {
    model: 'googleai/gemini-2.0-flash',
    temperature: 0.3,
  },
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateInputSchema,
    outputSchema: TranslateOutputSchema,
  },
  async (input) => {
    const { output } = await translationPrompt(input);
    if (!output) {
      throw new Error('Translation failed: No output from the model.');
    }
    return output;
  }
);
