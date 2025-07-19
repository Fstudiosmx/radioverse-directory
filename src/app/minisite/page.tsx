
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { minisites, stations } from "@/lib/data";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MinisitesDirectoryPage() {
    const publicMinisites = minisites.filter(m => m.status === 'Published');

  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Minisites Directory"
        description="Discover custom pages created by our community of broadcasters."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        {publicMinisites.map((minisite) => {
          const station = stations.find(s => s.name === minisite.stationName);
          if (!station) return null;
          
          return (
            <Link href={`/minisite/${station.slug}`} key={minisite.id} className="block group">
              <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardHeader className="p-0">
                  <Image
                    src={station.imageUrl}
                    alt={station.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    data-ai-hint="radio station background"
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline text-2xl">{minisite.stationName}</CardTitle>
                  <CardDescription className="mt-2">by {minisite.ownerName}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-6 pt-0">
                   <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <Eye className="w-4 h-4" />
                        {(Math.random() * 5000 + 1000).toFixed(0)} views
                   </div>
                </CardFooter>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
