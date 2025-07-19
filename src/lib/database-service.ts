
import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase"; // Assuming db is your Firestore instance
import { 
    stations, 
    users, 
    blogPosts, 
    podcasts, 
    tvChannels, 
    submissions, 
    reports, 
    minisites, 
    stationAudios,
    tracks
} from "./data";

export async function seedDatabase() {
    const batch = writeBatch(db);

    // Users
    const usersCollection = collection(db, "users");
    users.forEach((user) => {
        const docRef = doc(usersCollection, user.id);
        batch.set(docRef, user);
    });

    // Stations
    const stationsCollection = collection(db, "stations");
    stations.forEach((station) => {
        const docRef = doc(stationsCollection, station.id);
        batch.set(docRef, station);
    });
    
    // Blog Posts
    const blogPostsCollection = collection(db, "blogPosts");
    blogPosts.forEach((post) => {
        const docRef = doc(blogPostsCollection, post.id);
        batch.set(docRef, post);
    });

    // Podcasts
    const podcastsCollection = collection(db, "podcasts");
    podcasts.forEach((podcast) => {
        const docRef = doc(podcastsCollection, podcast.id);
        batch.set(docRef, podcast);
    });

    // TV Channels
    const tvChannelsCollection = collection(db, "tvChannels");
    tvChannels.forEach((channel) => {
        const docRef = doc(tvChannelsCollection, channel.id);
        batch.set(docRef, channel);
    });

    // Submissions
    const submissionsCollection = collection(db, "submissions");
    submissions.forEach((submission) => {
        const docRef = doc(submissionsCollection, String(submission.id));
        batch.set(docRef, submission);
    });

    // Reports
    const reportsCollection = collection(db, "reports");
    reports.forEach((report) => {
        const docRef = doc(reportsCollection, String(report.id));
        batch.set(docRef, report);
    });

    // Minisites
    const minisitesCollection = collection(db, "minisites");
    minisites.forEach((minisite) => {
        const docRef = doc(minisitesCollection, minisite.id);
        batch.set(docRef, minisite);
    });

    // Station Audios
    const stationAudiosCollection = collection(db, "stationAudios");
    stationAudios.forEach((audio) => {
        const docRef = doc(stationAudiosCollection, String(audio.id));
        batch.set(docRef, audio);
    });

    // Tracks (for player)
    const tracksCollection = collection(db, "tracks");
    tracks.forEach((track) => {
        const docRef = doc(tracksCollection, track.id);
        batch.set(docRef, track);
    });

    // Commit the batch
    await batch.commit();
}
