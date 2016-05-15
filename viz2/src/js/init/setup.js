import p5 from 'p5'
import tracks from '../init/tracks.js'
import setupSound from '../animations/setupSound.js'

module.exports = (p, state) => {

    return () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(255);
        p.stroke(255);
        p.frameRate(60);
        state.aspectRatio = p.width/p.height;
        state.ballSize = Math.min(p.width, p.height) / 1.3;
        state.pingRadius = state.ballSize/4;

        state.fft = new p5.FFT();

        setupSound(p, state)();

        addEventListener('keydown', function(e) {
            if (e.repeat) return;
            if (e.keyCode === 32) {
                if (state.isPlaying === 1) {
                    state.sound.pause();
                    state.isPlaying = 0;
                } else {
                    state.sound.play();
                    state.isPlaying = 1;
                }
            } else if (e.keyCode === 13) {
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
        });
    };
};
