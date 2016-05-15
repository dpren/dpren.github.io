module.exports = (p, state) => {

    let spectrum = state.fft.analyze();
    window._spectrum = spectrum;

    for (let i = 0; i < spectrum.length * 0.4; i += 2) {
        p.noStroke();
        p.fill((p.width-state.x)/3, -state.x/3, (p.height-state.y)/3);

        let spectX = p.map(i,
            0, spectrum.length * 0.4,
            0, p.width - (p.width / 5));

        let spectH = -p.height + p.map(spectrum[i],
            0, 255,
            p.height, Math.max(state.y2 - state.level, p.height - (state.y + state.y2)));

        p.rect(spectX, p.height, 2, spectH);
    }
};
