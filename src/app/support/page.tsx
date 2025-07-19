
'use client';

import { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, Ticket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { supportChat } from "@/ai/flows/support-flow";
import { toast } from "sonner";
import { addSupportTicket } from "../admin/actions";


interface Message {
    sender: 'user' | 'bot';
    text: string;
}

export default function SupportPage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: '¡Hola! Soy el asistente virtual de RadioVerse. ¿En qué puedo ayudarte hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);
    
    const createTicketDirectly = async () => {
        const directTicketQuery = "El usuario ha solicitado crear un ticket directamente sin interactuar con el chat.";
        setIsLoading(true);

        const userMessage: Message = { sender: 'user', text: "Prefiero crear un ticket de soporte directamente." };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await supportChat({ query: directTicketQuery, userName: user?.displayName || 'Usuario' });
            
            if (response.escalate) {
                const escalationMessage: Message = { sender: 'bot', text: 'Entendido. He creado un ticket de soporte para ti. Un miembro del equipo se pondrá en contacto contigo pronto. El ID de tu ticket es: ' + response.ticketId };
                setMessages(prev => [...prev, escalationMessage]);
                await addSupportTicket({
                    id: response.ticketId!,
                    userName: user?.displayName || 'Usuario',
                    query: directTicketQuery,
                    status: 'Open'
                });
                toast.success("Ticket de soporte creado", { description: `ID del Ticket: ${response.ticketId}` });
            } else {
                 const botMessage: Message = { sender: 'bot', text: response.reply };
                 setMessages(prev => [...prev, botMessage]);
            }

        } catch (error) {
            console.error("AI support chat error:", error);
            const errorMessage: Message = { sender: 'bot', text: 'Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta de nuevo más tarde.' };
            setMessages(prev => [...prev, errorMessage]);
            toast.error("Error del asistente de IA");
        } finally {
            setIsLoading(false);
        }
    }


    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        try {
            const response = await supportChat({ query: input, userName: user?.displayName || 'Usuario' });
            
            const botMessage: Message = { sender: 'bot', text: response.reply };
            setMessages(prev => [...prev, botMessage]);

            if (response.escalate) {
                const escalationMessage: Message = { sender: 'bot', text: 'He creado un ticket de soporte. Un miembro del equipo se pondrá en contacto contigo pronto. El ID de tu ticket es: ' + response.ticketId };
                setMessages(prev => [...prev, escalationMessage]);
                await addSupportTicket({
                    id: response.ticketId!,
                    userName: user?.displayName || 'Usuario',
                    query: input,
                    status: 'Open'
                });
                toast.success("Ticket de soporte creado", { description: `ID del Ticket: ${response.ticketId}` });
            }

        } catch (error) {
            console.error("AI support chat error:", error);
            const errorMessage: Message = { sender: 'bot', text: 'Lo siento, estoy teniendo problemas para conectarme. Por favor, intenta de nuevo más tarde.' };
            setMessages(prev => [...prev, errorMessage]);
            toast.error("Error del asistente de IA");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="Centro de Soporte"
                description="Habla con nuestro asistente de IA o contacta a nuestro equipo."
            />
            <div className="flex justify-center items-start pt-6">
                <Card className="w-full max-w-2xl">
                    <CardContent className="p-6">
                        <div className="flex flex-col h-[60vh]">
                            <div className="flex-grow p-4 border rounded-lg bg-muted/50 overflow-y-auto mb-4 space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={cn("flex items-start gap-3", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                                        {msg.sender === 'bot' && (
                                            <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                                                <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn("max-w-xs md:max-w-md p-3 rounded-lg", msg.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-background")}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                         {msg.sender === 'user' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'}/>
                                                <AvatarFallback>{user?.displayName?.charAt(0) || <User />}</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            
                            <div className="text-center text-sm text-muted-foreground mb-2">
                                ¿Prefieres no chatear? <Button variant="link" className="p-0 h-auto" onClick={createTicketDirectly}>Crea un ticket directamente.</Button>
                            </div>

                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Textarea
                                    placeholder="Describe tu problema aquí..."
                                    className="flex-grow"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            handleSendMessage(e);
                                        }
                                    }}
                                    disabled={isLoading}
                                />
                                <Button type="submit" disabled={isLoading || !input.trim()}>
                                    {isLoading ? 'Enviando...' : <Send className="w-4 h-4" />}
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
