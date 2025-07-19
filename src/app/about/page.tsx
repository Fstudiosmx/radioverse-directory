
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake, Heart, Lightbulb, Milestone, Target, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const values = [
    { icon: <Lightbulb className="w-8 h-8 text-primary" />, title: "Innovación Constante", description: "Buscamos continuamente nuevas formas de empoderar a los creadores con herramientas de vanguardia." },
    { icon: <Users className="w-8 h-8 text-primary" />, title: "Comunidad Primero", description: "Construimos un ecosistema donde los creadores y oyentes pueden conectar, colaborar y crecer juntos." },
    { icon: <Heart className="w-8 h-8 text-primary" />, title: "Pasión por el Contenido", description: "Amamos la radio, los podcasts y la TV. Nuestra pasión nos impulsa a ofrecer la mejor plataforma posible." },
];

const alliances = [
    { name: "Estación Kusmedios", logo: "https://placehold.co/150x50.png", url: "https://estacionkusmedios.org", dataAiHint: "media logo" },
    { name: "EsmeroSound", logo: "https://placehold.co/150x50.png", url: "https://esmerosound.com", dataAiHint: "sound logo" },
];

export default function AboutPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Sobre RadioVerse"
        description="Nuestra historia, nuestra misión y el futuro que estamos construyendo juntos."
      />
      <div className="max-w-4xl mx-auto pt-6 space-y-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-center">Nuestra Misión y Visión</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="space-y-2">
                <Target className="w-12 h-12 text-primary mx-auto" />
                <h3 className="font-semibold text-xl">Misión</h3>
                <p className="text-muted-foreground">
                    Empoderar a creadores de audio y video de todos los tamaños con una plataforma todo-en-uno, intuitiva y potente para que puedan construir, gestionar y monetizar su contenido sin barreras técnicas.
                </p>
            </div>
             <div className="space-y-2">
                <Milestone className="w-12 h-12 text-primary mx-auto" />
                <h3 className="font-semibold text-xl">Visión</h3>
                <p className="text-muted-foreground">
                    Convertirnos en el ecosistema digital líder para broadcasters independientes a nivel mundial, fomentando una comunidad vibrante y diversa donde cada voz tiene el potencial de ser escuchada.
                </p>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl text-center">Nuestros Valores</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map(value => (
                    <div key={value.title} className="text-center p-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            {value.icon}
                        </div>
                        <h3 className="text-lg font-semibold">{value.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{value.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="text-center">
                <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20">
                    <AvatarImage src="https://images.unsplash.com/photo-1596724033623-81e8081604a1?w=128&h=128&fit=crop" alt="Chuy Hasmer" data-ai-hint="hamster" />
                    <AvatarFallback>🐹</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-3xl mt-4">Conoce a Chuy Hasmer</CardTitle>
                 <CardDescription>Nuestra Mascota Oficial</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground text-center max-w-prose mx-auto">
                   ¡Te presentamos a Chuy Hasmer! Él es el corazón y el espíritu de RadioVerse. Atrevido, capaz y siempre genial, Chuy representa nuestra pasión por la tecnología y la comunidad. Lo verás por la plataforma, ¡asegurándose de que todo funcione a la perfección y añadiendo un toque de diversión!
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl text-center">Nuestra Historia</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center max-w-prose mx-auto">
                    RadioVerse nació de una idea simple: la creación de contenido de radio y video online debería ser accesible para todos, no solo para las grandes corporaciones. Lo que comenzó como un pequeño proyecto en 2024 para simplificar la gestión de estaciones de radio, ha evolucionado hasta convertirse en una plataforma integral que ahora soporta podcasts, canales de TV y minisites personalizados. Cada nueva función ha sido impulsada por las necesidades y sueños de nuestra creciente comunidad de creadores.
                </p>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl text-center flex items-center justify-center gap-3"><Handshake/> Alianzas Estratégicas</CardTitle>
                 <CardDescription className="text-center">Estamos orgullosos de colaborar con organizaciones que comparten nuestra visión.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row justify-center items-center gap-8">
                {alliances.map(alliance => (
                     <a key={alliance.name} href={alliance.url} target="_blank" rel="noopener noreferrer" className="block text-center filter grayscale hover:grayscale-0 transition-all">
                        <Image src={alliance.logo} alt={alliance.name} width={150} height={50} data-ai-hint={alliance.dataAiHint}/>
                        <p className="text-sm font-semibold mt-2">{alliance.name}</p>
                    </a>
                ))}
            </CardContent>
        </Card>

        <Card className="bg-primary/5">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="font-headline text-2xl font-bold">Explora Nuestro Futuro</h3>
                    <p className="text-muted-foreground">Vea lo que estamos construyendo a continuación y cómo planeamos seguir innovando.</p>
                </div>
                <Button asChild size="lg">
                    <Link href="/roadmap">
                        Ver la Hoja de Ruta <ArrowRight className="ml-2 w-5 h-5"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
