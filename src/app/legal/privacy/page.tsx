
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Privacy Policy"
        description="Last updated: July 28, 2024"
      />
      <div className="max-w-4xl mx-auto pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Welcome to RadioVerse. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
            <p>When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it.</p>
            
            <h3 className="font-semibold text-lg pt-4">Information We Collect</h3>
            <p>We collect personal information that you voluntarily provide to us when registering at the Express, expressing an interest in obtaining information about us or our products and services, when participating in activities on the Express or otherwise contacting us.</p>

            <h3 className="font-semibold text-lg pt-4">How We Use Your Information</h3>
            <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            
             <h3 className="font-semibold text-lg pt-4">Will Your Information Be Shared With Anyone?</h3>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

            <h3 className="font-semibold text-lg pt-4">Third-Party Content and Minisites</h3>
            <p>Our platform allows creators to build and customize their own pages, known as "Minisites." These pages are managed directly by users and may include third-party content, such as images, videos, links to external websites, and custom code (HTML, CSS, JavaScript).</p>
            <p>RadioVerse does not control and is not responsible for the content, privacy policies, or practices of any third-party content or websites displayed on these Minisites. The creator of the Minisite is solely responsible for ensuring that all content and custom code comply with applicable laws and our Terms of Service.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
