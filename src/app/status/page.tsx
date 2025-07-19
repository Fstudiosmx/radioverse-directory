import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { serviceStatus } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function StatusPage() {
  const allSystemsOperational = serviceStatus.every(s => s.status === 'Operational');

  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="System Status"
        description="Live status of all RadioVerse services."
      />

      <Card className="max-w-4xl mx-auto mt-6">
        <CardHeader>
          <div className={cn(
            "p-4 rounded-lg flex items-center gap-4",
            allSystemsOperational ? "bg-green-100 dark:bg-green-900/50" : "bg-orange-100 dark:bg-orange-900/50"
          )}>
            <div className={cn(
              "w-4 h-4 rounded-full",
              allSystemsOperational ? "bg-green-500" : "bg-orange-500"
            )}></div>
            <CardTitle className={cn(
              "font-headline",
               allSystemsOperational ? "text-green-800 dark:text-green-200" : "text-orange-800 dark:text-orange-200"
            )}>
              {allSystemsOperational ? "All Systems Operational" : "Some Systems Experiencing Issues"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {serviceStatus.map((service, index) => (
            <div key={service.name}>
              <div className="flex justify-between items-center py-3">
                <p className="text-lg">{service.name}</p>
                <Badge variant={service.status === 'Operational' ? 'default' : 'destructive'} className={cn(service.status === 'Operational' && "bg-green-500 hover:bg-green-600")}>
                  {service.status}
                </Badge>
              </div>
              {index < serviceStatus.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
