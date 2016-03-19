var sound, tracks, amplitude, amplitudeBandPass, level, levelBandPass, levelVel, size, fft, spectrum, bandPass, gain1, gain2, gainMaster, ballSize;
var aspectRatio, balls, b9, glch, amorph;
var currentBall = 1;
var isPlaying = 1;
var mobileTouched = false;
var y = 300;
var y2 = 600;
var x = 300;
var velY = 3;
var vel2Y = 3;
var velX = 3;
var velYsign = 1;
var velY2sign = 1;
var velXsign = 1;

tracks = [
    './sound/psych.mp3',
    './sound/plastic.mp3',
    './sound/drop_it.mp3',
    './sound/beta_rhythm.mp3'
];

function preload() {
    sound = loadSound(tracks[
        Math.floor(Math.random() * tracks.length)
    ]);

    balls = [
        loadImage("./images/b1.png"),
        loadImage("./images/b2.png"),
        loadImage("./images/b3.png"),
        loadImage("./images/b4.png"),
        loadImage("./images/b5.png"),
        loadImage("./images/b6.png"),
        loadImage("./images/b7.png"),
        loadImage("./images/b8.png"),
        loadImage("./images/b9.png"),
        loadImage("./images/b10.png"),
        loadImage("./images/b11.png"),
        loadImage("./images/b12.png")
    ];
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    stroke(255);
    frameRate(60);
    aspectRatio = width/height;
    ballSize = Math.min(width, height) / 1.3;

    gainMaster = new p5.Gain();
    gainMaster.connect();

    // sound = tracks[Math.floor(Math.random() * tracks.length)];
    sound.setVolume(1.8);
    sound.disconnect();
    sound.play(null, null, null, 0);

    addEventListener('keydown', function(e) {
        if (e.repeat) return;
        if (e.keyCode === 32) {
            if (isPlaying === 1) {
                sound.pause();
                isPlaying = 0;
            } else {
                sound.play();
                isPlaying = 1;
            }
        } else if (e.keyCode === 13) {
            sound.stop();
            sound.play();
            isPlaying = 1;
        }
    });


    gain1 = new p5.Gain(); // setup a gain node
    gain1.setInput(sound); // connect the first sound to its input
    gain1.connect(gainMaster);

    amplitude = new p5.Amplitude();
    amplitude.setInput(gainMaster);
    amplitude.smooth(0.4);

    // bandPass = new p5.BandPass();
    // bandPass.amp(3);
    // bandPass.disconnect();
    // // bandPass.connect(gain1);
    // // bandPass.freq(500);
    // // bandPass.res(50);
    //
    // gain2 = new p5.Gain();
    // gain2.setInput(sound);
    // // gain2.amp(1);
    // gain2.connect(bandPass);
    //
    // amplitudeBandPass = new p5.Amplitude();
    // amplitudeBandPass.setInput(bandPass);
    // amplitudeBandPass.disconnect();
    // amplitudeBandPass.smooth(0.2);

    fft = new p5.FFT();
}

function draw() {
    background(0);
    fill(255);
    if (!sound.isPlaying() && !sound.isPaused() && isPlaying === 1) {
        location.reload();
    }
    // if (mouseIsPressed) {
    //     bandPass.freq(map(mouseX, 0, width, 0, 15000));
    //     bandPass.res(map(mouseY, height, 0, -5, 10));
    // }
    // levelBandPass = 1 + amplitudeBandPass.getLevel() * 6;
    level = 1 + amplitude.getLevel() * 6;

    levelVel = (Math.pow(level, 3) * 5 - 9 + (level*2)) * isPlaying;
    levelVel2 = (Math.pow(level, 4) * 4 - 15 + (level*2)) * isPlaying;

    y += velYsign * levelVel;
    y2 += velY2sign * levelVel2;
    x += velXsign * levelVel;

    var ballLevel = level/4;
    var ballSizeLevel = (ballSize / 2) * ballLevel;

    if (y < ballSizeLevel) {
        y = ballSizeLevel;
        velYsign *= -1;
    } else if (y > height - ballSizeLevel) {
        y = height - ballSizeLevel;
        velYsign *= -1;
    }

    if (y2 < ballSizeLevel) {
        y2 = ballSizeLevel;
        velY2sign *= -1;
    } else if (y2 > height - ballSizeLevel) {
        y2 = height - ballSizeLevel;
        velY2sign *= -1;
    }

    if (x < ballSizeLevel) {
        x = ballSizeLevel;
        velXsign *= -1;
    } else if (x > width - ballSizeLevel) {
        x = width - ballSizeLevel;
        velXsign *= -1;
    }

    stroke(100*level);
    strokeWeight(level);
    // line(0, height/level, width, height/level);

    // stroke(150*level, 10*level, level);
    line(x, height - y, width - x, height - y2);
    // stroke(250, 250, 100*level);
    line(width - x, height - y2, height - y, x/aspectRatio);
    // stroke(level, 250, 100*level);
    line(height - y, x/aspectRatio, y*aspectRatio, (width - x)/aspectRatio);
    // stroke(250, 100*level, 250);
    line(height - y2, x/aspectRatio, x, height - y);
    // stroke(100*level, 250, 250);
    line(y*aspectRatio, (width - x)/aspectRatio, height - y2, x/aspectRatio);
    noStroke();

    fill(level * x/2, level * y/2, level * y2/2);
    rect(0, y2-level, width, levelVel + (y/x)/level*level);
    fill(level * y2/2, level * x/2, level * y/2);
    rect(0, height - (y + y2), width, levelVel/2 + (y2/x)/level*level);

    for (var i = 0; i < Math.max((y + x)/2 - level, width); i += x/10) {
        fill(-x/3, level * y/3, y2/3);
        rect(width, i, -width/5, 0.5 * Math.pow(level, 6));
    }

    image(balls[currentBall],
        x - ballSizeLevel,
        y - ballSizeLevel,
        ballSize * ballLevel,
        ballSize * ballLevel);

        for (var i = 0; i < width/2.5; i += 30) {
            fill(level * x/4, -y/3, level * y/4);
            rect(i, 0, 0.1 * Math.pow(level, 8), x/3 + (height - y) - y2/3);
        }

    if (level > 1.4) {
        currentBall += 1;
        if (currentBall >= 12) {
            currentBall = 0;
        }
    }

    /* draw spectrum */
    spectrum = fft.analyze();
    for (var i = 0; i < spectrum.length; i += 10) {
        fill((width-x)/3, -x/3, (height-y)/3);
        var spectX = map(i, 0, spectrum.length, 0, width);
        var spectH = -height + map(spectrum[i], 0, 255, height, 200);
        rect(spectX, height, width/spectrum.length, spectH);
    }

    if (mobileTouched !== true) {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            textSize(80);
            text('touch to play', windowWidth/4, windowHeight/2);
            addEventListener('touchstart', function() {
                mobileTouched = true;
            })
        }
    }
}
