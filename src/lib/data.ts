
import type { Station, PricingPlan, Widget, ServiceStatus, Podcast, TVChannel, BlogPost, User, ReleaseNote, Notification, Report, Submission, Minisite, Track, StationAudio, Event } from "./types";

export const stations: Station[] = [
  {
    id: '1',
    slug: 'synthwave-dreams',
    name: 'Synthwave Dreams',
    description: 'Cruising through the neon-lit nights of the 80s.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop',
    software: 'Azuracast',
    protocol: 'Icecast',
    streamUrl: 'https://stream.synthwavedreams.com/live',
  },
  {
    id: '2',
    slug: 'lo-fi-chillhop',
    name: 'Lo-Fi Chillhop',
    description: 'Relax, study, or sleep with the best chill beats.',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbb563?w=400&h=250&fit=crop',
    software: 'SonicPanel',
    protocol: 'Shoutcast',
    streamUrl: 'https://stream.lofi-chillhop.com/live',
  },
  {
    id: '3',
    slug: 'classic-rock-fm',
    name: 'Classic Rock FM',
    description: 'The legends of rock, all day, every day.',
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bb91594?w=400&h=250&fit=crop',
    software: 'Azuracast',
    protocol: 'Icecast',
    streamUrl: 'https://stream.classicrockfm.com/live',
  },
  {
    id: '4',
    slug: 'indie-pop-hits',
    name: 'Indie Pop Hits',
    description: 'The best of independent pop and alternative gems.',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=250&fit=crop',
    software: 'Azuracast',
    protocol: 'Icecast',
    streamUrl: 'https://stream.indiepophits.com/live',
  },
  {
    id: '5',
    slug: 'estacionkusfm',
    name: 'Estación Kus FM',
    description: 'La estación oficial de la comunidad Kusmedios.',
    imageUrl: 'https://placehold.co/400x250.png',
    software: 'Live365',
    protocol: 'Icecast',
    streamUrl: 'https://streaming.live365.com/a03183',
    playerWidgetUrl: "https://live365.com/embeds/v1/player/a03183?s=md&m=dark&c=mp3",
    historyWidgetUrl: "https://live365.com/embeds/v1/played/a03183?s=md&m=dark",
  },
];

export const submissions: Submission[] = [
    { id: 1, name: "Cosmic Grooves", owner: "Alex Johnson", date: "2024-07-30", status: 'Pending', imageUrl: "https://placehold.co/400x250.png" },
    { id: 2, name: "Jazz Central", owner: "Maria Garcia", date: "2024-07-31", status: 'Pending', imageUrl: "https://placehold.co/400x250.png" },
];

const today = new Date();
const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


export const users: User[] = [
  { 
    id: 'MefEfEeSBLYsWQeTHIczhJlrNG6', // Main Admin/Owner User
    name: 'Luis Martinez Sandoval', 
    email: 'luismtzsandoshow.contacto@gmail.com', 
    role: 'Staff', 
    joinedDate: '2025-07-17', 
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', 
    status: 'Active',
    birthday: todayString
  },
  {
    id: 'john-beta-test',
    name: 'John Beta',
    email: 'example@gmail.com',
    role: 'User',
    joinedDate: '2024-08-01',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'Active'
  },
  {
    id: 'user_3',
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    role: 'User',
    joinedDate: '2024-07-29',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'Active'
  },
  {
    id: 'user_4',
    name: 'Sam Williams',
    email: 'sam.w@example.com',
    role: 'Broadcaster',
    joinedDate: '2024-07-30',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    status: 'Suspended'
  }
];

export const reports: Report[] = [
    { id: 1, item: "User 'Spammer'", reason: "Spamming chat in 'Synthwave Dreams'", reporter: "ListenerOne", date: "2024-07-30", status: 'Open' },
    { id: 2, item: "Station 'Ad-Heavy Radio'", reason: "Excessive advertising", reporter: "MusicLover", date: "2024-07-31", status: 'Resolved' },
];

