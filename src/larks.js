//CS335-02 Project 1 - Team YZJ
//Authors: 
//	Youssef Chahine	- ykchahine@csu.fullerton.edu
//	Zach Hofmeister	- zachhof@csu.fullerton.edu
//	Jonathan Hana	- hanaj97@csu.fullerton.edu
//File Name: larks.js
//File Description: Contains the source code for the larks ant implimentation.

const ANTUP = 0;
const ANTRIGHT = 1;
const ANTDOWN = 2;
const ANTLEFT = 3;

const BLACK = "#000000";
const RED = "#cc5555";
const YELLOW = "#cccc55";
const BLUE = "#5555cc";

const LR = 0;
const SET_COUNT = 1;
const COUNTDOWN = 2;

const cellColors = [[BLUE, 1], [YELLOW, 2], [RED, 0], [BLACK, 1]]; // Trinary color system outlined in instructions.  Left, Right, Straight, Left
// different variations of cellColors you can play with.
// the first one is mentioned in the project pdf, where the professor covers how the TP multi-color ant works.
// const cellColors = [["#5555cc",0],["#55cc55",1],["#cc5555",1]]; //B (right), G (left), R(left)
// const cellColors = [["#5555cc",0],["#55cc55",0],["#cc5555",1]];
// const cellColors = [["#5555cc",1],["#55cc55",0],["#cc5555",0]];
// const cellColors = [["#5555cc",1],["#55cc55",1],["#cc5555",0]]; // similar to langton's ant "traffic"
// const cellColors = [["#5555cc",1],["#55cc55",0],["#cc5555",1]];

var g_canvas = { cell_size:10, wid:60, hgt:40 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 1; // Update every 'mod' frames.
var g_stop = 0; // Go by default.
var g_showAnt = 0; //Hidden by default

var iterations = 1; // # of steps per g_frame_mod. increase this to see results quickly.

var g_bot = {dir:ANTUP, x:g_canvas.wid/2, y:g_canvas.hgt/2, color:"#fff", mode:LR, counter:0}; // Dir is 0..7 clock, w 0 up.

var width;
var height;

function setup() { // P5 Setup Fcn
    var sz = g_canvas.cell_size;
    width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
	background(cellColors[3][0]); // set canvas to black (default cell color)
}

function draw() { // P5 Frame Re-draw Fcn, Called for Every Frame.	
    ++g_frame_cnt;
	//The following two lines give output similar to the first 30 moves example txt. MAKE SURE iterations and g_frame_mod both = 1
	// let tempState = get_state(g_bot.x, g_bot.y);
	// console.log(` #${g_frame_cnt} {p=${g_bot.x},${g_bot.y} d=${g_bot.dir} m=${g_bot.mode} i=${g_bot.counter}}; {c=${tempState[0]} t=${tempState[1]}}`);

    if (0 == g_frame_cnt % g_frame_mod) {
        if (!g_stop) draw_update();
    }
}

function draw_update() {
	for (var i = 0; i < iterations; i++) move_bot();
}

function move_bot() {
	var state = get_state(g_bot.x, g_bot.y); //Get the hex color at current bot position
		
	if (state == null) return;
	
	switch(g_bot.mode) { //Step 1
		case LR: {
			if (state[1] == 0) { //Red
				turn_right();
			} else if (state[1] == 1) { //Black, Blue
				turn_left();
			} else if (state[1] == 2) { //Yellow
				g_bot.mode = SET_COUNT;
			}	
			break;
		}
		case SET_COUNT: {
			g_bot.counter = state[0];
			g_bot.mode = COUNTDOWN;
			break;
		}
		case COUNTDOWN: {
			if (g_bot.counter == 0) g_bot.mode = LR;
			else --g_bot.counter;
			break;
		}
	}
	update_cell(g_bot.x, g_bot.y, state[0]);
	move_forward();
}

function get_state(x, y) {
	var colHex = get_color_hex(x, y);
	
	for (var i = 0; i < cellColors.length; i++) {
		if (colHex == cellColors[i][0]) {
			return [i, cellColors[i][1]]; // [index, state]
		}
	}
	
	return null;
}

function get_color_hex(x, y) {
	let sz = g_canvas.cell_size;
	let px = (x * sz) + (sz / 2);
	let py = (y * sz) + (sz / 2);
	
	//console.log("get_color_hex: " + x + " " + y + " " + px + " " + py);
	
	return color(get(px, py)).toString("#rrggbb");
}

function turn_right() {
	g_bot.dir++;
	if (g_bot.dir > ANTLEFT) g_bot.dir = ANTUP;
	//g_bot.dir = (g_bot.dir + 1) % (ANTLEFT + 1);
}

function turn_left() {
	g_bot.dir--;
	if (g_bot.dir < ANTUP) g_bot.dir = ANTLEFT;
	//g_bot.dir = (g_bot.dir - 1) % (ANTLEFT + 1);
}

function move_forward() {
	let dx = 0;
    let dy = 0;
    switch (g_bot.dir) { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
    case ANTUP : 	{  dy = 1; break; }
    case ANTRIGHT : { dx = 1; break; }
    case ANTDOWN : { dy = -1; break; }
    case ANTLEFT : { dx = -1; break; }
    }
    let cw = g_canvas.wid;// - 1;
	let ch = g_canvas.hgt;// - 1;
	let x = (dx + g_bot.x + cw) % cw;
    let y = (dy + g_bot.y + ch) % ch;	
	g_bot.x = x; // Update bot x.
    g_bot.y = y;
	fill(0,0);
	if (g_showAnt) stroke(g_bot.color);
	else stroke("#000");
	let sz = g_canvas.cell_size;
	rect(1+g_bot.x * sz, 1+g_bot.y * sz, sz, sz);
	
	//console.log("move_forward: " + g_bot.x + " "+ g_bot.y);
}

function update_cell(x, y, index) {
	let sz = g_canvas.cell_size;
    let rectX = 1+ x*sz; // Set x one pixel inside the sz-by-sz cell.
    let rectY = 1+ y*sz;
	
	var imod = (index + 1) % cellColors.length; //% cellColors.length;
	
	fill(cellColors[imod][0]);
	stroke("#000");
	rect(rectX, rectY, sz, sz);
	
	//console.log("update_call: " + x + " " + y + " " + rectX + " " + rectY);
}

function keyPressed() {
	// console.log(`keyPressed: ${keyCode}`);
    if (keyCode == 32) g_stop = !g_stop; //Spacebar pause
	if (key = 'a') g_showAnt = !g_showAnt; //a key show/hide ant positon
}

// function mousePressed( )
// {
//     let x = mouseX;
//     let y = mouseY;
//     //console.log( "mouse x,y = " + x + "," + y );
//     let sz = g_canvas.cell_size;
//     let gridx = round( (x-0.5) / sz );
//     let gridy = round( (y-0.5) / sz );
//     //console.log( "grid x,y = " + gridx + "," + gridy );
//     //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
//     g_bot.x = gridx + g_box.wid; // Ensure its positive.
//     //console.log( "bot x = " + g_bot.x );
//     g_bot.x %= g_box.wid; // Wrap to fit box.
//     g_bot.y = gridy + g_box.hgt;
//     //console.log( "bot y = " + g_bot.y );
//     g_bot.y %= g_box.hgt;
//     //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
//     draw_bot( );
// }