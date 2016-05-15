import P5 from 'p5'
import 'p5/lib/addons/p5.sound'
import 'p5/lib/addons/p5.dom'
import tracks from './src/js/init/tracks.js'
import state from './src/js/init/config.js'

import preload from './src/js/init/preload.js'
import windowResized from './src/js/init/windowResized.js'
import setup from './src/js/init/setup.js'
import draw from './src/js/init/draw.js'

const s = function (p) {
    if ( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
        state.isMobile = true;
    }


    state.currentTrack = tracks[Math.floor(Math.random() * tracks.length)];

    state.totalLoadItems = state.totalWaterFrames + 29 + 2 + 1;


    p.preload = preload(p, state, tracks);

    p.windowResized = windowResized(p, state, tracks);

    p.setup = setup(p, state);

    p.draw = draw(p, state);
}

new P5(s)
