import p5 from 'p5'

module.exports = (p, state) => {
    return function() {
        state.gainMaster = new p5.Gain();
        state.gainMaster.connect();

        state.sound.setVolume(state.currentTrack.vol);
        state.sound.disconnect();
        state.sound.play(null, null, null, 0);

        state.gain1 = new p5.Gain(); // setup a gain node
        state.gain1.setInput(state.sound); // connect the first state.sound to its input
        state.gain1.connect(state.gainMaster);

        state.amplitude = new p5.Amplitude();
        state.amplitude.setInput(state.gainMaster);
        state.amplitude.smooth(0.4);

        // bandPass = new p5.BandPass();
        // bandPass.amp(3);
        // bandPass.disconnect();
        // // bandPass.connect(state.gain1);
        // // bandPass.freq(500);
        // // bandPass.res(50);
        //
        // gain2 = new p5.Gain();
        // gain2.setInput(state.sound);
        // // gain2.amp(1);
        // gain2.connect(bandPass);
        //
        // state.amplitudeBandPass = new p5.Amplitude();
        // state.amplitudeBandPass.setInput(bandPass);
        // state.amplitudeBandPass.disconnect();
        // state.amplitudeBandPass.smooth(0.2);

        state.isPlaying = 1;
    };
};