export const pricingPlans: PricingPlan[] = [
    {
    id: 'free',
    name: 'Verse Free',
    price: 0,
    priceDescription: '/mes',
    description: '¿Sin presupuesto? ¡Sin problema! Empieza a transmitir con lo esencial, como en los viejos tiempos.',
    features: [
      'Listar 1 estación de radio',
      'Panel básico',
      'Soporte comunitario',
    ],
    cta: 'Empieza Gratis',
  },
  {
    id: 'video',
    name: 'Video',
    price: 9,
    priceDescription: '/mes',
    description: 'Ideal para broadcasters que solo buscan usar el nuevo Video Studio y VerseLive.',
    features: [
        'VerseLive Webcam Studio',
        'Subir videos grabados',
        'Stream a redes sociales',
        'Soporte básico',
    ],
    cta: 'Empezar a Transmitir',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 15,
    priceDescription: '/mes',
    description: 'Para broadcasters que van en serio. Desbloquea el potencial de tu estación.',
    features: [
      'Listar hasta 5 estaciones',
      'Analíticas avanzadas',
      'Widgets Premium',
      'Página de Minisite Personalizable',
      'Todo lo del plan Video',
    ],
    cta: 'Empezar',
  },
  {
    id: 'golden',
    name: 'Golden',
    price: 49,
    priceDescription: '/mes',
    description: 'La solución empresarial para tu marca. Potencia, distribución y soporte de primer nivel.',
    features: [
      'Todo en Premium, más:',
      'Panel de control Azuracast propio',
      'Hosting para Podcast (Audio y Video)',
      'Acceso a red de patrocinadores',
      'Soporte prioritario',
    ],
    cta: 'Obtener Golden',
  },
  {
    id: 'donator',
    name: 'Donador',
    price: 'Custom',
    description: 'Apoya a la comunidad y obtén beneficios únicos y acceso anticipado.',
    features: [
      'Beneficios personalizados',
      'Insignia de Donador exclusiva',
      'Acceso a todas las funciones beta',
      'Tu perfil destacado',
    ],
    cta: 'Contactar',
  },
];

export const widgets: Widget[] = [
  {
    id: '1',
    name: 'Mini Player',
    description: 'A compact player perfect for sidebars or footers. Shows current song.',
    embedCode: '<iframe src="https://radioverse.app/embed/mini/1" width="300" height="100" frameborder="0"></iframe>',
  },
  {
    id: '2',
    name: 'Full Station Card',
    description: 'A complete card displaying album art, station info, and controls.',
    embedCode: '<iframe src="https://radioverse.app/embed/full/1" width="350" height="450" frameborder="0"></iframe>',
  }
];

export const serviceStatus: ServiceStatus[] = [
    { name: "Website & API", status: "Operational" },
    { name: "Streaming Servers", status: "Operational" },
    { name: "Azuracast Connector", status: "Operational" },
    { name: "SonicPanel Connector", status: "Operational" },
    { name: "Live365 Connector", status: "Operational" },
    { name: "Support System", status: "Operational" },
];

