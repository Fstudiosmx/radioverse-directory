
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, LogOut, Settings, User, Shield, Moon, Sun, Monitor, Star, Gem, Beaker, PartyPopper, Sparkles, Rss, Radio, MessageSquare, PlusCircle, CheckCircle, Cake, Award, Crown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Progress } from './ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import Link from 'next/link';
import { notifications as defaultNotifications, users as demoUsers } from '@/lib/data';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import type { Notification } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { LanguageSwitcher } from './language-switcher';
import { useAuth } from '@/contexts/auth-context';
import { auth } from '@/lib/firebase';
import { Badge } from './ui/badge';

const userBadges = [
  { name: 'Donator', icon: <Gem className="w-4 h-4 text-blue-500" />, id: 'donator' },
  { name: 'Beta Tester', icon: <Beaker className="w-4 h-4 text-green-500" />, id: 'beta' },
  { name: 'Launch Event 2024', icon: <PartyPopper className="w-4 h-4 text-yellow-500" />, id: 'launch24' },
];

const ADMIN_UID = "MefEfEeSBLYsWQeTHIczhJlrNG6";

export function UserMenu() {
  const { setTheme } = useTheme();
  const { user, loading } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isBirthday, setIsBirthday] = useState(false);

  // Determine user role and if they are a staff member
  const isStaff = user?.uid === ADMIN_UID;
  const isFounder = user?.uid === ADMIN_UID;

  useEffect(() => {
    if (user) {
      // In a real app, this data would come from a Firestore document for the user.
      const demoUser = demoUsers.find(du => du.id === user.uid);
      if (demoUser?.birthday) {
        const today = new Date();
        const birthDate = new Date(demoUser.birthday);
        if (today.getUTCMonth() === birthDate.getUTCMonth() && today.getUTCDate() === birthDate.getUTCDate()) {
          setIsBirthday(true);
        }
      }
    }
  }, [user]);


  const handleLogout = async () => {
    await auth.signOut();
  };

  if (loading) {
    return (
      <div className="p-2 flex items-center gap-1">
        <div className="h-14 w-full flex items-center gap-2">
            <Avatar className="h-10 w-10 animate-pulse bg-muted"></Avatar>
            <div className='flex-1 space-y-1 group-data-[collapsible=icon]:hidden'>
                 <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                 <div className="h-3 w-16 bg-muted rounded animate-pulse"></div>
            </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
       <div className="p-2 space-y-2">
         <div className="flex items-center gap-1">
            <Button asChild className="w-full justify-start gap-2 group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:aspect-square group-data-[collapsible=icon]:p-2">
                <Link href="/login">
                  <LogOut className="h-5 w-5" />
                  <span className='group-data-[collapsible=icon]:hidden'>Sign In</span>
                </Link>
            </Button>
            <LanguageSwitcher />
         </div>
       </div>
    );
  }
  
  const userLevel = 25;
  const userPoints = 8500;
  const pointsToNextLevel = 10000;
  const progress = (userPoints / pointsToNextLevel) * 100;
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, unread: false } : n)
    );
  };
  
  const handleMarkAllAsRead = (e: React.MouseEvent) => {
      e.preventDefault();
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="p-2 space-y-2">
       <div className="px-2 group-data-[collapsible=icon]:hidden">
          <div className="flex justify-between font-medium mb-1 items-center text-xs">
              <span className="flex items-center gap-1.5 text-yellow-500"><Star className="w-3.5 h-3.5" />Level {userLevel}</span>
              <span className="text-muted-foreground">{userPoints} / {pointsToNextLevel} XP</span>
          </div>
          <Progress value={progress} className="h-1.5" />
      </div>
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-auto w-full justify-start gap-2 px-2 py-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} data-ai-hint="person" />
                <AvatarFallback>{user.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
              </Avatar>
              <div className="text-left group-data-[collapsible=icon]:hidden">
                <p className="font-semibold text-sm flex items-center gap-1.5">
                    {user.displayName}
                    {isStaff && !isFounder && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href="/docs/verifications" className="flex" onClick={(e) => e.stopPropagation()}>
                                <Shield className="w-4 h-4 text-pink-500" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Staff</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                     {isFounder && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex" onClick={(e) => e.stopPropagation()}>
                                <Crown className="w-4 h-4 text-yellow-500" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Founder</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                     {isBirthday && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href="/badges" className="flex" onClick={(e) => e.stopPropagation()}>
                                <Cake className="w-4 h-4 text-pink-400" />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Happy Birthday!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                </p>
                {isStaff && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Shield className="w-3 h-3" /> Team Package</p>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none flex items-center gap-1.5">
                    {user.displayName}
                    {isStaff && !isFounder && (
                       <Link href="/docs/verifications" className="flex">
                          <Shield className="w-4 h-4 text-pink-500" />
                       </Link>
                    )}
                     {isFounder && (
                        <span className="flex">
                            <Crown className="w-4 h-4 text-yellow-500" />
                        </span>
                    )}
                     {isBirthday && (
                       <Link href="/badges" className="flex">
                          <Cake className="w-4 h-4 text-pink-400" />
                       </Link>
                    )}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                   <Link href="/releases">
                    <Rss className="mr-2 h-4 w-4" />
                    <span>News & Releases</span>
                   </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/profile/${user.uid}`}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                 <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span>Change Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        <Monitor className="mr-2 h-4 w-4" />
                        <span>System</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
             <DropdownMenuGroup>
                <div className="relative px-2 py-1.5 text-xs">
                    <p className="font-medium mb-1">Badges</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <TooltipProvider>
                        {userBadges.map(badge => (
                            <Tooltip key={badge.id}>
                            <TooltipTrigger asChild>
                                <div className="p-1.5 bg-muted rounded-full hover:bg-muted/80">
                                {badge.icon}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                <p>{badge.name}</p>
                            </TooltipContent>
                            </Tooltip>
                        ))}
                         {isBirthday && (
                             <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="p-1.5 bg-muted rounded-full hover:bg-muted/80">
                                        <Cake className="w-4 h-4 text-pink-400" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>RadioVerse Birthday</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                        </TooltipProvider>
                    </div>
                </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <LanguageSwitcher />

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="group-data-[collapsible=icon]:hidden relative">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Notifications</p>
                         {unreadCount > 0 && <Badge variant="secondary">{unreadCount} New</Badge>}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                        <DropdownMenuItem key={n.id} className="items-start gap-3" onSelect={() => handleNotificationClick(n)}>
                           <div className={cn("shrink-0 rounded-full w-8 h-8 flex items-center justify-center", 
                           n.type === 'station' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300' : 
                           n.type === 'community' ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300' :
                           'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300')}>
                                {n.type === 'station' && <Radio className="w-4 h-4"/>}
                                {n.type === 'community' && <MessageSquare className="w-4 h-4"/>}
                                {n.type === 'system' && <PlusCircle className="w-4 h-4"/>}
                           </div>
                           <div className="flex-grow">
                                <p className="font-medium text-sm leading-tight">{n.title}</p>
                                <p className="text-xs text-muted-foreground">{n.description}</p>
                           </div>
                           {n.unread && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1"></div>}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleMarkAllAsRead}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>Mark all as read</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{selectedNotification?.title}</DialogTitle>
                <DialogDescription>
                    This is the full content of the notification. You can add more details here, such as links, images, or actions.
                </DialogDescription>
            </DialogHeader>
             <p>{selectedNotification?.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
