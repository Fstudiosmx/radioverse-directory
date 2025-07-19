
'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Radio, ShieldCheck, MoreHorizontal, Send, FileEdit, Trash2, Newspaper, Construction, UserPlus, FileCheck2, Megaphone, UserX, UserCheck, View, Trophy, LayoutTemplate, PowerOff, CircleSlash, Database, Gift, Ticket, CheckCheck, UploadCloud, LifeBuoy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { submissions as initialSubmissions, users as initialUsers, reports as initialReports, blogPosts as initialBlogPosts, minisites as initialMinisites } from "@/lib/data";
import type { Submission, User, Report, BlogPost, Minisite } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { handleSeedData, handleUpgradeSchema, getLiveSupportTickets, resolveSupportTicket } from './actions';


export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [minisites, setMinisites] = useState<Minisite[]>(initialMinisites);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTickets = async () => {
        const tickets = await getLiveSupportTickets();
        setSupportTickets(tickets);
    };
    fetchTickets();
    const interval = setInterval(fetchTickets, 5000); // Poll for new tickets every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleApproveSubmission = (id: number) => {
    setSubmissions(submissions.filter(s => s.id !== id));
    toast({ title: "Station Approved", description: "The station has been approved and is now live." });
  };

  const handleRejectSubmission = (id: number) => {
    setSubmissions(submissions.filter(s => s.id !== id));
    toast({ title: "Station Rejected", description: "The station submission has been rejected.", variant: 'destructive' });
  };
  
  const handleToggleSuspendUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' } : u));
    const user = users.find(u => u.id === id);
    if(user) {
        toast({ title: `User ${user.status === 'Suspended' ? 'Reactivated' : 'Suspended'}`, description: `${user.name} has been ${user.status === 'Suspended' ? 'reactivated' : 'suspended'}.` });
    }
  };

  const handleResolveReport = (id: number) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
    toast({ title: "Report Resolved", description: "The report has been marked as resolved." });
  };

  const handleDeletePost = (id: string) => {
    setBlogPosts(blogPosts.filter(p => p.id !== id));
     toast({ title: "Blog Post Deleted", description: "The blog post has been successfully deleted.", variant: 'destructive' });
  };

  const handleToggleMinisiteStatus = (id: string) => {
    setMinisites(minisites.map(m => m.id === id ? { ...m, status: m.status === 'Published' ? 'Draft' : 'Published' } : m));
    const minisite = minisites.find(m => m.id === id);
    if(minisite) {
        toast({ title: `Minisite ${minisite.status === 'Published' ? 'Unpublished' : 'Published'}`, description: `The minisite for ${minisite.stationName} has been ${minisite.status === 'Published' ? 'unpublished' : 'published'}.` });
    }
  }

  const handleDeleteMinisite = (id: string) => {
    const siteToDelete = minisites.find(m => m.id === id);
    setMinisites(minisites.filter(m => m.id !== id));
     toast({ title: "Minisite Deleted", description: `The minisite for ${siteToDelete?.stationName} has been permanently deleted.`, variant: 'destructive' });
  }

  const onSeedData = async () => {
    toast({ title: "Seeding Data...", description: "This will populate your Firestore database with all demo data." });
    try {
        const result = await handleSeedData();
        if (result.success) {
            toast({ title: "Success!", description: "Demo data has been seeded to Firestore." });
        } else {
            throw new Error(result.error);
        }
    } catch(err: any) {
        toast({ variant: 'destructive', title: "Error Seeding Data", description: err.message });
    }
  }

  const onUpgradeSchema = async () => {
    toast({ 
        title: "Upgrading Database Schema...", 
        description: "This will run a migration script on your Firestore database." 
    });
     try {
        const result = await handleUpgradeSchema();
        if (result.success) {
            toast({ title: "Success!", description: "Database schema has been upgraded." });
        } else {
            throw new Error(result.error);
        }
    } catch(err: any) {
        toast({ variant: 'destructive', title: "Error Upgrading Schema", description: err.message });
    }
  }

  const handleResolveTicket = async (id: string) => {
    await resolveSupportTicket(id);
    setSupportTickets(tickets => tickets.filter(t => t.id !== id));
    toast({ title: "Ticket Resolved", description: `Support ticket ${id} has been resolved and closed.` });
  }
  
  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Admin Panel"
        description="Manage all aspects of RadioVerse from here."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 pt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Station Submissions
            </CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.filter(s => s.status === 'Pending').length}</div>
            <p className="text-xs text-muted-foreground">
              stations waiting for approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              total registered users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Content Reports
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.filter(r => r.status === 'Open').length}</div>
            <p className="text-xs text-muted-foreground">
              active content reports
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blog Posts
            </CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              total blog posts
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Live Support
            </CardTitle>
            <LifeBuoy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supportTickets.length}</div>
            <p className="text-xs text-muted-foreground">
              active support tickets
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="submissions" className="pt-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="grid w-full sm:w-auto sm:grid-cols-8">
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="contests">Contests</TabsTrigger>
              <TabsTrigger value="minisites">Minisites</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="submissions">
            <Card>
                <CardHeader>
                    <CardTitle>Pending Station Approvals</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Station</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Submitted On</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.map((sub) => (
                                <TableRow key={sub.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Image src={sub.imageUrl} alt={sub.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="radio station"/>
                                            {sub.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{sub.owner}</TableCell>
                                    <TableCell>{sub.date}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">{sub.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="outline" size="sm">View</Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onSelect={() => handleApproveSubmission(sub.id)}>Approve</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleRejectSubmission(sub.id)} className="text-red-500">Reject</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'Staff' ? 'destructive' : user.role === 'Broadcaster' ? 'secondary' : 'outline'}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.joinedDate}</TableCell>
                       <TableCell>
                        <Badge variant={user.status === 'Suspended' ? 'destructive' : 'outline'}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem><CheckCheck className="mr-2 h-4 w-4" /> Grant Verification</DropdownMenuItem>
                               <DropdownMenuItem><Gift className="mr-2 h-4 w-4" /> Gift Subscribers</DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className={user.status === 'Suspended' ? '' : 'text-red-500'}>
                                    {user.status === 'Suspended' ? <UserCheck className="mr-2 h-4 w-4" /> : <UserX className="mr-2 h-4 w-4" />}
                                    {user.status === 'Suspended' ? 'Reactivate' : 'Suspend'}
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will {user.status === 'Suspended' ? 'reactivate' : 'suspend'} the user account. They will {user.status === 'Suspended' ? 'regain' : 'lose'} access to the platform.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleToggleSuspendUser(user.id)}>
                                        Continue
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="reports">
            <Card>
                <CardHeader>
                    <CardTitle>Content Reports</CardTitle>
                    <CardDescription>Review and manage user-submitted content reports.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Reported Item</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Reported By</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="font-medium">{report.item}</TableCell>
                                    <TableCell>{report.reason}</TableCell>
                                    <TableCell>{report.reporter}</TableCell>
                                    <TableCell>{report.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={report.status === 'Open' ? 'destructive' : 'secondary'}>{report.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost" disabled={report.status === 'Resolved'}>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleResolveReport(report.id)}>Mark as Resolved</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-500">Suspend User</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="blog">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Blog Management</CardTitle>
                        <CardDescription>Create, edit, and delete blog posts.</CardDescription>
                    </div>
                    <Button>Create New Post</Button>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Views</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogPosts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{post.author}</TableCell>
                                    <TableCell>{post.date}</TableCell>
                                     <TableCell>{post.views.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <FileEdit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                      <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500 dark:text-red-400">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the blog post.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeletePost(post.id)}>
                                                                Delete
                                                            </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>

                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="contests">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Contests & Events</CardTitle>
                <CardDescription>Manage community contests and events to boost engagement.</CardDescription>
              </div>
              <Button>Create New Event</Button>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Summer Song Contest</TableCell>
                    <TableCell><Badge variant="secondary">Contest</Badge></TableCell>
                    <TableCell><Badge>Live</Badge></TableCell>
                    <TableCell>1,204</TableCell>
                    <TableCell>
                         <div className="flex items-center justify-end gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem><Ticket className="mr-2 h-4 w-4" />Add Eventer Badge</DropdownMenuItem>
                                    <DropdownMenuItem>End Contest</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="minisites">
            <Card>
                <CardHeader>
                    <CardTitle>Minisite Management</CardTitle>
                    <CardDescription>Oversee all published and draft minisites on the platform.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Station</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead>Theme</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {minisites.map((site) => (
                                <TableRow key={site.id}>
                                    <TableCell className="font-medium">{site.stationName}</TableCell>
                                    <TableCell>{site.ownerName}</TableCell>
                                    <TableCell>{site.lastUpdated}</TableCell>
                                    <TableCell><Badge variant="secondary">{site.theme}</Badge></TableCell>
                                    <TableCell>
                                        <Badge variant={site.status === 'Published' ? 'default' : 'outline'}>{site.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem><View className="mr-2 h-4 w-4" />View Site</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleToggleMinisiteStatus(site.id)}>
                                                        {site.status === 'Published' ? <PowerOff className="mr-2 h-4 w-4" /> : <FileCheck2 className="mr-2 h-4 w-4" />}
                                                        {site.status === 'Published' ? 'Unpublish' : 'Publish'}
                                                    </DropdownMenuItem>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500 dark:text-red-400">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This will permanently delete the minisite for {site.stationName}. This action cannot be undone.
                                                            </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteMinisite(site.id)}>
                                                                Delete Minisite
                                                            </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Live Support Queue</CardTitle>
              <CardDescription>Tickets created by users that require human intervention.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Query</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supportTickets.length > 0 ? supportTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono">{ticket.id}</TableCell>
                      <TableCell>{ticket.userName}</TableCell>
                      <TableCell className="max-w-xs truncate">{ticket.query}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleResolveTicket(ticket.id)}>Resolve</Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground h-24">No active support tickets.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>Manage global site settings and platform configurations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Construction className="w-5 h-5"/> Site Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="flex items-center space-x-2">
                            <Switch id="maintenance-mode" />
                            <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Puts the site in maintenance mode, making it inaccessible to regular users.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><UserPlus className="w-5 h-5"/> User Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="flex items-center space-x-2">
                            <Switch id="user-registration" defaultChecked />
                            <Label htmlFor="user-registration">Enable User Registration</Label>
                        </div>
                         <p className="text-sm text-muted-foreground mt-2">Allows new users to sign up for an account on RadioVerse.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileCheck2 className="w-5 h-5"/> Submission Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="flex items-center space-x-2">
                            <Switch id="auto-approve-stations" />
                            <Label htmlFor="auto-approve-stations">Auto-Approve Stations</Label>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">If enabled, new station submissions will be automatically approved and listed.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Megaphone className="w-5 h-5"/> Global Announcement</CardTitle>
                        <CardDescription>Display a banner at the top of every page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="announcement-message">Banner Message</Label>
                            <Input id="announcement-message" placeholder="e.g., Scheduled maintenance this Sunday at 2 AM EST." />
                        </div>
                        <div>
                            <Label>Banner Type</Label>
                            <Select>
                                <SelectTrigger>
                                <SelectValue placeholder="Select type..." />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="info">Info</SelectItem>
                                <SelectItem value="warning">Warning</SelectItem>
                                <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <Switch id="enable-banner"/>
                                <Label htmlFor="enable-banner">Enable Announcement Banner</Label>
                            </div>
                            <Button>Save Settings</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Send className="w-5 h-5"/> Send Notification</CardTitle>
                        <CardDescription>Send a notification to all registered users.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="notification-title">Title</Label>
                            <Input id="notification-title" placeholder="e.g., Scheduled Maintenance" />
                        </div>
                        <div>
                            <Label htmlFor="notification-message">Message</Label>
                            <Textarea id="notification-message" placeholder="Your message here..." />
                        </div>
                        <Button>
                            <Send className="w-4 h-4 mr-2" />
                            Send Notification
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5"/> Database Tools</CardTitle>
                        <CardDescription>Actions for developers and administrators.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <Button onClick={onSeedData} className='flex-1'>
                                <Database className="w-4 h-4 mr-2" />
                                Seed Demo Data
                            </Button>
                             <Button onClick={onUpgradeSchema} variant="secondary" className='flex-1'>
                                <UploadCloud className="w-4 h-4 mr-2" />
                                Upgrade Database Schema
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">"Seed Data" populates Firestore with the initial demo content. "Upgrade Schema" can run data migrations for new features (simulation).</p>
                    </CardContent>
                </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}
