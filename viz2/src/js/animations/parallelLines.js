module.exports = (p, state) => {

    // horizontal
    for (let i = 0; i < Math.max((state.y + state.x) / 2 - state.level, p.width); i += state.x / 10) {
        p.fill(-state.x/3, state.level * state.y/3, state.y2/3);
        p.rect(p.width,
            i,
            -p.width / 5,
            0.5 * Math.pow(state.level, 6));
    }

    // vertical
    for (let i = (p.width - state.x) * 0.6; i > 0; i -= p.width / state.x*20) {
        p.fill(state.level * state.x / 4, -state.y / 3, state.level * state.y / 4);
        // p.rect(i, 0, 0.1 * Math.pow(state.level, 8), state.x/3 + (p.height - state.y) - state.y2/3);

        p.rect(i,
            0,
            -0.1 * Math.pow(state.level, 8),
            Math.max(state.y2 - state.level, p.height - (state.y + state.y2)) );
            // state.x / 4 + (p.height - state.y) - state.y2 / 3);
    }
};
