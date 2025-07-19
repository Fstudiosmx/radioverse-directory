import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DMCA() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="DMCA Takedown Policy"
        description="Our policy for handling copyright infringement claims."
      />
      <div className="max-w-4xl mx-auto pt-6 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Reporting Copyright Infringement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>RadioVerse respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices of alleged copyright infringement that are duly reported to our Designated Copyright Agent.</p>
            <p>If you are a copyright owner, or are authorized to act on behalf of one, please report alleged copyright infringements taking place on or through the Site by completing the following DMCA Notice of Alleged Infringement and delivering it to our Designated Copyright Agent.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>DMCA Takedown Notice</CardTitle>
            <CardDescription>Please fill out the form below to submit a takedown request.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="copyright-holder">Copyright Holder Name</Label>
                <Input id="copyright-holder" placeholder="e.g., John Doe or Company Inc." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="infringing-url">URL of Infringing Content</Label>
                <Input id="infringing-url" placeholder="https://radioverse.app/station/..." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description of Infringement</Label>
                <Textarea id="description" placeholder="Please describe the copyrighted work and the infringement in detail." required />
              </div>
              <Button type="submit">Submit Takedown Notice</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
