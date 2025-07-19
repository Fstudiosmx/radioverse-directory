import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import Link from "next/link"

export function ProductionAlert() {
  return (
    <Alert variant="info" className="mt-8">
        <Info className="h-4 w-4" />
        <AlertTitle>Datos de Ejemplo</AlertTitle>
        <AlertDescription>
            Esta página está mostrando datos de ejemplo. Para usar la aplicación en producción, por favor configura tu base de datos Firebase y consulta la{" "}
            <Link href="/docs/firebase-setup" className="font-semibold underline">guía de configuración de Firebase</Link>.
        </AlertDescription>
    </Alert>
  )
}
