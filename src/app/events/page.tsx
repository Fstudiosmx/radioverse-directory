import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/lib/data";
import { Calendar, MapPin, Ticket, Video } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Calendario de Eventos del Verse"
        description="Mantente al día de todos nuestros próximos eventos, webinars y concursos."
      />
      <div className="max-w-6xl mx-auto pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col">
              <CardHeader className="p-6">
                <div className="flex items-center gap-4 mb-2">
                    {event.type === 'webinar' ? (
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                            <Video className="w-6 h-6 text-blue-500"/>
                        </div>
                    ) : (
                         <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                            <Ticket className="w-6 h-6 text-purple-500"/>
                        </div>
                    )}
                    <Badge variant="secondary" className="capitalize">{event.type}</Badge>
                </div>
                <CardTitle className="font-headline text-2xl">{event.name}</CardTitle>
                <CardDescription className="text-sm">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow">
                 <div className="flex items-start gap-3 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 mt-1 shrink-0" />
                    <span>{event.date}</span>
                 </div>
                 <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-1 shrink-0" />
                    <span>{event.location}</span>
                 </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Registrarse Ahora
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
