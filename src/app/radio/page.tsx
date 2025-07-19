import { PageHeader } from "@/components/page-header";
import { StationCard } from "@/components/station-card";
import { stations, minisites } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function RadioPage() {
  const publicMinisites = minisites.filter(m => m.status === 'Published');
  
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Radio Stations"
        description="Discover new stations or listen to your favorites."
      />
      
      <section className="pt-6">
          <h2 className="text-2xl font-headline font-bold tracking-tight mb-4">Featured Minisites</h2>
           <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {publicMinisites.map((minisite) => {
                const station = stations.find(s => s.name === minisite.stationName);
                if (!station) return null;

                return (
                  <CarouselItem key={minisite.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Link href={`/minisite/${station.slug}`} className="block group h-full">
                        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-primary">
                          <CardHeader className="p-0">
                            <Image
                              src={station.imageUrl}
                              alt={station.name}
                              width={600}
                              height={400}
                              className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                              data-ai-hint="radio station background"
                            />
                          </CardHeader>
                          <CardContent className="p-4 flex-grow">
                            <CardTitle className="font-headline text-xl">{minisite.stationName}</CardTitle>
                            <CardDescription className="mt-1 text-xs">by {minisite.ownerName}</CardDescription>
                          </CardContent>
                          <CardFooter className="p-4 pt-0">
                            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                                <Eye className="w-4 h-4" />
                                {(Math.random() * 5000 + 1000).toFixed(0)} views
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
        {stations.map((station) => (
          <StationCard station={station} key={station.id} />
        ))}
      </div>
    </div>
  );
}
