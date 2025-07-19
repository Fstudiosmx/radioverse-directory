

export type Station = {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  software: 'SonicPanel' | 'Azuracast' | 'Live365';
  protocol: 'Shoutcast' | 'Icecast';
  streamUrl: string;
  playerWidgetUrl?: string;
  historyWidgetUrl?: string;
};

export type Submission = {
  id: number;
  name: string;
  owner: string;
  date: string;
  status: 'Pending';
  imageUrl: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Staff' | 'Creator' | 'Broadcaster';
  joinedDate: string;
  avatarUrl: string;
  status: 'Active' | 'Suspended';
  birthday?: string; // e.g., "YYYY-MM-DD"
};

export type Report = {
  id: number;
  item: string;
  reason: string;
  reporter: string;
  date: string;
  status: 'Open' | 'Resolved';
}

export type PricingPlan = {
  id: 'free' | 'video' | 'premium' | 'donator' | 'golden';
  name: string;
  price: number | 'Custom';
  priceDescription?: string;
  description: string;
  features: string[];
  cta: string;
};

export type Widget = {
  id: string;
  name: string;
  description: string;
  embedCode: string;
};

export type ServiceStatus = {
  name: string;
  status: 'Operational' | 'Degraded Performance' | 'Partial Outage' | 'Major Outage';
};

export type Podcast = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    author: string;
    episodes: Episode[];
};

export type Episode = {
    id: string;
    title: string;
    duration: string;
    releaseDate: string;
    videoUrl?: string;
};

export type TVChannel = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  views: number;
  likes: number;
};

export type ReleaseNote = {
  version: string;
  date: string;
  changes: {
    type: 'new' | 'improvement' | 'fix';
    description: string;
  }[];
};

export type Notification = {
  id: number;
  title: string;
  description: string;
  type: 'system' | 'station' | 'community';
  unread: boolean;
};

export type Minisite = {
  id: string;
  stationName: string;
  ownerName: string;
  status: 'Published' | 'Draft';
  lastUpdated: string;
  theme: string;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumArtUrl: string;
};

export type StationAudio = {
  id: number;
  stationId: string;
  userId: string;
  title: string;
  audioUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  type: 'webinar' | 'contest';
  registrationUrl: string;
};
