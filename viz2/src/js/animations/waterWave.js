module.exports = (p, state) => {
    if (!state.isMobile) {

        p.image(state.waterFrames[state.currentFrame],
            (p.width - state.x) * 0.6,
            state.y2 - state.level,
            (p.width - (p.width / 5)) - ((p.width - state.x) * 0.6),
            // (p.width / 2.5) - (p.width * 0.6  - state.x),
            (p.height - (state.y + state.y2)) - state.y2 - state.level);
            // p.height - p.height / 2);

        // p.fill(200);
        // p.rect(800 / (state.totalWaterFrames / state.currentFrame), 450, 2, 10);
        //
        // drawText(p, state);
    }
};
