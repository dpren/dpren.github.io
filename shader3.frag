#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float mouseX () {
    return 410.0 + ((u_mouse.x/u_resolution.x)/420.0);
}

float mouseY () {
    return 0.1;
}

float mouseYInv () {
    return ((u_resolution.y - u_mouse.y)/u_resolution.y);
}

float resX () {
    return 830.0+(mouseYInv()*195.0);
    // return 1000.0+(mouseYInv()*20.0);
}

float timeStart (float t) {
    return t + 4000.0;
}

float random (in float x) {
    return fract(sin(x*(mouseX()*25.01))*(10e2));
}

float random (in vec2 st) {
    //return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
    return fract(sin(dot(st.xy, vec2(4.4,-14.99)*7.464))* -6.5);
}

float pattern(vec2 st, vec2 v, float t) {
    vec2 p = floor(st+v);
    //return step(t, random(100.+p*.000001)+random(p.x)*0.5 );
    return step(t, random(100.+p*.0001)+random(p.x)*0.5 );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= resX()/1005.0;

    vec2 grid = vec2(1000,(500.5+ timeStart(u_time) *0.001));
    st *= grid;

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    vec2 vel = vec2((timeStart(u_time)) *0.025*max(grid.x,grid.y)); // time
    vel *= vec2(-.5,.06) * random(1.0+ipos.x); // direction

    vec2 offset = vec2(1,0.5+mouseY());

    vec3 color = vec3(0.);
    color.r = pattern(st+offset,vel,0.5+mouseX()/resX());
    color.g = pattern(st,vel,0.5+mouseX()/resX());
    color.b = pattern(st-offset,vel,0.5+mouseX()/resX());

    // Margins
    color *= step(((501.5+(mouseY()/mouseY()))/1005.0),fpos.y);

    gl_FragColor = vec4(color,1.0);
}
