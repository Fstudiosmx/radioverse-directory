
import { Radio, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const XIcon = () => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="currentColor"
    >
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.479l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 mb-4 md:mb-0">
                 <div className="flex items-center gap-2 mb-3">
                    <div className="bg-primary p-2 rounded-lg">
                      <Radio className="text-primary-foreground" />
                    </div>
                    <h2 className="text-xl font-headline font-semibold text-foreground">RadioVerse</h2>
                 </div>
                 <p className="text-sm">
                    The all-in-one platform for audio and video creators. Build, manage, and monetize your content with professional tools.
                 </p>
                 <p className="text-xs mt-4">
                    Orgullosamente desarrollado en México por <a href="https://estacionkusmedios.org/proyectos" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary">Estación Kusmedios</a>.
                 </p>
            </div>
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">About</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                    <li><Link href="/team" className="hover:text-primary">Our Team</Link></li>
                    <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                    <li><Link href="/releases" className="hover:text-primary">Releases</Link></li>
                    <li><Link href="/donate" className="hover:text-primary">Donate</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Community</h3>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/roadmap" className="hover:text-primary">Roadmap</Link></li>
                    <li><Link href="/status" className="hover:text-primary">Status</Link></li>
                    <li><Link href="/docs/verifications" className="hover:text-primary">Verifications</Link></li>
                     <li><Link href="/docs/moderation-policy" className="hover:text-primary">Moderation Policy</Link></li>
                     <li><Link href="/gamification" className="hover:text-primary">Gamification</Link></li>
                  </ul>
                </div>
                 <div>
                   <h3 className="font-semibold text-foreground mb-3">Follow Us</h3>
                   <div className="flex space-x-4">
                      <Link href="https://x.com/radioverse" target="_blank" rel="noopener noreferrer" className="hover:text-primary" aria-label="X/Twitter"><XIcon /></Link>
                      <Link href="https://facebook.com/radioverse" target="_blank" rel="noopener noreferrer" className="hover:text-primary" aria-label="Facebook"><Facebook /></Link>
                      <Link href="https://instagram.com/radioverse" target="_blank" rel="noopener noreferrer" className="hover:text-primary" aria-label="Instagram"><Instagram /></Link>
                   </div>
                </div>
            </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="text-xs">&copy; {new Date().getFullYear()} RadioVerse. All rights reserved.</p>
             <div className="flex items-center gap-x-4 gap-y-2 mt-2 sm:mt-0 text-xs flex-wrap justify-center">
                <Link href="/legal/privacy" className="hover:text-primary">Privacy Policy</Link>
                <Link href="/legal/cookies" className="hover:text-primary">Cookie Policy</Link>
                <Link href="/legal/dmca" className="hover:text-primary">DMCA Policy</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
