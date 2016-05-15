module.exports = (p, state) => {

    p.noStroke();

    p.textSize(18);
    p.fill(180);
    if (screen.width !== window.innerWidth) {
        p.text(state.currentTrack.id, 5, p.height - 25, p.width/2, p.height - 200);
    }

    if (state.isMobile && state.mobileTouched !== true) {
        p.textSize(80);
        p.text('touch to play', p.width/4, p.height/2);
        function listener(e) {
            state.mobileTouched = true;
            e.target.removeEventListener('touchstart', listener);
        }
        addEventListener('touchstart', listener);
    }
};
