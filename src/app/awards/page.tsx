
'use client';

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Mic, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const awardCategories = [
    { id: 'station-of-the-year', title: 'Estación del Año', description: 'Reconociendo a la emisora con el contenido más consistente, de alta calidad y con mayor engagement.', icon: <Trophy className="w-8 h-8 text-yellow-500" /> },
    { id: 'best-new-creator', title: 'Mejor Creador Nuevo', description: 'Celebrando al broadcaster más prometedor que se unió a RadioVerse este año.', icon: <Mic className="w-8 h-8 text-blue-500" /> },
    { id: 'community-choice', title: 'Premio de la Comunidad', description: 'La emisora o creador más votado directamente por la comunidad de RadioVerse.', icon: <Users className="w-8 h-8 text-green-500" /> },
];

export default function AwardsPage() {
  const [voted, setVoted] = useState<string | null>(null);
  const { toast } = useToast();

  const handleVote = (categoryId: string) => {
    setVoted(categoryId);
    toast({
      title: "¡Voto Registrado!",
      description: "Gracias por participar en los Premios RadioVerse 2024.",
    });
  };

  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Premios RadioVerse 2024"
        description="Celebrando lo mejor de lo mejor en nuestra comunidad."
      />
      <div className="max-w-6xl mx-auto pt-6">
        <Card>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    <Trophy className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-3xl font-headline">¡Vota por tus Favoritos!</CardTitle>
                <CardDescription>Elige un nominado en cada categoría. ¡Tu voto cuenta!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {awardCategories.map(category => (
                        <Card key={category.id} className="text-center p-4 flex flex-col">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                {category.icon}
                            </div>
                            <h3 className="font-headline text-2xl">{category.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2 flex-grow">{category.description}</p>
                            <Button 
                              className="mt-4" 
                              onClick={() => handleVote(category.id)}
                              disabled={!!voted}
                            >
                                {voted === category.id ? <><CheckCircle className="w-5 h-5 mr-2"/> ¡Votado!</> : 'Votar Ahora'}
                            </Button>
                        </Card>
                    ))}
                </div>
                 <div className="text-center mt-12">
                     <Button size="lg" asChild variant="outline">
                        <Link href="/events">
                          <Calendar className="w-5 h-5 mr-2"/>
                          Ver Calendario de Eventos
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
