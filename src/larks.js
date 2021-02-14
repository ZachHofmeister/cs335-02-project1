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

// different variations of cellColors you can play with.
// the first one is mentioned in the project pdf, where the professor covers how the TP multi-color ant works.
// const cellColors = [["#5555cc",0],["#55cc55",1],["#cc5555",1]]; //B (right), G (left), R(left)
const cellColors = [[BLACK, 1], [RED, 0], [YELLOW, 2], [BLUE, 1]]; // Trinary color system mentioned in instructions.  Left, Right, Straight, Left
//const cellColors = [["#5555cc",0],["#55cc55",0],["#cc5555",1]];
//const cellColors = [["#5555cc",1],["#55cc55",0],["#cc5555",0]];
//const cellColors = [["#5555cc",1],["#55cc55",1],["#cc5555",0]]; // similar to langton's ant "traffic"
//const cellColors = [["#5555cc",1],["#55cc55",0],["#cc5555",1]];

var g_canvas = { cell_size:10, wid:90, hgt:90 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 10; // Update every 'mod' frames.
var g_stop = 0; // Go by default.

var iterations = 1; // # of steps per g_frame_mod. increase this to see results quickly.

var g_bot = { dir:ANTLEFT, x:g_canvas.wid/2, y:g_canvas.hgt/2, color:"#fff", mode:LR, counter:0}; // Dir is 0..7 clock, w 0 up.

var width;
var height;

function setup() // P5 Setup Fcn
{	
    var sz = g_canvas.cell_size;
    width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
	
	background(cellColors[0][0]); // set canvas to blue (default cell color)
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        if (!g_stop) draw_update();
    }
}

function draw_update()
{
	for (var i = 0; i < iterations; i++) move_bot();
	
	// not compatible with current implementation, since i'm grabbing pixel's value rather than a value from an array (like langton.js).
	// would need to have a cell array that's independent of canvas in order for draw_bot to function properly.
	//draw_bot();
}

/*
function draw_bot() {
	let sz = g_canvas.cell_size;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz;
	
    fill( g_bot.color ); // Concat string, auto-convert the number to string.
    rect( x, y, sz, sz );
}
*/

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
    case ANTUP : 	{  dy = -1; break; }
    case ANTRIGHT : { dx = 1; break; }
    case ANTDOWN : { dy = 1; break; }
    case ANTLEFT : { dx = -1; break; }
    }
    let cw = g_canvas.wid;// - 1;
	let ch = g_canvas.hgt;// - 1;
	let x = (dx + g_bot.x + cw) % cw;
    let y = (dy + g_bot.y + ch) % ch;	
	g_bot.x = x; // Update bot x.
    g_bot.y = y;
	fill(0,0);
	stroke("#fff");
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
