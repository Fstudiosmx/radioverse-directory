
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from 'next/link'
import { Home, Tag, Puzzle, Book, Activity, Radio, Users, Shield, MessageSquare, PlusCircle, Podcast, Tv, Cookie, Landmark, HandHeart, Trophy, BarChart3, Rocket, PanelLeft, Newspaper, Map, Settings, Beaker, Award, Bell, Sparkles, User, LogOut, Moon, Sun, Monitor, Settings2, LineChart, Video, DollarSign, Rss, Store, GanttChartSquare, Zap, Clapperboard, CheckCheck, Webcam, Calendar, GraduationCap } from 'lucide-react'
import { UserMenu } from '@/components/user-menu';
import { Footer } from '@/components/footer';
import { useAuth } from '@/contexts/auth-context';

const ADMIN_UID = "MefEfEeSBLYsWQeTHIczhJlrNG6";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  const isStaff = user?.uid === ADMIN_UID;
  const isBroadcaster = true; // In a real app, this would come from user's custom claims or Firestore doc
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <div className="bg-primary p-2 rounded-lg">
              <Radio className="text-primary-foreground" />
            </div>
            <h1 className="text-xl font-headline font-semibold text-primary">RadioVerse</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarGroup>
                <SidebarGroupLabel>Principal</SidebarGroupLabel>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Home">
                    <Link href="/">
                      <Home />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                {user && (
                    <>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild tooltip="Profile">
                            <Link href={`/profile/${user.uid}`}>
                              <User />
                              <span>Profile</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild tooltip="Panel">
                            <Link href="/panel">
                              <Settings2 />
                              <span>Panel</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                    </>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Blog">
                    <Link href="/blog">
                      <Newspaper />
                      <span>Blog</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                {user && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Add Station">
                        <Link href="/add-station">
                          <PlusCircle />
                          <span>Add Station</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                )}

                  <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Radio Stations">
                    <Link href="/radio">
                      <Radio />
                      <span>Radio Stations</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Podcasts">
                    <Link href="/podcasts">
                      <Podcast />
                      <span>Podcasts</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="TV Channels">
                    <Link href="/tv">
                      <Tv />
                      <span>TV Channels</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                {user && (
                  <>
                    {(isStaff || isBroadcaster) && (
                      <>
                       <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Video Studio">
                          <Link href="/panel/video">
                            <Clapperboard />
                            <span>Video Studio</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                       <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Webcam Studio">
                          <Link href="/panel/webcam">
                            <Webcam />
                            <span>Webcam Studio</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                       <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Training Center">
                          <Link href="/training-center">
                            <GraduationCap />
                            <span>Training Center</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      </>
                    )}
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="VerseShop">
                        <Link href="/verseshop">
                          <Store />
                          <span>VerseShop</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Widgets">
                            <Link href="/widgets">
                            <Puzzle />
                            <span>Widgets</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                  </>
                )}

                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Pricing">
                        <Link href="/pricing">
                        <Tag />
                        <span>Pricing</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                 {user && (
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Settings">
                            <Link href="/settings">
                            <Settings />
                            <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 )}
              </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Community</SidebarGroupLabel>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Leaderboard">
                  <Link href="/leaderboard">
                    <BarChart3 />
                    <span>Leaderboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Calendar">
                  <Link href="/events">
                    <Calendar />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Awards">
                  <Link href="/awards">
                    <Trophy />
                    <span>Awards</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Badges">
                  <Link href="/badges">
                    <Award />
                    <span>Badges</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Verifications">
                  <Link href="/docs/verifications">
                    <CheckCheck />
                    <span>Verifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Contests">
                  <Link href="/contests">
                    <GanttChartSquare />
                    <span>Contests</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Gamification">
                  <Link href="/gamification">
                    <Zap />
                    <span>Gamification</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
                <SidebarGroupLabel>Help &amp; More</SidebarGroupLabel>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="About Us">
                        <Link href="/about">
                        <Users />
                        <span>About Us</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Support">
                        <Link href="/support">
                        <MessageSquare />
                        <span>Support</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="FAQs">
                        <Link href="/docs">
                        <Book />
                        <span>FAQs</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                {isStaff && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Admin Panel">
                      <Link href="/admin">
                        <Shield />
                        <span>Admin</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <UserMenu />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
            <SidebarTrigger>
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SidebarTrigger>
        </header>
        <div className='flex flex-col min-h-svh'>
          <main className="flex-grow p-4 sm:p-6">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
