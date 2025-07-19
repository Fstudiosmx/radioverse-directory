
'use client';

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Crown, Gift, Image as ImageIcon, Frame, Palette, Radio, Ticket, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";


const shopItems = [
    { name: "Banner de Perfil 'Synthwave'", price: 1500, icon: <ImageIcon className="w-10 h-10 text-primary" /> },
    { name: "Marco de Insignia 'Dorado'", price: 2500, icon: <Frame className="w-10 h-10 text-primary" /> },
    { name: "Color de Nombre 'Neón'", price: 5000, icon: <Palette className="w-10 h-10 text-primary" /> },
    { name: "Paquete de Reacciones Exclusivo", price: 3000, icon: <Gift className="w-10 h-10 text-primary" /> },
];

const missions = [
    { name: "Oyente Diario", description: "Escucha 1 hora de radio.", reward: 50, completed: true },
    { name: "Explorador de Géneros", description: "Escucha 5 géneros diferentes.", reward: 100, completed: true },
    { name: "Participante de Evento", description: "Únete a un concurso o evento en vivo.", reward: 250, completed: false },
    { name: "Lealtad Semanal", description: "Inicia sesión 7 días seguidos.", reward: 500, completed: false },
];

const CircusTent = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M12 2L2 12h20L12 2z" clipPath="url(#tent-clip)" fill="#e22929" stroke="#e22929" strokeWidth="1"/>
        <path d="M12 2L2 12h20L12 2z" />
        <path d="M4 12v10" />
        <path d="M20 12v10" />
        <path d="M4 22h16" />
        <path d="M8 12v10" />
        <path d="M16 12v10" />
        <path d="M12 12v10" />
        <defs>
            <clipPath id="tent-clip">
                <path d="M12 2L2 12h20L12 2z"/>
            </clipPath>
        </defs>
    </svg>
)

const roulettePrizes = [
    { name: "Marco de Perfil 'Galaxia'", type: 'cosmetic', description: "Un marco animado de estrellas para tu avatar.", icon: <Frame className="w-10 h-10 text-primary" /> },
    { name: "¡Nada por aquí!", type: 'nothing', description: "Mejor suerte para la próxima.", icon: <Zap className="w-10 h-10 text-muted-foreground" /> },
    { name: "Insignia 'Evento del Circo'", type: 'badge', description: "Insignia exclusiva del evento de la ruleta de julio.", icon: <CircusTent /> },
    { name: "Color de Nombre 'Arcoíris'", type: 'cosmetic', description: "Un color de nombre que cambia dinámicamente.", icon: <Palette className="w-10 h-10 text-primary" /> },
    { name: "1000 VerseCoins", type: 'currency', description: "¡Un bono de 1000 VerseCoins para tu billetera!", icon: <Gift className="w-10 h-10 text-primary" /> },
    { name: "Emoticono de Payaso 🤡", type: 'emoji', description: "Un emoji 🤡 exclusivo para usar junto a tu nombre.", icon: <span className="text-4xl">🤡</span> },
];

export default function VerseShopPage() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [prize, setPrize] = useState<(typeof roulettePrizes)[number] | null>(null);

    const handleSpin = () => {
        setIsSpinning(true);
        setPrize(null);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * roulettePrizes.length);
            setPrize(roulettePrizes[randomIndex]);
            setIsSpinning(false);
        }, 2000); // Simulate a 2-second spin
    };


  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="VerseShop"
        description="Usa tus VerseCoins para desbloquear personalizaciones de perfil exclusivas."
      />

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline text-2xl">Tu Billetera</CardTitle>
                <CardDescription>¡Gasta tus monedas con sabiduría!</CardDescription>
            </div>
            <div className="text-3xl font-bold flex items-center gap-2 text-blue-500">
                <span>1,250</span> <span role="img" aria-label="VerseCoin">💙</span>
            </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="shop" className="w-full pt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shop">Tienda</TabsTrigger>
          <TabsTrigger value="missions">Misiones</TabsTrigger>
          <TabsTrigger value="roulette">RuleVerse</TabsTrigger>
        </TabsList>

        <TabsContent value="shop">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {shopItems.map((item) => (
              <Card key={item.name} className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                        {item.icon}
                    </div>
                  <CardTitle className="font-headline text-xl">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold flex items-center justify-center gap-1.5 text-blue-500">
                    {item.price.toLocaleString()} <span role="img" aria-label="VerseCoin">💙</span>
                  </p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Comprar</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="missions">
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Misiones Diarias y Semanales</CardTitle>
                    <CardDescription>Completa estas tareas para ganar más VerseCoins.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {missions.map(mission => (
                        <div key={mission.name} className="flex items-center justify-between p-4 border rounded-lg">
                           <div className="flex items-center gap-4">
                                <div className={cn("p-3 rounded-full", mission.completed ? 'bg-green-100 dark:bg-green-900/50' : 'bg-muted')}>
                                    {mission.completed ? <CheckCircle className="w-6 h-6 text-green-500"/> : <Zap className="w-6 h-6 text-muted-foreground"/>}
                                </div>
                                <div>
                                    <p className="font-semibold">{mission.name}</p>
                                    <p className="text-sm text-muted-foreground">{mission.description}</p>
                                </div>
                           </div>
                           <Badge variant={mission.completed ? "secondary" : "default"} className="text-base">
                                +{mission.reward} <span className="ml-1.5" role="img" aria-label="VerseCoin">💙</span>
                            </Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="roulette">
            <Card className="mt-6 text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                        <Crown className="w-12 h-12 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-headline">RuleVerse de la Suerte</CardTitle>
                    <CardDescription>¡Gira la ruleta y gana premios exclusivos que no están en la tienda!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className={cn("w-64 h-64 bg-muted border-4 border-dashed rounded-full mx-auto flex items-center justify-center transition-all", isSpinning && "animate-spin")}>
                        <p className="text-muted-foreground font-bold text-2xl">?</p>
                    </div>
                    <Button size="lg" onClick={handleSpin} disabled={isSpinning}>
                        {isSpinning ? (
                            <>Girando...</>
                        ) : (
                            <><Ticket className="w-5 h-5 mr-2"/>Girar por 100 <span className="ml-1.5" role="img" aria-label="VerseCoin">💙</span></>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={!!prize} onOpenChange={() => setPrize(null)}>
        <AlertDialogContent>
            <AlertDialogHeader className="items-center text-center">
                <AlertDialogTitle>¡Has ganado!</AlertDialogTitle>
                <AlertDialogDescription>
                    La ruleta ha hablado. Tu premio es:
                </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="text-center p-4 rounded-lg bg-muted flex flex-col items-center gap-4">
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    {prize?.icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold">{prize?.name}</h3>
                    <p className="text-muted-foreground">{prize?.description}</p>
                </div>
            </div>
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => setPrize(null)} className="w-full">¡Genial!</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
