import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RadioPanelPage() {
  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="p-6">
        <PageHeader
          title="Radio Panel"
          description="Manage your Azuracast station directly within RadioVerse."
        />
      </div>
      <Card className="mt-6 flex-1 border-0 rounded-none sm:border sm:rounded-lg">
          <CardHeader>
            <CardTitle>Azuracast Control Panel</CardTitle>
            <CardDescription>
                Your station's professional control panel is embedded here.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[calc(100%-120px)] p-0 sm:p-6 sm:pt-0">
            <iframe 
              src="https://demo.azuracast.com/" 
              className="w-full h-full border rounded-lg"
              title="Azuracast Control Panel"
            ></iframe>
          </CardContent>
      </Card>
    </div>
  );
}
