module.exports = (p, state, r,g,b) => {

    let pingAnimation = {
        velocity: state.pingVelocityConst,
        radius: state.ballSize * state.ballLevel,
        x: state.x,
        y: state.y,
        update: function(p, state) {
            if (this.velocity > 0.2) {
                p.noFill();

                p.stroke('rgba(220,220,230,'+ (this.velocity * (255 / state.pingVelocityConst)) / 255 +')');

                p.ellipse(this.x + (r/50), this.y, this.radius, this.radius);
                p.noStroke();

                this.radius += this.velocity;

                this.velocity *= 0.97;

            } else {
                state.pings.splice(state.pings.indexOf(this), 1);
            }
        }
    };

    state.pings.push(pingAnimation);
};
