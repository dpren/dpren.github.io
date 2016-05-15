import setupFrame from '../animations/setupFrame.js'
import dunnoPhysicsIGuess from '../animations/dunnoPhysicsIGuess.js'
import waterWave from '../animations/waterWave.js'
import backgroundLines from '../animations/backgroundLines.js'
import drawBall from '../animations/drawBall.js'
import parallelLines from '../animations/parallelLines.js'
import spectrum from '../animations/spectrum.js'
import drawText from '../animations/drawText.js'

module.exports = (p, state) => {

    return () => {
        setupFrame(p, state);

        dunnoPhysicsIGuess(p, state);

        waterWave(p, state);

        state.pings.forEach(e => e.update(p, state));

        spectrum(p, state);

        backgroundLines(p, state);

        parallelLines(p, state);

        drawBall(p, state);

        drawText(p, state);
    };
};
