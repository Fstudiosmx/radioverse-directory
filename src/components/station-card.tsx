'use client';

import type { Station } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PlayCircle, PlusCircle, Radio, Server, Cast } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type StationCardProps = {
  station: Station;
};

const softwareIcons: Record<Station['software'], React.ReactNode> = {
  'SonicPanel': <Radio className="w-4 h-4" />,
  'Azuracast': <Cast className="w-4 h-4" />,
  'Live365': <Server className="w-4 h-4" />,
};

const protocolIcons: Record<Station['protocol'], React.ReactNode> = {
  'Shoutcast': <span className="font-semibold text-xs">SHOUT</span>,
  'Icecast': <span className="font-semibold text-xs">ICE</span>,
};

export function StationCard({ station }: StationCardProps) {
  return (
    <Link href={`/station/${station.id}`} className="block hover:no-underline h-full">
      <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 h-full">
        <CardHeader className="p-0">
          <div className="relative">
            <Image
              src={station.imageUrl}
              alt={station.name}
              width={400}
              height={250}
              className="object-cover w-full h-40"
              data-ai-hint="radio studio"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <CardTitle className="absolute bottom-4 left-4 text-primary-foreground font-headline text-2xl">{station.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardDescription>{station.description}</CardDescription>
          <div className="flex items-center space-x-2 mt-4">
            <Badge variant="secondary" className="gap-1.5">
              {softwareIcons[station.software]}
              {station.software}
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              {protocolIcons[station.protocol]}
              {station.protocol}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={(e) => { e.preventDefault(); console.log("Add to favorites"); }}>
            <PlusCircle className="w-6 h-6 text-muted-foreground" />
          </Button>
          <Button variant="default" size="icon" className="bg-primary rounded-full h-12 w-12 shadow-lg" onClick={(e) => { e.preventDefault(); window.location.href = `/station/${station.id}`; }}>
            <PlayCircle className="w-8 h-8 fill-primary-foreground text-primary" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
