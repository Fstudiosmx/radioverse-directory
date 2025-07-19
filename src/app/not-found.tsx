import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RadioTower } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4">
      <div className="p-6 bg-primary/10 rounded-full mb-6">
        <RadioTower className="w-24 h-24 text-primary" />
      </div>
      <h1 className="text-4xl md:text-5xl font-headline font-bold mb-2 text-primary">Oops!</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        We got lost in the radio waves. This frequency seems to be silent.
      </p>
      <Button asChild size="lg">
        <Link href="/">Tune Back to Home</Link>
      </Button>
    </div>
  )
}
