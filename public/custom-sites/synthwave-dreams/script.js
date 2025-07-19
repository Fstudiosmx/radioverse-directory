document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause');
    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
        console.log(`Playback state: ${isPlaying ? 'Playing' : 'Paused'}`);
        // In a real scenario, this would interact with an audio API.
    });
});
