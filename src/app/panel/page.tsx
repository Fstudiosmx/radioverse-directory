

import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, LineChart, Mic, Podcast, Radio, Users, Video, Edit, AlertCircle, Rocket } from "lucide-react";
import { ListenersChart } from "@/components/listeners-chart";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PanelPage() {
    return (
        <div className="flex-1 space-y-4 pt-6">
            <Alert>
                <Rocket className="h-4 w-4" />
                <AlertTitle className="font-semibold">New version available!</AlertTitle>
                <AlertDescription>
                    RadioVerse version 1.3.1 has been released. Check out the new Minisite features and more in the{" "}
                    <Link href="/releases" className="font-semibold underline">release notes</Link>.
                </AlertDescription>
            </Alert>

            <PageHeader
                title="Station Dashboard"
                description="All the tools you need to manage and grow your station."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle as="h2" className="text-sm font-medium">
                            Live Listeners
                        </CardTitle>
                        <Radio className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last hour
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle as="h2" className="text-sm font-medium">
                            Subscribers
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle as="h2" className="text-sm font-medium">
                            Ad Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$4,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +19% from last month
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle as="h2" className="text-sm font-medium">
                            Total Plays
                        </CardTitle>
                        <LineChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573K</div>
                        <p className="text-xs text-muted-foreground">
                            A new record this month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle as="h2">Listener Analytics</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ListenersChart />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle as="h2">Manage Content</CardTitle>
                        <CardDescription>
                            Gestiona tus streams, podcasts y minisites.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                         <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <Radio className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Radio Panel</p>
                                    <p className="text-sm text-muted-foreground">Manage your Azuracast station</p>
                                </div>
                            </div>
                            <Button size="sm" asChild>
                                <Link href="/panel/radio-panel">Manage</Link>
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <Podcast className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Podcasts</p>
                                    <p className="text-sm text-muted-foreground">5 episodes published</p>
                                </div>
                            </div>
                            <Button size="sm" asChild>
                                <Link href="/panel/podcasts">Manage</Link>
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                             <div className="flex items-center gap-4">
                                <Video className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Video Panel</p>
                                    <p className="text-sm text-muted-foreground">Manage videos & VerseLive</p>
                                </div>
                            </div>
                             <Button size="sm" asChild>
                                <Link href="/panel/video">Manage</Link>
                            </Button>
                        </div>
                         <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                             <div className="flex items-center gap-4">
                                <Edit className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Minisite</p>
                                    <p className="text-sm text-muted-foreground">Customize your public page</p>
                                </div>
                            </div>
                             <Button size="sm" asChild>
                                <Link href="/panel/minisite">Edit</Link>
                            </Button>
                        </div>
                         <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                             <div className="flex items-center gap-4">
                                <Mic className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-semibold">Audios</p>
                                    <p className="text-sm text-muted-foreground">Manage listener submissions</p>
                                </div>
                            </div>
                             <Button size="sm" asChild>
                                <Link href="/panel/audios">Manage</Link>
                            </Button>
                        </div>
                         <Card>
                            <CardHeader>
                                <CardTitle as="h2" className="text-base font-semibold">Service Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">Icecast Server</p>
                                    <Badge className="bg-green-500 hover:bg-green-600">Operational</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">RTMP Ingest (VerseLive)</p>
                                    <Badge className="bg-green-500 hover:bg-green-600">Operational</Badge>
                                </div>
                                 <div className="flex justify-between items-center">
                                    <p className="text-muted-foreground">Podcast Hosting</p>
                                    <Badge className="bg-green-500 hover:bg-green-600">Operational</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
