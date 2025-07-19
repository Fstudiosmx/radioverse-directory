
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingPlans } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CheckCircle2, Gem, Star, Rocket, Crown, Clapperboard, Sparkles } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

// Custom Binance Icon
const BinanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16.624 13.92L12 18.545L7.376 13.92L4.5 16.798L12 24L19.5 16.798L16.624 13.92Z" fill="#F0B90B"/>
        <path d="M12 0L4.5 7.202L7.376 10.08L12 5.455L16.624 10.08L19.5 7.202L12 0Z" fill="#F0B90B"/>
        <path d="M12 11.963L9.508 9.471L7.376 11.603L12 16.227L16.624 11.603L14.492 9.47L12 11.962V11.963Z" fill="#F0B90B"/>
        <path d="M0 12L2.493 9.47L4.5 11.602L2.316 13.788L0 12Z" fill="#F0B90B"/>
        <path d="M24 12L21.684 13.788L19.5 11.602L21.507 9.47L24 12Z" fill="#F0B90B"/>
    </svg>
)

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const PAYPAL_BUSINESS_EMAIL = "fullmixmx+4@gmail.com";

  const getPaypalLink = (plan: typeof pricingPlans[number]) => {
    if (plan.id === 'donator') {
      return `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${PAYPAL_BUSINESS_EMAIL}&currency_code=USD`;
    }
    
    const price = isAnnual && typeof plan.price === 'number' ? (plan.price * 12 * 0.8) : plan.price;
    const planName = `${plan.name} (${isAnnual ? 'Anual' : 'Mensual'})`;
    const billingCycle = isAnnual ? 'Y' : 'M';
    
    if (typeof price !== 'number') return '#';

    // Note: This is a simple subscription button. For more complex logic, PayPal's REST API would be needed.
    return `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick-subscriptions&business=${PAYPAL_BUSINESS_EMAIL}&item_name=${encodeURIComponent(planName)}&currency_code=USD&a3=${price.toFixed(2)}&p3=1&t3=${billingCycle}&src=1&rm=1`;
  }

  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Planes de Suscripción"
        description="Elige un plan que se ajuste a tus necesidades y desbloquea más beneficios."
      />
      
      <div className="flex justify-center items-center gap-4 my-8">
        <Label htmlFor="billing-cycle" className={!isAnnual ? 'text-primary font-bold' : ''}>Mensual</Label>
        <Switch id="billing-cycle" checked={isAnnual} onCheckedChange={setIsAnnual} />
        <Label htmlFor="billing-cycle" className={cn(isAnnual ? 'text-primary font-bold' : '', 'flex items-center gap-2')}>
          Anual
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground">-20%</span>
        </Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 pt-2">
        {pricingPlans.map((plan) => (
          <Card key={plan.id} className={cn("flex flex-col", plan.id === 'golden' && "border-primary shadow-lg ring-2 ring-primary")}>
             {plan.id === 'golden' && (
                <div className="text-center py-1 bg-primary text-primary-foreground font-semibold text-sm">Más Popular</div>
             )}
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline">{plan.name}</CardTitle>
                {plan.id === 'free' && <Rocket className="text-muted-foreground" />}
                {plan.id === 'video' && <Clapperboard className="text-purple-500" />}
                {plan.id === 'premium' && <Star className="text-yellow-500" />}
                {plan.id === 'golden' && <Crown className="text-yellow-400" />}
                {plan.id === 'donator' && <Gem className="text-blue-500" />}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                {typeof plan.price === 'number' ? (
                  <>
                    <span className="text-4xl font-bold font-headline">
                      ${isAnnual ? (plan.price * 0.8).toFixed(2) : plan.price.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">{plan.priceDescription}</span>
                    {isAnnual && typeof plan.price === 'number' && (
                      <p className="text-xs text-muted-foreground">Facturado anualmente como ${(plan.price * 12 * 0.8).toFixed(2)}</p>
                    )}
                  </>
                ) : (
                  <span className="text-3xl font-bold font-headline">{plan.price}</span>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
               <Button asChild className={cn("w-full", plan.id !== 'golden' && "variant-outline")}>
                  <Link href={getPaypalLink(plan)} target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                  </Link>
              </Button>
               {plan.id !== 'free' && (
                 <Button asChild variant="outline" className="w-full">
                    <Link href="/support">
                       <BinanceIcon className="mr-2"/>
                        Pagar con Binance
                    </Link>
                 </Button>
               )}
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="mt-8 bg-primary/5">
        <CardHeader className="items-center text-center">
            <Sparkles className="w-10 h-10 text-primary mb-2"/>
            <CardTitle className="font-headline text-2xl">Beneficios de Suscripción Anual</CardTitle>
            <CardDescription>¡Paga anualmente y obtén aún más!</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <p className="max-w-xl mx-auto">
                Todos nuestros planes de pago anuales incluyen automáticamente los beneficios de <span className="font-semibold text-primary">Beta Tester</span> y <span className="font-semibold text-primary">Donador Activo</span> durante todo el período de tu suscripción. ¡Accede a funciones antes que nadie y muestra tu apoyo a la comunidad!
            </p>
        </CardContent>
      </Card>
    </div>
  )
}
