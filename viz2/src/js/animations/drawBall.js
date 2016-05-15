import debounce from 'lodash/debounce';
import animatePing from './animatePing.js'

var debouncedPing = debounce(animatePing, 250, {leading: true, trailing: false});

module.exports = (p, state) => {
// module.exports = (p, state, func) => {

    if (state.level > 1.4) {
        state.currentBall += 1;

        if (state.currentBall > state.balls.length - 1) {
            state.currentBall = 0;
        }

        debouncedPing(p, state, 200, 200, 255);

        // func(p, state, 255, 200, 0)
    }

    p.image(state.balls[state.currentBall],
        state.x - state.ballSizeLevel,
        state.y - state.ballSizeLevel,
        state.ballSize * state.ballLevel,
        state.ballSize * state.ballLevel);
};
