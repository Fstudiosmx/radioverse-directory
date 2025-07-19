import { notFound } from "next/navigation";
import { blogPosts, users } from "@/lib/data";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Heart, Laugh, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === params.id);
  const author = users.find(u => u.name === post?.author);
  const commentUsers = users.slice(1, 3);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        <div className="space-y-4 not-prose">
            <Badge>Community</Badge>
            <h1 className="text-4xl md:text-5xl font-headline font-bold">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={author?.avatarUrl} data-ai-hint="business person" />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-sm">{post.date}</p>
                    </div>
                </div>
                <span className="text-sm flex items-center gap-1.5"><Eye className="w-4 h-4" /> {post.views} views</span>
            </div>
        </div>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={675}
          className="my-8 rounded-lg aspect-video object-cover"
          data-ai-hint="blog post header"
        />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

       <Card className="mt-12">
        <CardHeader>
          <CardTitle>Reactions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5" /> Like <Badge className="ml-2">{post.likes}</Badge>
          </Button>
           <Button variant="outline" className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" /> Love <Badge className="ml-2">42</Badge>
          </Button>
           <Button variant="outline" className="flex items-center gap-2">
            <Laugh className="w-5 h-5 text-yellow-500" /> Funny <Badge className="ml-2">8</Badge>
          </Button>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" /> Comments (3)
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                <div className="flex gap-4">
                    <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" data-ai-hint="person" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <Textarea placeholder="Write a comment..." />
                        <Button className="mt-2">Post Comment</Button>
                    </div>
                </div>
            </div>
             <div className="space-y-4">
                {commentUsers.map(user => (
                    <div key={user.id} className="flex gap-3">
                        <Link href={`/profile/${user.id}`}>
                            <Avatar>
                                <AvatarImage src={user.avatarUrl} data-ai-hint="person" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="bg-muted p-4 rounded-lg w-full">
                            <Link href={`/profile/${user.id}`} className="font-semibold hover:underline">{user.name}</Link>
                            <p>This is a fantastic breakdown. Really helped me understand how to get started. Thanks!</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
