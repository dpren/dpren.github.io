import updateLoadingPercentage from '../init/updateLoadingPercentage.js'

module.exports = (p, state, tracks) => {
    window._p = p;
    window._state = state;
    window._tracks = tracks;

    return () => {

        var p5_loadElem = document.getElementById('p5_loading');

        state.sound = p.loadSound(state.currentTrack.file);

        for (var i = 0; i <= 29; i += 1) {
            state.balls.push(
                p.loadImage('src/images/b_' + i + '.png', function() {
                    state.loadedItems += 1;
                    p5_loadElem.innerHTML = ((state.loadedItems / state.totalLoadItems) * 100).toFixed(0) + '%';
                })
            );
        }

        if (!state.isMobile) {
            for (var i = 0; i <= state.totalWaterFrames; i += 1) {
                state.waterFrames.push(
                    p.loadImage('src/video/water_wave3/W_' + i + '.jpg', function() {
                        state.loadedItems += 1;
                        p5_loadElem.innerHTML = ((state.loadedItems / state.totalLoadItems) * 100).toFixed(0) + '%';
                    })
                );
            }
        }
    };
};
