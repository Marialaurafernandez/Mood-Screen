/// variables
let selectedMood = "happy";
let showClock = true;
// to control the screen "design" = the screen to design the screensaver and "screensaver" is the actual full screen saver view
let appState = "design";

// preview area
let previewX, previewY, previewW, previewH;

// to store the elements of each mood
let bubbles = [];
let clouds = [];
let drops = [];
let rings = [];
let shapes = [];

let thunder = 0;
let thunderTimer = 0;

//SET UP
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Georgia"); //font georgia
  initializeVisuals();
}
//DRAW
//when user is in design page
function draw() {
  if (appState == "design") {
    drawAppBackground();
    drawTitle();
    drawControlPanel();
    drawPreviewWindow();

    //when user clicks "Done" they move to the screensaver page
  } else if (appState == "screensaver") {
    drawFullScreenSaver();
    drawBackButton();
  }
}

//SCREENSAVER ANIMATIONS
function initializeVisuals() {
  bubbles = [];
  for (let i = 0; i < 18; i++) {
    bubbles.push({
      x: random(0, 1000),
      y: random(0, 700),
      size: random(20, 55),
      speedX: random(1, 3),
      speedY: random(-1.2, 1.2),
    });
  }

  clouds = [];
  for (let i = 0; i < 8; i++) {
    clouds.push({
      x: random(0, 1000),
      y: random(70, 400),
      w: random(90, 160),
      h: random(45, 75),
      speed: random(0.25, 0.7),
    });
  }

  drops = [];
  for (let i = 0; i < 140; i++) {
    drops.push({
      x: random(0, 1000),
      y: random(-700, 700),
      len: random(10, 24),
      speed: random(7, 14),
    });
  }

  rings= [];
  for (let i = 0; i < 4; i++) {
    rings.push({
      size: 70 + i * 70,
      speed: random(1.5, 3),
    });
  }

  shapes = [];
  for (let i = 0; i < 24; i++) {
    shapes.push({
      x: random(0, 1000),
      y: random(0, 700),
      size: random(15, 45),
      dx: random(-4, 4),
      dy: random(-4, 4),
      type: int(random(3)),
    });
  }
}
//BACKGROUND

function drawAppBackground() {
  background(255, 236, 209); // main background color

  fill(80, 40, 90);
  ellipse(width * 0.5, height * 0.9, width * 1.2, 260);
}

//TITLES
function drawTitle() {
  fill(80, 40, 90);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(42);
  text("Mood Screen", 40, 45);

  fill(120, 70, 120);
  textStyle(NORMAL);
  textSize(18);
  text("Design a screensaver based on your mood", 42, 80);
}

//DESIGN PANEL
function drawControlPanel() {
  let panelX = 35;
  let panelY = 110;
  let panelW = 360;
  let panelH = 560;

  //background
  noStroke();
  fill(255, 248, 235);
  rect(panelX, panelY, panelW, panelH, 24);

  //title
  fill(95, 55, 110);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(22);
  text("Customize", panelX + 20, panelY + 30);

  //underline details
  fill(255, 180, 90);
  rect(panelX + 20, panelY + 45, 80, 5, 3);

  // choose your vibe section
  fill(95, 55, 110);
  textSize(17);
  text("Choose your mood", panelX + 20, panelY + 80);

  //buttons layout
  let btnX = panelX + 20;
  let btnW = panelW - 40;
  let btnH = 44;
  let gap = 53;
  let startY = panelY + 105;

  //mood buttons
  drawMoodButton(btnX, startY + gap * 0, btnW, btnH, "happy", "Happy");
  drawMoodButton(btnX, startY + gap * 1, btnW, btnH, "calm", "Calm");
  drawMoodButton(btnX, startY + gap * 2, btnW, btnH, "sad", "Sad");
  drawMoodButton(btnX, startY + gap * 3, btnW, btnH, "focused", "Focused");
  drawMoodButton(btnX, startY + gap * 4, btnW, btnH, "crazy", "Crazy");

  let crazyBottom = startY + gap * 4 + btnH;
  let doneY = panelY + 515;
  let doneH = 44;

  let emptyTop = crazyBottom;
  let emptyBottom = doneY;
  let emptyMiddle = (emptyTop + emptyBottom) / 2;

  let labelY = emptyMiddle - 32;
  let toggleY = emptyMiddle - 5;

  // Show clock option
  fill(95, 55, 110);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(17);
  text("Show Clock?", panelX + 20, labelY - 14);

  let toggleGap = 12;
  let toggleW = (btnW - toggleGap) / 2;
  let toggleH = btnH;

  // yes or no buttons
  drawToggle(btnX, toggleY - 17, toggleW, toggleH, "YES", showClock);
  drawToggle(
    btnX + toggleW + toggleGap,
    toggleY - 17,
    toggleW,
    toggleH,
    "NO",
    !showClock
  );

  drawDoneButton(panelX + 70, doneY - 29, 220, doneH);
}

