import setupSound from '../animations/setupSound.js'
import tracks from '../init/tracks.js'

module.exports = (p, state) => {

    p.background(0);
    p.fill(255);

    // if (mouseIsPressed) {
    //     bandPass.freq(p.map(mouseX, 0, p.width, 0, 15000));
    //     bandPass.res(p.map(mouseY, p.height, 0, -5, 10));
    // }

    if (!state.sound.isPlaying() && !state.sound.isPaused() && state.isPlaying === 1) {
        state.sound.stop();
        state.isPlaying = 0;

        if (tracks.indexOf(state.currentTrack) >= tracks.length - 1) {
            state.currentTrack = tracks[0]
            state.currentTrack = tracks[tracks.indexOf(state.currentTrack)];
        } else {
            state.currentTrack = tracks[tracks.indexOf(state.currentTrack) + 1];
        }

        state.sound = p.loadSound(state.currentTrack.file, setupSound(p, state));
    }
};
