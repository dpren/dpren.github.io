module.exports = (p, state) => {

    return () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);

        state.aspectRatio = p.width/p.height;

        state.ballSize = Math.min(p.width, p.height) / 1.3;
    };
};