export const podcasts: Podcast[] = [
    {
        id: '1',
        name: 'Tech Unfiltered',
        description: 'Weekly deep dives into the latest tech news, gadgets, and software. No filter, just facts.',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop',
        author: 'Alex Johnson',
        episodes: [
            { id: 'ep1', title: 'The AI Revolution', duration: '45:12', releaseDate: '2024-07-20' },
            { id: 'ep2', title: 'Quantum Computing Explained', duration: '50:30', releaseDate: '2024-07-27' },
        ]
    },
    {
        id: '2',
        name: 'The Creator Economy',
        description: 'Interviews with successful content creators, exploring their journey, strategies, and challenges.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop',
        author: 'Maria Garcia',
        episodes: [
            { id: 'ep1', title: 'From Hobby to Career', duration: '55:30', releaseDate: '2024-07-22', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
            { id: 'ep2', title: 'Building a Community', duration: '58:00', releaseDate: '2024-07-29' },
        ]
    },
];

export const tvChannels: TVChannel[] = [
    {
        id: '1',
        name: '24/7 News',
        description: 'Breaking news and in-depth analysis from around the world, live all day.',
        imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop',
        category: 'News',
    },
    {
        id: '2',
        name: 'Music Video Hits',
        description: 'The hottest music videos from all genres, playing non-stop.',
        imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bb91594?w=600&h=400&fit=crop',
        category: 'Music',
    },
     {
        id: '3',
        name: 'Nature & Wildlife',
        description: 'Explore the beauty of the natural world with stunning documentaries.',
        imageUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&h=400&fit=crop',
        category: 'Documentary',
    },
];

export const blogPosts: BlogPost[] = [
  {
    id: '4',
    title: 'Cómo Crear tu Propio Servidor de Radio Icecast',
    excerpt: '¿Quieres tener control total sobre tu transmisión? Te enseñamos cómo montar tu propio servidor Icecast usando servicios en la nube como Ionos o servidores públicos.',
    content: `
      <p>Tener tu propio servidor de radio te da una libertad increíble. No dependes de los widgets de terceros y puedes aprovechar al máximo las herramientas de RadioVerse, como nuestro reproductor personalizado y el historial de canciones. En esta guía, te mostraremos los pasos básicos para empezar.</p>
      <h3>¿Por qué un servidor propio?</h3>
      <p>Controlar tu propio servidor Icecast significa:</p>
      <ul>
        <li><strong>Control Total:</strong> Tú decides la calidad del stream, los puntos de montaje y la configuración.</li>
        <li><strong>Compatibilidad Universal:</strong> Un stream de Icecast es compatible con casi todos los reproductores, incluido el nuestro.</li>
        <li><strong>Menos Branding de Terceros:</strong> Ofrece una experiencia más limpia a tus oyentes sin la marca de otros servicios.</li>
        <li><strong>Potencial de Ahorro:</strong> Dependiendo del tráfico, puede ser más económico que algunos planes de radio gestionados.</li>
      </ul>
      <h3>Opciones Populares</h3>
      <p>1. <strong>Servidores en la Nube (VPS):</strong> Servicios como <strong>Ionos</strong>, Vultr o DigitalOcean te permiten alquilar un servidor virtual privado (VPS) por un bajo coste mensual. Instalar Icecast en un VPS con Linux es un proceso relativamente sencillo para alguien con conocimientos técnicos básicos.</p>
      <p>2. <strong>Servidores Públicos Gratuitos:</strong> Existen servicios como Caster.fm que ofrecen servidores de Icecast gratuitos. Son una buena opción para empezar, aunque suelen tener limitaciones de oyentes o mostrar sus propios anuncios.</p>
      <h3>Pasos Básicos para la Configuración</h3>
      <p>Una vez tengas tu servidor, el proceso general es:</p>
      <ol>
        <li>Instalar el software del servidor Icecast.</li>
        <li>Configurar el archivo <code>icecast.xml</code> con los detalles de tu estación (contraseñas, puertos, etc.).</li>
        <li>Iniciar el servidor Icecast.</li>
        <li>Usar un software de origen (como BUTT, Mixxx o RadioDJ) para enviar el audio desde tu ordenador al servidor.</li>
        <li>¡Copiar tu URL de stream (ej. http://tu-servidor:8000/stream) en RadioVerse y empezar a transmitir!</li>
      </ol>
      <p>¡Esperamos que esta guía te anime a explorar el mundo del streaming autogestionado!</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1200&h=675&fit=crop',
    author: 'John Doe',
    date: 'August 12, 2024',
    views: 215,
    likes: 45,
  },
  {
    id: '3',
    title: 'Presentamos el Panel de Radio: El Nuevo Centro de Comando de tu Estación',
    excerpt: 'Lleva tu estación al siguiente nivel con nuestra nueva suite de herramientas. Conéctate a Azuracast, gestiona tu stream y más, todo desde un solo lugar.',
    content: `
      <p>¡Grandes noticias para nuestros creadores! Hoy lanzamos una de las herramientas más solicitadas: el <strong>Panel de Radio Integrado</strong>. Esta nueva funcionalidad, disponible para nuestros usuarios de planes superiores, está diseñada para darte un control sin precedentes sobre tu estación de radio, directamente desde RadioVerse.</p>
      <h3>¿Qué hay de nuevo?</h3>
      <p>El Panel de Radio es tu nuevo centro de operaciones. Hemos integrado un iframe completo a tu panel de Azuracast, lo que te permite:</p>
      <ul>
        <li><strong>Gestionar tu Música:</strong> Sube, organiza y gestiona tu biblioteca de audio sin salir de nuestra plataforma.</li>
        <li><strong>Controlar tus Listas de Reproducción:</strong> Crea y edita tus listas de reproducción fácilmente.</li>
        <li><strong>Ver Estadísticas en Tiempo Real:</strong> Monitorea tus oyentes y el rendimiento de tu estación al momento.</li>
        <li><strong>Configuración Completa:</strong> Accede a todas las funcionalidades avanzadas que ofrece tu panel de Azuracast.</li>
      </ul>
      <h3>¿Cómo accedo?</h3>
      <p>Encontrarás un nuevo enlace al "Radio Panel" en tu dashboard principal. Simplemente haz clic y serás llevado a tu centro de control, sin necesidad de iniciar sesión en otro sitio.</p>
      <p>Este es solo el comienzo. Estamos construyendo el futuro del radio online, y tú eres una parte fundamental de él. ¡Gracias por ayudarnos a dar forma a RadioVerse!</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&h=675&fit=crop',
    author: 'John Doe',
    date: 'August 10, 2024',
    views: 452,
    likes: 78,
  },
  {
    id: '1',
    title: 'Welcome to the New RadioVerse!',
    excerpt: 'We are thrilled to launch the new and improved RadioVerse. Discover new features, a cleaner design, and a better experience.',
    content: `
        <p>This is the full content of the welcome post. We've been working hard to bring you a brand new platform for discovering and sharing radio stations. </p>
        <p>Our mission is to create a universe of audio content, easily accessible to everyone. Here are some of the new features:</p>
        <ul>
            <li>A completely redesigned user interface.</li>
            <li>An advanced search and filtering system.</li>
            <li>Embeddable widgets for your own website.</li>
        </ul>
        <p>We hope you enjoy it!</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=675&fit=crop',
    author: 'Alex Johnson',
    date: 'July 28, 2024',
    views: 1345,
    likes: 128,
  },
  {
    id: '2',
    title: 'How to Get Your Station Featured',
    excerpt: 'Learn the best practices for submitting your station and what our review team looks for to get you on the front page.',
    content: `
        <p>Getting your station featured on RadioVerse is a great way to increase your listeners. Here are some tips to improve your chances:</p>
        <ol>
            <li><strong>Complete Your Profile:</strong> Make sure your station name, description, and artwork are high quality and accurately represent your content.</li>
            <li><strong>Ensure Stream Stability:</strong> Our system checks for stream uptime. A stable stream is crucial for a good listener experience.</li>
            <li><strong>Engage with the Community:</strong> Stations that are active in our community forums and have positive ratings are more likely to be featured.</li>
        </ol>
        <p>Follow these guidelines, and you'll be on your way to the front page!</p>
    `,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop',
    author: 'Maria Garcia',
    date: 'July 29, 2024',
    views: 876,
    likes: 95,
  },
];

export const releaseNotes: ReleaseNote[] = [
  {
    version: "1.3.1",
    date: "August 5, 2024",
    changes: [
      { type: "new", description: "Added integrated Blog functionality for creator Minisites (Beta)." },
      { type: "new", description: "Top 10 Music on Minisites now supports YouTube/Vimeo embeds." },
      { type: "new", description: "Introduced exclusive icons (Beta, Golden, Premium) and mandatory alerts on Beta Minisites." },
      { type: "improvement", description: "Updated the public Roadmap with completed goals and new targets for v1.3.2." },
    ]
  },
  {
    version: "1.2.0",
    date: "August 1, 2024",
    changes: [
      { type: "new", description: "Launched the new User Profile pages (Beta)." },
      { type: "new", description: "Added the Releases page to track updates." },
      { type: "improvement", description: "Enhanced Staff user identification with a 'Team Package' and shield icon." },
      { type: "fix", description: "Corrected layout issues on the main dashboard." },
    ]
  },
    {
    version: "1.1.0",
    date: "July 30, 2024",
    changes: [
      { type: "new", description: "Introduced the Admin Panel for content management." },
      { type: "new", description: "Added a full-featured Blog and Docs section." },
      { type: "improvement", description: "Redesigned the station submission workflow." },
    ]
  },
  {
    version: "1.0.0",
    date: "July 28, 2024",
    changes: [
      { type: "new", description: "Initial launch of RadioVerse!" },
      { type: "new", description: "Station Directory with search and filtering." },
      { type: "new", description: "User authentication with Firebase." },
    ]
  }
];

export const notifications: Notification[] = [
    {
        id: 1,
        title: "Station Approved!",
        description: "Your station 'Cosmic Grooves' has been approved and is now live.",
        type: 'station',
        unread: true,
    },
    {
        id: 2,
        title: "New Beta Feature",
        description: "Try out the new AI-powered DJ in the settings panel.",
        type: 'system',
        unread: true,
    },
    {
        id: 3,
        title: "Welcome to RadioVerse",
        description: "Thanks for joining our community of radio lovers!",
        type: 'community',
        unread: false,
    }
];

export const minisites: Minisite[] = [
    { id: 'ms1', stationName: 'Synthwave Dreams', ownerName: 'John Beta', status: 'Published', lastUpdated: '2024-08-01', theme: 'Noir' },
    { id: 'ms2', stationName: 'Classic Rock FM', ownerName: 'Sam Williams', status: 'Published', lastUpdated: '2024-07-29', theme: 'Sunset' },
    { id: 'ms3', stationName: 'Lo-Fi Chillhop', ownerName: 'Maria Garcia', status: 'Draft', lastUpdated: '2024-08-02', theme: 'Forest' },
];

export const tracks: Track[] = [
    { id: '1', title: 'Tech Noir', artist: 'Gunship', album: 'Gunship', duration: '4:30', albumArtUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop' },
    { id: '2', title: 'Sunset', artist: 'The Midnight', album: 'Endless Summer', duration: '5:21', albumArtUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop' },
    { id: '3', title: 'Nightcall', artist: 'Kavinsky', album: 'OutRun', duration: '4:18', albumArtUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    { id: '4', title: 'A Real Hero', artist: 'College & Electric Youth', album: 'Drive Soundtrack', duration: '4:27', albumArtUrl: 'https://images.unsplash.com/photo-1516280440614-37939bb91594?w=200&h=200&fit=crop' },
];


export const stationAudios: StationAudio[] = [
    { id: 1, stationId: '1', userId: 'john-beta-test', title: '¡Saludos a todos los oyentes!', audioUrl: '#', status: 'pending', submittedAt: '2024-08-04T10:00:00Z' },
    { id: 2, stationId: '1', userId: 'user_3', title: '¡Mi primera vez en la radio!', audioUrl: '#', status: 'approved', submittedAt: '2024-08-03T15:30:00Z' },
    { id: 3, stationId: '1', userId: 'user_4', title: '¿Me pueden poner una canción?', audioUrl: '#', status: 'rejected', submittedAt: '2024-08-02T11:00:00Z' },
];


export const events: Event[] = [
    {
        id: '1',
        name: 'Webinar: Monetiza tu Contenido',
        description: 'Aprende estrategias para monetizar tu estación de radio o podcast con expertos de la industria.',
        date: '30 de Agosto, 2024 - 18:00 (GMT-6)',
        location: 'Online via Zoom',
        type: 'webinar',
        registrationUrl: '#',
    },
    {
        id: '2',
        name: 'Concurso de Jingles de Verano',
        description: '¡Crea el jingle más pegadizo para el verano y gana premios increíbles! Abierto a todos los creadores.',
        date: '15 de Septiembre, 2024 - Cierre de inscripciones',
        location: 'Plataforma RadioVerse',
        type: 'contest',
        registrationUrl: '#',
    },
];
