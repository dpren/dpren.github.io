module.exports = (p, state) => {

    p.stroke(100*state.level);
    p.strokeWeight(state.level);
    // p.line(0, p.height/state.level, p.width, p.height/state.level);

    // p.stroke(150*state.level, 10*state.level, state.level);
    p.line(state.x, p.height - state.y, p.width - state.x, p.height - state.y2);
    // p.stroke(250, 250, 100*state.level);
    p.line(p.width - state.x, p.height - state.y2, p.height - state.y, state.x/state.aspectRatio);
    // p.stroke(state.level, 250, 100*state.level);
    p.line(p.height - state.y, state.x/state.aspectRatio, state.y*state.aspectRatio, (p.width - state.x)/state.aspectRatio);
    // p.stroke(250, 100*state.level, 250);
    p.line(p.height - state.y2, state.x/state.aspectRatio, state.x, p.height - state.y);
    // p.stroke(100*state.level, 250, 250);
    p.line(state.y*state.aspectRatio, (p.width - state.x)/state.aspectRatio, p.height - state.y2, state.x/state.aspectRatio);
    p.noStroke();


    // main
    p.fill(state.level * state.x/2,
           state.level * state.y/2,
           state.level * state.y2/2);

    p.rect(0,
           state.y2 - state.level,
           p.width,
           state.levelVel + (state.y/state.x)/state.level*state.level);


    p.fill(state.level * state.y2/2,
           state.level * state.x/2,
           state.level * state.y/2);

    p.rect(0,
           p.height - (state.y + state.y2),
           p.width,
           state.levelVel/2 + (state.y2/state.x)/state.level*state.level);
};
