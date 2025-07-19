

'use client';

import { PageHeader } from "@/components/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Lightbulb, Database, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const firebaseConfigExample = `
const firebaseConfig = {
  apiKey: "AIzaSy******************",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
`.trim();

const geminiPrompt = `
You are an expert Firebase Firestore database architect. Based on the following TypeScript types from a Next.js application called "RadioVerse", design a professional and scalable Firestore collection structure.

### Key Requirements:
1.  **Structure**: Define collections and sub-collections. Use singular collection names (e.g., 'user' instead of 'users').
2.  **Relationships**: Define relationships using document references.
3.  **Indexes**: Suggest necessary composite indexes for common queries.
4.  **Security Rules**: Provide basic security rules to get started (e.g., users can only edit their own data, public data is readable).
5.  **Data Types**: Use appropriate Firestore data types (Timestamp, DocumentReference, etc.).

### TypeScript Data Models:
\`\`\`typescript
// src/lib/types.ts

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
  id: 'free' | 'premium' | 'donator' | 'golden';
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
\`\`\`

### Example Queries to Support:
- Get a user and their profile.
- Get all stations owned by a specific user.
- Get all published stations for the main directory, ordered by name.
- Get a station and its details.
- Get all pending audio submissions for a specific station.
- Get all "open" reports.
- Get all upcoming events.

Please provide the complete Firestore structure, indexes, and security rules.
`.trim();

const realtimeDbJson = `{
  "stations": {
    "1": { "slug": "synthwave-dreams", "name": "Synthwave Dreams", "description": "Cruising through the neon-lit nights of the 80s.", "imageUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop", "software": "Azuracast", "protocol": "Icecast", "streamUrl": "https://stream.synthwavedreams.com/live" },
    "2": { "slug": "lo-fi-chillhop", "name": "Lo-Fi Chillhop", "description": "Relax, study, or sleep with the best chill beats.", "imageUrl": "https://images.unsplash.com/photo-1542314831-068cd1dbb563?w=400&h=250&fit=crop", "software": "SonicPanel", "protocol": "Shoutcast", "streamUrl": "https://stream.lofi-chillhop.com/live" },
    "3": { "slug": "classic-rock-fm", "name": "Classic Rock FM", "description": "The legends of rock, all day, every day.", "imageUrl": "https://images.unsplash.com/photo-1516280440614-37939bb91594?w=400&h=250&fit=crop", "software": "Azuracast", "protocol": "Icecast", "streamUrl": "https://stream.classicrockfm.com/live" },
    "4": { "slug": "indie-pop-hits", "name": "Indie Pop Hits", "description": "The best of independent pop and alternative gems.", "imageUrl": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=250&fit=crop", "software": "Azuracast", "protocol": "Icecast", "streamUrl": "https://stream.indiepophits.com/live" },
    "5": { "slug": "estacionkusfm", "name": "Estación Kus FM", "description": "La estación oficial de la comunidad Kusmedios.", "imageUrl": "https://placehold.co/400x250.png", "software": "Live365", "protocol": "Icecast", "streamUrl": "https://streaming.live365.com/a03183", "playerWidgetUrl": "https://live365.com/embeds/v1/player/a03183?s=md&m=dark&c=mp3", "historyWidgetUrl": "https://live365.com/embeds/v1/played/a03183?s=md&m=dark" }
  },
  "users": {
    "MefEfEeSBLYsWQeTHIczhJlrNG6": { "name": "Luis Mtz Sando", "email": "luismtzsandoshow.contacto@gmail.com", "role": "Staff", "joinedDate": "2025-07-17", "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", "status": "Active" },
    "user_2": { "name": "Alex Johnson", "email": "alex.j@example.com", "role": "Creator", "joinedDate": "2024-07-28", "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", "status": "Active" },
    "user_3": { "name": "Maria Garcia", "email": "maria.g@example.com", "role": "User", "joinedDate": "2024-07-29", "avatarUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", "status": "Active" },
    "user_4": { "name": "Sam Williams", "email": "sam.w@example.com", "role": "User", "joinedDate": "2024-07-30", "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", "status": "Suspended" }
  },
  "blogPosts": {
    "1": { "id": "1", "title": "Welcome to the New RadioVerse!", "excerpt": "We are thrilled to launch the new and improved RadioVerse. Discover new features, a cleaner design, and a better experience.", "content": "<p>This is the full content...</p>", "imageUrl": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=675&fit=crop", "author": "Alex Johnson", "date": "2024-07-28", "views": 1345, "likes": 128 },
    "2": { "id": "2", "title": "How to Get Your Station Featured", "excerpt": "Learn the best practices for submitting your station and what our review team looks for to get you on the front page.", "content": "<p>Getting your station featured...</p>", "imageUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop", "author": "Maria Garcia", "date": "2024-07-29", "views": 876, "likes": 95 },
    "3": { "id": "3", "title": "Presentamos el Panel de Radio", "excerpt": "Lleva tu estación al siguiente nivel con nuestra nueva suite de herramientas.", "content": "<p>Grandes noticias...</p>", "imageUrl": "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=675&fit=crop", "author": "John Doe", "date": "August 10, 2024", "views": 452, "likes": 78 },
    "4": { "id": "4", "title": "Cómo Crear tu Propio Servidor de Radio Icecast", "excerpt": "¿Quieres tener control total sobre tu transmisión? Te enseñamos cómo montar tu propio servidor Icecast.", "content": "<p>Tener tu propio servidor...</p>", "imageUrl": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=675&fit=crop", "author": "John Doe", "date": "August 12, 2024", "views": 215, "likes": 45 }
  },
  "podcasts": {
    "1": { "id": "1", "name": "Tech Unfiltered", "description": "Weekly deep dives into the latest tech news and trends.", "imageUrl": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop", "author": "Alex Johnson", "episodes": [ { "id": "ep1", "title": "The AI Revolution", "duration": "45:12", "releaseDate": "2024-07-20" } ] },
    "2": { "id": "2", "name": "The Creator Economy", "description": "Interviews with successful content creators.", "imageUrl": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop", "author": "Maria Garcia", "episodes": [ { "id": "ep1", "title": "From Hobby to Career", "duration": "55:30", "releaseDate": "2024-07-22", "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ" } ] }
  },
  "tvChannels": {
    "1": { "id": "1", "name": "24/7 News", "description": "Breaking news and analysis from around the world.", "imageUrl": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop", "category": "News" },
    "2": { "id": "2", "name": "Music Video Hits", "description": "The hottest music videos playing non-stop.", "imageUrl": "https://images.unsplash.com/photo-1516280440614-37939bb91594?w=600&h=400&fit=crop", "category": "Music" }
  },
  "submissions": {
    "1": { "id": 1, "name": "Cosmic Grooves", "owner": "Alex Johnson", "date": "2024-07-30", "status": "Pending", "imageUrl": "https://placehold.co/400x250.png" },
    "2": { "id": 2, "name": "Jazz Central", "owner": "Maria Garcia", "date": "2024-07-31", "status": "Pending", "imageUrl": "https://placehold.co/400x250.png" }
  },
  "reports": {
    "1": { "id": 1, "item": "User 'Spammer'", "reason": "Spamming chat in 'Synthwave Dreams'", "reporter": "ListenerOne", "date": "2024-07-30", "status": "Open" },
    "2": { "id": 2, "item": "Station 'Ad-Heavy Radio'", "reason": "Excessive advertising", "reporter": "MusicLover", "date": "2024-07-31", "status": "Resolved" }
  },
  "minisites": {
    "1": { "id": "ms1", "stationName": "Synthwave Dreams", "ownerName": "Alex Johnson", "status": "Published", "lastUpdated": "2024-08-01", "theme": "Noir" },
    "2": { "id": "ms2", "stationName": "Classic Rock FM", "ownerName": "Sam Williams", "status": "Published", "lastUpdated": "2024-07-29", "theme": "Sunset" }
  },
  "stationAudios": {
    "1": { "id": 1, "stationId": "1", "userId": "user_2", "title": "¡Saludos a todos los oyentes!", "audioUrl": "#", "status": "pending", "submittedAt": "2024-08-04T10:00:00Z" },
    "2": { "id": 2, "stationId": "1", "userId": "user_3", "title": "¡Mi primera vez en la radio!", "audioUrl": "#", "status": "approved", "submittedAt": "2024-08-03T15:30:00Z" }
  },
  "events": {
    "1": { "id": "1", "name": "Webinar: Monetiza tu Contenido", "description": "Aprende estrategias para monetizar tu estación de radio o podcast con expertos de la industria.", "date": "30 de Agosto, 2024 - 18:00 (GMT-6)", "location": "Online via Zoom", "type": "webinar", "registrationUrl": "#" },
    "2": { "id": "2", "name": "Concurso de Jingles de Verano", "description": "¡Crea el jingle más pegadizo para el verano y gana premios increíbles! Abierto a todos los creadores.", "date": "15 de Septiembre, 2024 - Cierre de inscripciones", "location": "Plataforma RadioVerse", "type": "contest", "registrationUrl": "#" }
  }
}`.trim();


export default function FirebaseSetupPage() {

    const handleDownload = (content: string, filename: string, contentType: string) => {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

  return (
    <div className="flex-1 space-y-4 pt-6">
      <PageHeader
        title="Firebase Setup"
        description="A step-by-step guide to connecting your Firebase project to RadioVerse."
      />
      <div className="max-w-4xl mx-auto pt-6 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
            <CardDescription>
              To enable user authentication, station saving, and other dynamic features, you need to connect this app to a Firebase project. This guide will walk you through the process.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 1: Create a Firebase Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>1. Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">Firebase Console</a>.</p>
            <p>2. Click on <strong>&quot;Create a project&quot;</strong> and follow the steps to set up a new project. You can skip Google Analytics for now if you wish.</p>
            <p>3. Once your project is created, inside your project dashboard, click the web icon <strong>(&lt;/&gt;)</strong> to add a new web application.</p>
            <p>4. Give your app a nickname and click <strong>&quot;Register app&quot;</strong>. You don&apos;t need to follow the &quot;Add Firebase SDK&quot; steps in the console, we have already done that for you.</p>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle>Step 2: Get Your Config Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>After registering your app, Firebase will show you a configuration object. You can also find this at any time by going to <strong>Project settings</strong> (the gear icon) &gt; <strong>Your apps</strong> &gt; select your web app &gt; <strong>Firebase SDK</strong> &gt; <strong>Config</strong>.</p>
            <p>Your config object will look like this:</p>
            <Alert variant="info">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Example Config</AlertTitle>
                <AlertDescription>
                    <pre className="text-sm mt-2 p-4 bg-muted/80 rounded-md overflow-x-auto"><code>{firebaseConfigExample}</code></pre>
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 3: Add Config to Your App</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>1. Open the file <code>src/lib/firebase.ts</code> in your code editor.</p>
            <p>2. You will see a constant named <code>firebaseConfig</code> with placeholder values.</p>
            <p>3. Copy the values from your Firebase config object and paste them into the corresponding properties in this file.</p>
            <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Important!</AlertTitle>
                <AlertDescription>
                   Never share your API keys publicly. Consider using environment variables (.env.local) to keep your keys safe in a real production project.
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 4: Enable Authentication & Database</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold">Authentication</h3>
            <p>1. In the Firebase console, navigate to the <strong>Authentication</strong> section.</p>
            <p>2. Go to the <strong>&quot;Sign-in method&quot;</strong> tab.</p>
            <p>3. Click <strong>Google</strong> from the provider list and enable it.</p>

             <h3 className="font-semibold pt-4">Cloud Firestore</h3>
            <p>1. In the Firebase console, navigate to the <strong>Cloud Firestore</strong> section.</p>
            <p>2. Click <strong>&quot;Create database&quot;</strong> and start in <strong>production mode</strong>.</p>
            <p>3. After the database is created, go to the <strong>&quot;Rules&quot;</strong> tab and update them to allow reads and writes for authenticated users. For development, you can use these rules (not recommended for long-term production!):</p>
             <Alert variant="info">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Firestore Rules for Development</AlertTitle>
                <AlertDescription>
                    <pre className="text-sm mt-2 p-4 bg-muted/80 rounded-md overflow-x-auto"><code>{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}`}</code></pre>
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-500" /> Option A: Generate Firestore Schema with AI</CardTitle>
                <CardDescription>
                    Use Gemini in the Firebase console to automatically generate your Firestore collections and security rules.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>1. Go to your Cloud Firestore page in the Firebase Console.</p>
                <p>2. You should see a Gemini prompt area (sparkle icon ✨). If not, make sure Gemini is enabled for your project.</p>
                <p>3. Copy the prompt below and paste it into the Gemini chat.</p>
                 <Alert variant="info">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>
                        <div className="flex justify-between items-center">
                            <span>Gemini Prompt for Firestore Schema</span>
                             <Button size="sm" variant="ghost" onClick={() => handleDownload(geminiPrompt, 'firestore-gemini-prompt.txt', 'text/plain')}>
                                <Download className="w-4 h-4 mr-2"/>
                                Download
                            </Button>
                        </div>
                    </AlertTitle>
                    <AlertDescription>
                        <pre className="text-sm mt-2 p-4 bg-muted/80 rounded-md overflow-x-auto"><code>{geminiPrompt}</code></pre>
                    </AlertDescription>
                </Alert>
                <p className="mt-4">4. Review the generated schema and rules, and then apply them.</p>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5"/> Option B: Use Realtime Database</CardTitle>
                <CardDescription>
                    If you prefer Realtime Database or Firestore isn't available, you can use this structure to get started quickly.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>1. In the Firebase console, go to <strong>Build &gt; Realtime Database</strong> and click "Create database".</p>
                <p>2. Choose a location and start in <strong>locked mode</strong>. You can adjust the rules later.</p>
                <p>3. Once created, click the three-dots menu and select <strong>"Import JSON"</strong>. You can paste the code below or download the file.</p>
                 <Alert variant="info">
                    <Terminal className="h-4 w-4" />
                     <AlertTitle>
                        <div className="flex justify-between items-center">
                            <span>JSON for Realtime Database</span>
                            <Button size="sm" variant="ghost" onClick={() => handleDownload(realtimeDbJson, 'radioverse-realtimedb.json', 'application/json')}>
                                <Download className="w-4 h-4 mr-2"/>
                                Download
                            </Button>
                        </div>
                    </AlertTitle>
                    <AlertDescription>
                        <pre className="text-sm mt-2 p-4 bg-muted/80 rounded-md overflow-x-auto"><code>{realtimeDbJson}</code></pre>
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
        
        <Alert variant="info">
            <Terminal className="h-4 w-4" />
            <AlertTitle>All Set!</AlertTitle>
            <AlertDescription>
                Once these steps are complete, restart your development server. Your RadioVerse app will now be fully connected to Firebase, enabling login and future database functionalities.
            </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
