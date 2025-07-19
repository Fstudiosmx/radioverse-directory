
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GraduationCap, Brain, Radio, RadioTower, Award, Tv, Mic, Settings, LifeBuoy, PlayCircle } from "lucide-react";

const trainingBadges = [
    { name: 'Mega Búho', icon: <GraduationCap className="w-8 h-8 text-cyan-500" /> },
    { name: 'Inteligente', icon: <Brain className="w-8 h-8 text-sky-500" /> },
    { name: 'Gran Radiólogo', icon: <Radio className="w-8 h-8 text-rose-500" /> },
    { name: 'Súper Radio', icon: <RadioTower className="w-8 h-8 text-lime-500" /> },
    { name: 'Embajador de la Radio', icon: <Award className="w-8 h-8 text-amber-500" /> },
];

export default function TrainingCenterPage() {
    return (
        <div className="flex-1 space-y-4 pt-6">
            <PageHeader
                title="Centro de Formación Radial"
                description="Adiós a los dolores de cabeza. Aquí encontrarás todo para iniciar tu radio."
            />
            <div className="max-w-6xl mx-auto pt-6 space-y-12">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                            <GraduationCap className="w-12 h-12 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-3xl">¡Bienvenido al Centro de Formación!</CardTitle>
                        <CardDescription className="max-w-prose mx-auto">
                            Nuestra misión es empoderarte. Aquí te proporcionamos las guías y herramientas necesarias para que puedas lanzar y gestionar tu estación de radio como un profesional, sin complicaciones.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Mic className="w-6 h-6" /> ¿Qué Equipo Necesito para Empezar?</CardTitle>
                        <CardDescription>La guía definitiva de hardware y software para nuevos broadcasters.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Empezar una estación de radio online no tiene por qué ser caro ni complicado. Aquí te dejamos una lista de lo esencial:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Un Ordenador Confiable:</strong> No necesitas lo último, pero sí un PC o Mac que pueda manejar varias aplicaciones a la vez sin problemas.</li>
                            <li><strong>Un Buen Micrófono:</strong> Un micrófono USB como el Blue Yeti o el Audio-Technica AT2020 son excelentes opciones para empezar con calidad profesional.</li>
                            <li><strong>Software de Automatización/Transmisión:</strong> Programas como RadioDJ (gratuito), Mixxx (gratuito) o BUTT (gratuito) te permiten gestionar tu música y transmitir en vivo.</li>
                            <li><strong>Una Conexión a Internet Estable:</strong> Una buena velocidad de subida es crucial para una transmisión sin cortes.</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Settings className="w-6 h-6" /> Dominando tu Panel de Radio</CardTitle>
                        <CardDescription>Videotutoriales guiados para Azuracast y SonicPanel.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Guía de Azuracast</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                    <PlayCircle className="w-12 h-12 text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground">Aprende a subir música, crear playlists y gestionar tu auto-DJ.</p>
                                <Button className="w-full">Ver Video</Button>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Guía de SonicPanel</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                 <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                    <PlayCircle className="w-12 h-12 text-muted-foreground" />
                                </div>
                                <p className="text-sm text-muted-foreground">Domina las funciones de retransmisión y gestión de DJs en vivo.</p>
                                <Button className="w-full">Ver Video</Button>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Award className="w-6 h-6" /> Insignias Exclusivas de Formación</CardTitle>
                        <CardDescription>Completa todas las sesiones de nuestro curso para obtener estas insignias en tu perfil.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {trainingBadges.map(badge => (
                            <div key={badge.name} className="text-center p-4 flex flex-col items-center">
                                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    {badge.icon}
                                </div>
                                <h3 className="text-lg font-semibold">{badge.name}</h3>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                 <Alert variant="info">
                    <LifeBuoy className="h-4 w-4" />
                    <AlertTitle>¿Necesitas más ayuda?</AlertTitle>
                    <AlertDescription>
                        Recuerda que nuestro equipo de soporte está disponible para ayudarte. Si tienes un plan Golden, tienes acceso a soporte prioritario para resolver tus dudas técnicas.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
