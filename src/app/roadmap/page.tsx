
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, ListChecks, Milestone } from "lucide-react";

const completedFeatures = [
    { name: "Advanced User Profiles", description: "Customize your public profile and showcase your favorite stations." },
    { name: "Real-time Chat on Station Pages", description: "Chat with other listeners tuned into the same station." },
    { name: "Podcast VOD Management", description: "For Enterprise users to upload and manage their own podcast series." },
    { name: "AI-Powered Station Recommendations", description: "Get personalized suggestions based on your listening habits." },
    { name: "Mobile App (iOS & Android)", description: "Take RadioVerse on the go with our native mobile apps." },
];

const upcomingFeatures = [
    { name: "Blog for Minisites", description: "Creators can now write and manage their own blog posts directly on their minisite." },
    { name: "Functional Top 10 Music with Video", description: "Embed YouTube or Vimeo videos in the Top 10 music section." },
    { name: "Minisite Beta Content Alerts", description: "Mandatory alerts for minisites using beta features to inform visitors." },
    { name: "Exclusive Plan-Based Icons", description: "Unique icons (🐀, 🪙, 🥇) to identify Beta, Golden, and Premium users on their minisites." },
    { name: "Deeper Panel Integration", description: "All new minisite features are fully manageable from the creator's panel." },
];


export default function RoadmapPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="RadioVerse Roadmap"
        description="Our vision for the future of online radio."
      />
      <div className="max-w-4xl mx-auto pt-6 space-y-8">
        <Card>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    <Milestone className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl">What's Next: Version 1.3.2</CardTitle>
                <CardDescription>A look at the features currently in development.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {upcomingFeatures.map(feature => (
                        <div key={feature.name} className="flex items-start gap-4">
                             <div>
                                <ListChecks className="w-6 h-6 text-muted-foreground mt-1" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{feature.name}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
        
         <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline">Completed Milestones</CardTitle>
                <CardDescription>Features we've already launched.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {completedFeatures.map(feature => (
                        <div key={feature.name} className="flex items-start gap-4">
                             <div>
                                <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-muted-foreground line-through">{feature.name}</h3>
                                <p className="text-muted-foreground/80">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