function drawDoneButton(x, y, w, h) {
  noStroke();

  if (overRect(x, y, w, h)) {
    fill(255, 145, 80);
  } else {
    fill(255, 135, 70);
  }

  rect(x, y, w, h, 16);

  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(20);
  text("Done", x + w / 2, y + h / 2);
}

//PREVIEW SECTION
function drawPreviewWindow() {
  // preview box size
  previewX = 450;
  previewY = 110;
  previewW = width - 500;
  previewH = height - 180;

  //box
  noStroke();
  fill(255, 248, 235);
  rect(previewX, previewY, previewW, previewH, 28);

  //title
  fill(95, 55, 110);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(24);
  text("Preview", previewX + 25, previewY + 35);

  // inner box
  let screenX = previewX + 20;
  let screenY = previewY + 60;
  let screenW = previewW - 40;
  let screenH = previewH - 80;

  fill(20);
  rect(screenX, screenY, screenW, screenH, 20);

  // design staying inside the screen
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.roundRect(screenX, screenY, screenW, screenH, 20);
  drawingContext.clip();

  // show the selected design/vibe
  drawSelectedSaver(screenX, screenY, screenW, screenH);

  // show clock if selected
  if (showClock) {
    drawDateTime(screenX, screenY, screenW, screenH);
  }

  drawingContext.restore();
  pop();
}

//SELECTION OF VIBE
function drawSelectedSaver(x, y, w, h) {
  if (selectedMood == "happy") {
    drawHappySaver(x, y, w, h);
  } else if (selectedMood == "calm") {
    drawCalmSaver(x, y, w, h);
  } else if (selectedMood == "sad") {
    drawSadSaver(x, y, w, h);
  } else if (selectedMood == "focused") {
    drawFocusedSaver(x, y, w, h);
  } else if (selectedMood == "crazy") {
    drawCrazySaver(x, y, w, h);
  }
}

// full screen
function drawFullScreenSaver() {
  drawSelectedSaver(0, 0, width, height);

  // if clock selected
  if (showClock) {
    drawDateTime(0, 0, width, height);
  }
}

// ------------------------ back button
function drawBackButton() {
  // position and size of the button
  let x = 30;
  let y = 30;
  let w = 130;
  let h = 50;

  noStroke();

  //mouse hovering color change
  if (overRect(x, y, w, h)) {
    fill(255, 245, 230, 240);
  } else {
    fill(255, 250, 240, 220);
  }

  // rounded rectangle button
  rect(x, y, w, h, 16);

  // text inside
  fill(90, 50, 105);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(22);
  text("Back", x + w / 2, y + h / 2);
}

//MOOD BUTTONS
function drawMoodButton(x, y, w, h, moodValue, label) {
  // this will check if button is selected
  let active = selectedMood == moodValue;

  // if its selected turn darker color, if it's hovering change to a lighter color and if its neither - default color
  noStroke();
  if (active) {
    fill(255, 190, 110);
  } else if (overRect(x, y, w, h)) {
    fill(255, 225, 180);
  } else {
    fill(245, 235, 220);
  }

  // button
  rect(x, y, w, h, 14);

  //text
  fill(90, 50, 105);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(18);
  text(label, x + w / 2, y + h / 2);
}
//--------------------------------FOR SHOW CLOCK NOW
function drawToggle(x, y, w, h, label, active) {
  noStroke();

  //if its selected turn darker color, if its hovering change to a lighter color and if its neither - default color

  if (active) {
    fill(255, 190, 110);
  } else if (overRect(x, y, w, h)) {
    fill(255, 225, 180);
  } else {
    fill(245, 235, 220);
  }

  rect(x, y, w, h, 14);

  // yes or no
  fill(90, 50, 105);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(18);
  text(label, x + w / 2, y + h / 2);
}

