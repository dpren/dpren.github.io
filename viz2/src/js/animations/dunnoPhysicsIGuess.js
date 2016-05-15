module.exports = (p, state) => {

    state.level = 1 + state.amplitude.getLevel() * 6;
    // state.levelBandPass = 1 + amplitudeBandPass.getLevel() * 6;

    state.levelVel = (Math.pow(state.level, 3) * 5 - 9 + (state.level*2)) * state.isPlaying;
    state.levelVel2 = (Math.pow(state.level, 4) * 4 - 15 + (state.level*2)) * state.isPlaying;

    state.y += state.velYsign * state.levelVel;
    state.y2 += state.velY2sign * state.levelVel2;
    state.x += state.velXsign * state.levelVel;

    state.ballLevel = state.level/4;
    state.ballSizeLevel = (state.ballSize / 2) * state.ballLevel;

    if (state.y < state.ballSizeLevel) {
        state.y = state.ballSizeLevel;
        state.velYsign *= -1;
    } else if (state.y > p.height - state.ballSizeLevel) {
        state.y = p.height - state.ballSizeLevel;
        state.velYsign *= -1;
    }

    if (state.y2 < state.ballSizeLevel) {
        state.y2 = state.ballSizeLevel;
        state.velY2sign *= -1;
    } else if (state.y2 > p.height - state.ballSizeLevel) {
        state.y2 = p.height - state.ballSizeLevel;
        state.velY2sign *= -1;
    }

    if (state.x < state.ballSizeLevel) {
        state.x = state.ballSizeLevel;
        state.velXsign *= -1;
    } else if (state.x > p.width - state.ballSizeLevel) {
        state.x = p.width - state.ballSizeLevel;
        state.velXsign *= -1;
    }


    state.currentFrame += Math.floor(state.waterVelSign * state.levelVel);

    if (state.currentFrame <= 0) {
        state.currentFrame = 4;
        state.waterVelSign *= -1;
    } else if (state.currentFrame >= state.totalWaterFrames - 1) {
        state.currentFrame = state.totalWaterFrames - 4;
        state.waterVelSign *= -1;
    }
};
