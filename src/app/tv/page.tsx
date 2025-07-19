import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { tvChannels } from "@/lib/data";
import { PlayCircle, Tv } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function TVPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="TV Channels"
        description="Watch live TV channels from around the globe."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tvChannels.map((channel) => (
          <Link href={`/tv/${channel.id}`} key={channel.id} className="block hover:no-underline">
            <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 h-full">
              <CardHeader className="p-0">
                <div className="relative">
                  <Image
                    src={channel.imageUrl}
                    alt={channel.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-40"
                    data-ai-hint="tv broadcast news"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <CardTitle className="absolute bottom-4 left-4 text-primary-foreground font-headline text-2xl">{channel.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardDescription>{channel.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Badge variant="outline">{channel.category}</Badge>
                <Button>
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Watch
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