// HAPPY
function drawHappySaver(x, y, w, h) {
  backgroundInBox(x, y, w, h, color(255, 220, 120), color(255, 160, 140));

  noStroke();

  //sun
  fill(255, 235, 90);
  ellipse(x + w * 0.82, y + h * 0.2, 110, 110);

  // clouds
  fill(255, 255, 255, 120);
  ellipse(x + w * 0.2, y + h * 0.22, 120, 60);
  ellipse(x + w * 0.3, y + h * 0.18, 90, 50);
  ellipse(x + w * 0.38, y + h * 0.23, 110, 55);

  let bubbleColors = [
    [255, 90, 120, 170],
    [90, 180, 255, 170],
    [255, 220, 70, 170],
    [120, 230, 180, 170],
  ];

  //move bubbles
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    let c = bubbleColors[i % bubbleColors.length];

    fill(c[0], c[1], c[2], c[3]);

    //
    ellipse(x + (b.x % w), y + (b.y % h), b.size, b.size);

    // speed and movement
    b.x += b.speedX;
    b.y += b.speedY;

    // reset if it is out of the boundaries
    if (b.x > w + 60) b.x = -60;
    if (b.y > h + 60) b.y = -60;
    if (b.y < -60) b.y = h + 60;
  }
}

// CALM
function drawCalmSaver(x, y, w, h) {
  backgroundInBox(x, y, w, h, color(110, 150, 210), color(220, 180, 220));

  noStroke();

  // sun
  fill(255, 250, 235, 180);
  ellipse(x + w * 0.8, y + h * 0.22, 90, 90);

  // clouds moving
  for (let i = 0; i < clouds.length; i++) {
    let c = clouds[i];

    fill(255, 255, 255, 95);
    ellipse(x + c.x, y + c.y, c.w, c.h);
    ellipse(x + c.x - c.w * 0.22, y + c.y + 8, c.w * 0.6, c.h * 0.7);
    ellipse(x + c.x + c.w * 0.22, y + c.y + 5, c.w * 0.65, c.h * 0.75);

    // cloud speed
    c.x += c.speed;

    // reset when out of boundary
    if (c.x > w + 100) c.x = -100;
  }
}

// SAD
function drawSadSaver(x, y, w, h) {
  // rainy
  backgroundInBox(x, y, w, h, color(40, 60, 95), color(90, 110, 150));

  // dark clouds
  noStroke();
  fill(50, 60, 80, 220);
  ellipse(x + w * 0.25, y + h * 0.18, 180, 80);
  ellipse(x + w * 0.42, y + h * 0.16, 200, 90);
  ellipse(x + w * 0.62, y + h * 0.2, 210, 85);

  // rain
  stroke(170, 210, 255, 150);
  strokeWeight(2);
  for (let i = 0; i < drops.length; i++) {
    let r = drops[i];

    // rain
    line(x + (r.x % w), y + r.y, x + (r.x % w) - 6, y + r.y + r.len);
    r.y += r.speed;

    // reset drop to the top and fall again
    if (r.y > h + 30) {
      r.y = random(-200, -20);
      r.x = random(0, w);
    }
  }

  // thunder timing
  thunderTimer++;

  // random thunder
  if (thunderTimer > 110 && random(1) < 0.03) {
    thunder = 255;
    thunderTimer = 0;
  }

  //lightning
  if (thunder > 0) {
    stroke(255, 255, 210);
    strokeWeight(4);
    let tx = x + w * 0.72;
    let ty = y + 70;

    // lightning shape
    line(tx, ty, tx - 20, ty + 45);
    line(tx - 20, ty + 45, tx + 8, ty + 45);
    line(tx + 8, ty + 45, tx - 25, ty + 100);

    // flash overlay
    noStroke();
    fill(255, 255, 255, thunder * 0.35);
    rect(x, y, w, h);

    // fading out
    thunder -= 18;
  }
}

