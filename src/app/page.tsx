

'use client';

import { StationCard } from '@/components/station-card';
import { blogPosts, stations, podcasts, tvChannels } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowRight, LayoutDashboard, Podcast, Radio, Tv, Zap, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useTranslation } from '@/contexts/translation-context';

const benefits = [
  { icon: <LayoutDashboard className="w-8 h-8 text-primary" />, title: 'Unified Panel', original_title: 'Panel Unificado', description: 'Manage your radio, podcasts, and TV from one place.', original_description: 'Gestiona tu radio, podcasts y TV desde un solo lugar.' },
  { icon: <Zap className="w-8 h-8 text-primary" />, title: 'Powerful Minisites', original_title: 'Minisites Potentes', description: 'Create custom pages for your content with blogs and more.', original_description: 'Crea páginas personalizadas para tu contenido con blogs y más.' },
  { icon: <Podcast className="w-8 h-8 text-primary" />, title: 'Multimedia Hosting', original_title: 'Alojamiento Multimedia', description: 'Upload and distribute your audio and video podcasts effortlessly.', original_description: 'Sube y distribuye tus podcasts de audio y video sin esfuerzo.' },
  { icon: <LineChart className="w-8 h-8 text-primary" />, title: 'Monetization & Analytics', original_title: 'Monetización y Analíticas', description: 'Connect with sponsors and understand your audience.', original_description: 'Conéctate con patrocinadores y entiende a tu audiencia.' },
];

export default function HomePage() {
  const { t } = useTranslation();
  const featuredStations = stations.slice(0, 4);
  const featuredPodcast = podcasts.length > 0 ? podcasts[0] : null;
  const featuredTVChannel = tvChannels.length > 0 ? tvChannels[0] : null;

  return (
    <div className="flex-1 space-y-12">
      <section className="relative h-[60vh] flex items-center justify-center text-center text-white bg-black">
         <Image 
            src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600&h=900&fit=crop"
            alt="Concert background"
            fill
            className="object-cover opacity-30"
            data-ai-hint="music festival"
            priority
         />
         <div className="relative z-10 p-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
             {t('Your Universe of Audio and Video', 'Tu Universo de Audio y Video')}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
             {t('Launch and manage your radio station, podcast, or TV channel with professional tools. Create, grow, and monetize your content like never before.', 'Lanza y gestiona tu estación de radio, podcast o canal de TV con herramientas profesionales. Crea, crece y monetiza tu contenido como nunca antes.')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="shadow-lg">
                <Link href="/pricing">{t('View Packages', 'Ver Paquetes')} <ArrowRight className="w-5 h-5 ml-2" /></Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                 <Link href="/panel">{t('Go to Panel', 'Ir al Panel')}</Link>
              </Button>
            </div>
         </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        <section>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {blogPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                     <Link href={`/blog/${post.id}`} className="block group h-full">
                      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-primary">
                        <CardHeader className="p-0">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                            data-ai-hint="blog post header"
                          />
                        </CardHeader>
                        <CardContent className="p-6 flex-grow">
                          <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                          <CardDescription className="mt-2 text-sm">{post.excerpt}</CardDescription>
                        </CardContent>
                         <CardFooter className="p-6 pt-0">
                           <div className="flex items-center gap-1 text-primary font-semibold text-sm">
                              {t('Read More', 'Leer más')} <ArrowRight className="w-4 h-4" />
                           </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </section>

        <section className="text-center">
            <h2 className="text-3xl font-headline font-bold tracking-tight mb-4">{t('The All-in-One Platform for Creators', 'La Plataforma Todo-en-Uno para Creadores')}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">{t('RadioVerse gives you the tools to make your voice heard, regardless of the format. Everything integrated, easy to use, and powerful.', 'RadioVerse te da las herramientas para que tu voz se escuche, sin importar el formato. Todo integrado, fácil de usar y potente.')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mt-8">
                {benefits.map(benefit => (
                <div key={benefit.title}>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold font-headline">{t(benefit.title, benefit.original_title)}</h3>
                    <p className="text-muted-foreground text-sm">{t(benefit.description, benefit.original_description)}</p>
                </div>
                ))}
            </div>
        </section>
        
        <section>
            <h2 className="text-3xl font-headline font-bold tracking-tight mb-6 text-center">
            {t('Featured Stations', 'Estaciones Destacadas')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStations.map((station) => (
                <StationCard station={station} key={station.id} />
            ))}
            </div>
        </section>

        <section>
          <h2 className="text-3xl font-headline font-bold tracking-tight mb-6 text-center">
            {t('Discover More Content', 'Descubre Más Contenido')}
          </h2>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPodcast && (
                <Link href={`/podcast/${featuredPodcast.id}`} className="block group">
                  <Card className="grid md:grid-cols-2 overflow-hidden h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1 duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                            <Podcast className="w-5 h-5" />
                            <span>{t('Featured Podcast', 'Podcast Destacado')}</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold">{featuredPodcast.name}</h3>
                        <p className="text-muted-foreground mt-2">{featuredPodcast.description}</p>
                        <Button variant="link" className="p-0 mt-4">{t('Listen Now', 'Escuchar Ahora')} <ArrowRight className="w-4 h-4 ml-2"/></Button>
                      </CardContent>
                      <div className="relative h-60 md:h-full">
                          <Image src={featuredPodcast.imageUrl} alt={featuredPodcast.name} fill className="object-cover" data-ai-hint="podcast cover art" />
                      </div>
                  </Card>
                </Link>
              )}
               {featuredTVChannel && (
                <Link href={`/tv/${featuredTVChannel.id}`} className="block group">
                  <Card className="grid md:grid-cols-2 overflow-hidden h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1 duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                            <Tv className="w-5 h-5" />
                            <span>{t('Featured TV Channel', 'Canal de TV Destacado')}</span>
                        </div>
                        <h3 className="font-headline text-2xl font-bold">{featuredTVChannel.name}</h3>
                        <p className="text-muted-foreground mt-2">{featuredTVChannel.description}</p>
                        <Button variant="link" className="p-0 mt-4">{t('Watch Now', 'Ver Ahora')} <ArrowRight className="w-4 h-4 ml-2"/></Button>
                      </CardContent>
                      <div className="relative h-60 md:h-full">
                          <Image src={featuredTVChannel.imageUrl} alt={featuredTVChannel.name} fill className="object-cover" data-ai-hint="tv broadcast news" />
                      </div>
                  </Card>
                </Link>
               )}
           </div>
        </section>
        
        <Card className="bg-muted/50">
            <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-headline font-bold">{t('Join the Community', 'Únete a la Comunidad')}</h2>
                <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                    {t('Receive the latest news, releases, and industry tips directly to your inbox.', 'Recibe las últimas noticias, lanzamientos y consejos de la industria directamente en tu correo.')}
                </p>
                <form className="mt-6 flex flex-col sm:flex-row max-w-md mx-auto gap-2">
                    <input placeholder={t('your@email.com', 'tu@email.com')} type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    <Button type="submit">{t('Subscribe', 'Suscribirse')}</Button>
                </form>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
