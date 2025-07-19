
import { PageHeader } from "@/components/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Gavel, UserX, Clock, Bot, Video } from "lucide-react";

export default function ModerationPolicyPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Política de Moderación y Reglas de la Comunidad"
        description="Nuestro compromiso con una comunidad segura, respetuosa y divertida."
      />
      <div className="max-w-4xl mx-auto pt-6 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Nuestra Filosofía</CardTitle>
            <CardDescription>
              En RadioVerse, nuestro objetivo es construir un espacio positivo y colaborativo para creadores y oyentes. Para lograrlo, tenemos un conjunto de reglas y un sistema de moderación que combina la inteligencia artificial con la supervisión humana.
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2"><Gavel /> Reglas Generales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
              <p>1. <strong>Sé Respetuoso:</strong> No se tolerará el acoso, los discursos de odio, el racismo ni ningún tipo de discriminación.</p>
              <p>2. <strong>Contenido Apropiado:</strong> No se permite contenido explícito, ilegal, violento o que infrinja los derechos de autor (DMCA).</p>
              <p>3. <strong>No Spam:</strong> No se permite la publicidad no solicitada, el flooding en los chats ni la promoción excesiva.</p>
              <p>4. <strong>Seguridad de la Cuenta:</strong> No compartas tu información personal ni la de otros. El phishing y los intentos de estafa resultarán en un baneo inmediato.</p>
              <p>5. <strong>Juego Limpio:</strong> No se permite el uso de bots o trampas para manipular la gamificación (XP, votos, etc.).</p>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2"><Video /> Reglas de Video y Webcam</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
              <p>• <strong>Prohibido Contenido de Citas:</strong> RadioVerse no es una plataforma de citas. Están estrictamente prohibidas las transmisiones cuyo propósito principal sea buscar pareja, tener citas o interacciones de naturaleza romántica explícita.</p>
              <p>• <strong>Apuestas y Derivados:</strong> Se permite la transmisión de contenido relacionado con apuestas, juegos de azar o temas derivados, siempre que cumpla con las leyes locales del transmisor y del espectador. Este tipo de contenido se transmite bajo el propio riesgo del creador y el espectador. RadioVerse no se hace responsable de las posibles consecuencias.</p>
              <p>• <strong>Responsabilidad del Creador:</strong> Todo el contenido transmitido es responsabilidad del creador. Las infracciones de estas reglas pueden resultar en la suspensión del acceso a las funciones de video.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot /> El Proceso de Moderación con IA</CardTitle>
            <CardDescription>
                Nuestro sistema sigue un proceso escalonado para dar a los usuarios la oportunidad de corregir su comportamiento.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                    <ShieldAlert className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                    <h3 className="font-semibold">1ra a 3ra Infracción: Notificaciones de Advertencia</h3>
                    <p className="text-sm text-muted-foreground">Recibirás una notificación de advertencia ⚠️ por cada una de las primeras tres infracciones. Estas notificaciones explican qué regla se ha violado y sirven como un recordatorio amistoso de nuestras políticas.</p>
                </div>
            </div>
            <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                    <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                    <h3 className="font-semibold">4ta Infracción: Suspensión Temporal</h3>
                    <p className="text-sm text-muted-foreground">Si se comete una cuarta infracción, tu cuenta será suspendida automáticamente por un período de **5 horas**. Durante este tiempo, no podrás acceder a ciertas funcionalidades de la plataforma.</p>
                </div>
            </div>
             <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full">
                    <UserX className="w-8 h-8 text-red-600" />
                </div>
                <div>
                    <h3 className="font-semibold">Infracciones Posteriores: Sanciones Mayores</h3>
                    <p className="text-sm text-muted-foreground">Las infracciones continuas después de la suspensión inicial resultarán en sanciones más severas, que pueden incluir suspensiones más largas o, en casos graves o repetidos, la **eliminación permanente** de la cuenta.</p>
                </div>
            </div>
          </CardContent>
        </Card>
        
        <Alert variant="info">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Creemos en las Segundas Oportunidades</AlertTitle>
            <AlertDescription>
                Este sistema está diseñado para educar y corregir, no solo para castigar. Si crees que se ha cometido un error, siempre puedes contactar a nuestro <a href="/support" className="font-semibold underline">equipo de soporte</a> para apelar una decisión.
            </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
