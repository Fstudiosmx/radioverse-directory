import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TVPanelPage() {
  return (
    <div className="flex flex-col flex-1 h-full">
       <div className="p-6">
        <PageHeader
          title="TV Panel"
          description="Manage your Wowza video stream directly within RadioVerse."
        />
      </div>
      <Card className="mt-6 flex-1 border-0 rounded-none sm:border sm:rounded-lg">
          <CardHeader>
            <CardTitle>Wowza Control Panel</CardTitle>
            <CardDescription>
                Your channel's professional Wowza control panel is embedded here.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[calc(100%-120px)] p-0 sm:p-6 sm:pt-0">
             <iframe 
              src="https://www.wowza.com/developer/player/wowza-player-demo" 
              className="w-full h-full border rounded-lg"
              title="Wowza Control Panel"
            ></iframe>
          </CardContent>
      </Card>
    </div>
  );
}
