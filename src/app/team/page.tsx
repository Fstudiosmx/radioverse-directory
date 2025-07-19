import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  { name: 'Alex Johnson', role: 'Founder & CEO', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', initials: 'AJ' },
  { name: 'Maria Garcia', role: 'Lead Developer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', initials: 'MG' },
  { name: 'Sam Williams', role: 'UI/UX Designer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', initials: 'SW' },
  { name: 'Chris Lee', role: 'Community Manager', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', initials: 'CL' },
];

export default function TeamPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Our Team"
        description="The people making RadioVerse possible."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {teamMembers.map((member) => (
          <Card key={member.name} className="text-center">
            <CardHeader>
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="business person" />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline flex items-center justify-center gap-2">
                {member.name}
                <Link href="/docs/verifications" aria-label={`Verification badge for ${member.name}`}>
                    <Shield className="w-6 h-6 text-pink-500" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