// FOCUSED
function drawFocusedSaver(x, y, w, h) {
  // gradient inside box
  backgroundInBox(x, y, w, h, color(25, 15, 55), color(85, 20, 120));

  // cx and cy is the center x and center y of the screen saver area. this is the a center point where everthing comes from
  let cx = x + w / 2;
  let cy = y + h / 2;

  noFill();
  // loop
  for (let i = 0; i < rings.length; i++) {
    let ring = rings[i];

    // each ring has a different color depending on position of array
    if (i == 0) stroke(255, 80, 120, 180);
    if (i == 1) stroke(90, 220, 255, 180);
    if (i == 2) stroke(255, 220, 80, 180);
    if (i == 3) stroke(140, 255, 180, 180);

    // thickness of ring outline
    strokeWeight(4);

    // draw a ring from the center using current size
    ellipse(cx, cy, ring.size, ring.size);

    // the ring growing every frame
    ring.size += ring.speed;

    // if ring gets big, reset
    if (ring.size > w * 0.9) {
      ring.size = 60;
    }
  }
}

// CRAZY
function drawCrazySaver(x, y, w, h) {
  backgroundInBox(x, y, w, h, color(255, 90, 140), color(120, 60, 255));

  // shapes moving
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];

    // choose shape color based on index
    if (i % 4 == 0) fill(255, 235, 90, 180);
    if (i % 4 == 1) fill(90, 255, 220, 180);
    if (i % 4 == 2) fill(255, 120, 170, 180);
    if (i % 4 == 3) fill(255, 255, 255, 160);

    noStroke();

    if (s.type == 0) {
      // circle
      ellipse(x + s.x, y + s.y, s.size, s.size);
    } else if (s.type == 1) {
      rect(x + s.x, y + s.y, s.size, s.size, 8);
    } else {
      // triangle
      triangle(
        x + s.x,
        y + s.y - s.size / 2,
        x + s.x - s.size / 2,
        y + s.y + s.size / 2,
        x + s.x + s.size / 2,
        y + s.y + s.size / 2
      );
    }

    // move shapes every frame
    s.x += s.dx;
    s.y += s.dy;

    // if shape hits boundry, reverse the direction
    if (s.x < 0 || s.x > w) s.dx *= -1;
    if (s.y < 0 || s.y > h) s.dy *= -1;
  }
}
//DATE AND TIME
function drawDateTime(x, y, w, h) {
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);

  // always have two digits
  let hr = nf(hour(), 2);
  let mn = nf(minute(), 2);
  let sc = nf(second(), 2);

  let mo = nf(month(), 2);
  let dy = nf(day(), 2);
  let yr = year();

  // date at top
  textStyle(NORMAL);
  textSize(20);
  text(mo + "/" + dy + "/" + yr, x + w / 2, y + 45);

  // time at middle
  textStyle(BOLD);
  textSize(58);
  text(hr + ":" + mn + ":" + sc, x + w / 2, y + h / 2);
}

// BACKGROUND
function backgroundInBox(x, y, w, h, c1, c2) {
  noStroke();
  fill(c1);
  rect(x, y, w, h);
}

function overRect(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

// Mouse Pressed
// detects in app state design
function mousePressed() {
  if (appState == "design") {
    let panelX = 35;
    let panelY = 110;
    let panelW = 360;

    let btnX = panelX + 20;
    let btnW = panelW - 40;
    let btnH = 44;
    let gap = 53;
    let startY = panelY + 105;

    // if button is clicked then it will switch screen to selected screen saver
    if (overRect(btnX, startY + gap * 0, btnW, btnH)) {
      selectedMood = "happy";
    } else if (overRect(btnX, startY + gap * 1, btnW, btnH)) {
      selectedMood = "calm";
    } else if (overRect(btnX, startY + gap * 2, btnW, btnH)) {
      selectedMood = "sad";
    } else if (overRect(btnX, startY + gap * 3, btnW, btnH)) {
      selectedMood = "focused";
    } else if (overRect(btnX, startY + gap * 4, btnW, btnH)) {
      selectedMood = "crazy";
    }

    let crazyBottom = startY + gap * 4 + btnH;
    let doneY = panelY + 515;
    let emptyTop = crazyBottom;
    let emptyBottom = doneY;
    let emptyMiddle = (emptyTop + emptyBottom) / 2;
    let toggleY = emptyMiddle - 5;

    if (overRect(panelX + 35, toggleY, 120, 48)) {
      showClock = true;
    } else if (overRect(panelX + 205, toggleY, 120, 48)) {
      showClock = false;
    }

    // fixed done button click area
    if (overRect(panelX + 70, doneY - 29, 220, 44)) {
      appState = "screensaver";
    }
  } else if (appState == "screensaver") {
    if (overRect(30, 30, 130, 50)) {
      appState = "design";
    }
  }
}

//resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
