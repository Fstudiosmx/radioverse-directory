import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function SuspendedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-background p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 rounded-full p-4 w-fit mb-4">
            <ShieldAlert className="w-12 h-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-headline">Station Suspended</CardTitle>
          <CardDescription>This station has been temporarily or permanently suspended.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This action may have been taken due to a violation of our Terms of Service or a DMCA copyright claim.
          </p>
          <p>
            If you are the owner of this station and believe this is an error, you can appeal the decision. Our team will review your case.
          </p>
          <Button>Appeal Decision</Button>
        </CardContent>
      </Card>
    </div>
  );
}
