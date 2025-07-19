import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart } from "lucide-react";

// SVG for PayPal Logo
const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
        <path fill="#003087" d="M20.216 6.332c-.22-.729-.756-1.265-1.485-1.484C17.31 4.4 14.33 4 12 4s-5.31.4-6.73.848c-.73.219-1.266.755-1.486 1.484C3.4 8.01 3 9.944 3 12c0 2.055.4 3.989.784 5.668.22.729.756 1.265 1.486 1.484C6.69 19.6 9.67 20 12 20s5.31-.4 6.73-.848c.729-.219 1.265-.755 1.485-1.484C20.6 15.989 21 14.056 21 12c0-2.056-.4-3.99- .784-5.668z"/>
        <path fill="#fff" d="M8.345 16.425h1.92a.56.56 0 0 0 .553-.473l.635-3.842c.07-.406.12-.76.15-1.062.03-.302.04-.51.04-.622 0-.251-.06-.461-.17-.63-.12-.17-.29-.25-.52-.25-.39 0-.71.12-1.03.44-.24.23-.42.52-.52.88l-.55 2.903H6.915l.63-3.852c.1-.603.41-1.076.92-1.417.51-.342 1.1-.512 1.76-.512.98 0 1.73.25 2.24.76.51.5.77 1.2.77 2.08 0 .53-.13 1.15-.39 1.85-.26.7-.58 1.42-.98 2.14-.38.71-.72 1.29-1.02 1.73-.3.44-.54.66-.72.66h-.43l-.22-1.3z"/>
        <path fill="#009cde" d="M15.344 16.425h1.92a.56.56 0 0 0 .553-.473l.635-3.842c.07-.406.12-.76.15-1.062.03-.302.04-.51.04-.622 0-.251-.06-.461-.17-.63-.12-.17-.29-.25-.52-.25-.39 0-.71.12-1.03.44-.24.23-.42.52-.52.88l-.55 2.903h-1.92l.63-3.852c.1-.603.41-1.076.92-1.417.51-.342 1.1-.512 1.76-.512.98 0 1.73.25 2.24.76.51.5.77 1.2.77 2.08 0 .53-.13 1.15-.39 1.85-.26.7-.58 1.42-.98 2.14-.38.71-.72 1.29-1.02 1.73-.3.44-.54.66-.72.66h-.43l-.22-1.3z"/>
        <path fill="#fff" d="M12.225 10.128c-.12-.762-.24-1.284-.36-1.566-.12-.282-.25-.423-.39-.423-.19 0-.36.08-.51.25-.15.17-.23.38-.23.63 0 .28.08.7.25 1.25l.48 1.56h-1.93l-1.08-3.25c-.08-.24-.16-.42-.25-.54-.09-.12-.21-.18-.36-.18-.17 0-.3.06-.39.19-.09.13-.13.26-.13.4l.41 2.45h-1.89l.13-.78c.03-.21.05-.38.05-.51 0-.6-.23-1.05-.69-1.35-.46-.3-1.02-.45-1.68-.45-.63 0-1.18.15-1.65.46-.47.31-.76.74-.87 1.3l-.33 1.95h1.92l.33-1.95c.06-.33.18-.58.36-.75.18-.17.4-.25.66-.25.28 0 .5.07.66.21.16.14.24.33.24.57 0 .08-.02.2-.05.36l-.63 3.7h1.92l.41-2.45c.03-.21.05-.38.05-.51 0-.6-.23-1.05-.69-1.35-.46-.3-1.02-.45-1.68-.45-.63 0-1.18.15-1.65.46-.47.31-.76.74-.87 1.3l-.33 1.95h1.92l.33-1.95c.06-.33.18-.58.36-.75.18-.17.4-.25.66-.25.28 0 .5.07.66.21.16.14.24.33.24.57 0 .08-.02.2-.05.36l-.63 3.7h1.92l.71-4.35c.05-.33.1-.6.15-.82z"/>
    </svg>
);


export default function DonatePage() {
  const PAYPAL_DONATE_LINK = "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=fullmixmx%2B4%40gmail.com&currency_code=USD";

  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Support RadioVerse"
        description="Your contribution helps us keep the signals strong."
      />
      <div className="flex justify-center items-start pt-10">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <HandHeart className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">Haz tu Donación con PayPal</CardTitle>
            <CardDescription className="max-w-md mx-auto">
              Aceptamos todos los métodos que admite PayPal. Al hacer clic en el botón, serás redirigido a PayPal para completar tu donación de forma segura.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold flex items-center justify-center gap-2">Tu apoyo es nuestra señal</p>
                <p className="text-sm text-muted-foreground mt-1">Cada contribución nos ayuda a mantener y mejorar la plataforma.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" size="lg">
                <a href={PAYPAL_DONATE_LINK} target="_blank" rel="noopener noreferrer">
                    <PayPalIcon className="mr-2"/>
                    Pagar con PayPal
                </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
