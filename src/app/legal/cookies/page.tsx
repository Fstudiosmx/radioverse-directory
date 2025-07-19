import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CookiesPolicyPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Cookie Policy"
        description="Last updated: July 28, 2024"
      />
      <div className="max-w-4xl mx-auto pt-6">
        <Card>
          <CardHeader>
            <CardTitle>What are cookies?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>A cookie is a small text file that a website stores on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences (such as login, language, font size and other display preferences) over a period of time, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.</p>

            <h3 className="font-semibold text-lg pt-4">How do we use cookies?</h3>
            <p>We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors.</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Strictly necessary cookies:</strong> These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.</li>
                <li><strong>Analytical/performance cookies:</strong> They allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it.</li>
                <li><strong>Functionality cookies:</strong> These are used to recognise you when you return to our website.</li>
            </ul>

            <h3 className="font-semibold text-lg pt-4">How to control cookies</h3>
            <p>You can control and/or delete cookies as you wish – for details, see aboutcookies.org. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
