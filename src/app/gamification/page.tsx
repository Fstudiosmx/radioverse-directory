

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BarChart3, Star, Zap } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const pillars = [
    { icon: <Star className="w-8 h-8 text-yellow-500" />, title: "Puntos de Experiencia (XP)", description: "Gana XP simplemente escuchando y participando. Sube de nivel y demuestra tu lealtad." },
    { icon: <BarChart3 className="w-8 h-8 text-green-500" />, title: "Tablas de Clasificación", description: "Compite con otros oyentes por el primer puesto en tus estaciones favoritas y en toda la plataforma." },
    { icon: <Award className="w-8 h-8 text-blue-500" />, title: "Insignias y Logros", description: "Colecciona insignias únicas por tus logros, asistencia a eventos y contribuciones a la comunidad." },
    { icon: <Zap className="w-8 h-8 text-purple-500" />, title: "VerseCoins", description: "La moneda de nuestra comunidad. Gánala en misiones y úsala para personalizar tu perfil en la VerseShop." },
];

export default function GamificationPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Nuestra Filosofía de Gamificación"
        description="Porque amamos la radio, la gamificación y nuestra comunidad."
      />
      <div className="max-w-4xl mx-auto pt-6 space-y-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-center">Más que solo escuchar: Una Experiencia Interactiva</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center max-w-prose mx-auto">
              En RadioVerse, creemos que ser parte de una comunidad de radio es más que presionar "play". Se trata de la conexión, el descubrimiento y la pasión compartida. Por eso, hemos integrado un sistema de gamificación en el núcleo de nuestra plataforma. No se trata solo de juegos; es nuestra forma de reconocer y recompensar tu lealtad, tu curiosidad y tu participación. Queremos que cada hora que pases con nosotros sea gratificante y te haga sentir una parte vital de este universo.
            </p>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl text-center">Los Pilares de Nuestra Gamificación</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pillars.map(pillar => (
                    <div key={pillar.title} className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                            {pillar.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{pillar.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card className="bg-primary/5">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="font-headline text-2xl font-bold">Sumérgete en la Acción</h3>
                    <p className="text-muted-foreground">¡Explora las tablas de clasificación y mira cómo te posicionas!</p>
                </div>
                <Button asChild size="lg">
                    <Link href="/leaderboard">
                        Ver Leaderboard <ArrowRight className="ml-2 w-5 h-5"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>

         <Alert variant="info">
            <Zap className="h-4 w-4" />
            <AlertTitle>Para Creadores y Oyentes</AlertTitle>
            <AlertDescription>
                Nuestro sistema de gamificación está diseñado para beneficiar a todos. Los oyentes son recompensados por su lealtad, mientras que los creadores obtienen herramientas poderosas para fomentar una comunidad activa y comprometida alrededor de su contenido.
            </AlertDescription>
        </Alert>

      </div>
    </div>
  );
}
