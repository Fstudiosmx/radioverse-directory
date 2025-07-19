import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts, users } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="The RadioVerse Blog"
        description="News, updates, and tips from the RadioVerse team."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        {blogPosts.map((post) => {
          const author = users.find(u => u.name === post.author);
          return (
            <Link href={`/blog/${post.id}`} key={post.id} className="block group">
              <Card className="overflow-hidden h-full flex flex-col">
                <CardHeader className="p-0">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint="blog post header"
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline text-2xl">{post.title}</CardTitle>
                  <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-6 pt-0">
                   <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                          <AvatarImage src={author?.avatarUrl} data-ai-hint="business person" />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="font-semibold text-sm">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-1 text-primary font-semibold">
                      Read More <ArrowRight className="w-4 h-4" />
                   </div>
                </CardFooter>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
