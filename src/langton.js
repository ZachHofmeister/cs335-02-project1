const ANTUP = 0;
const ANTRIGHT = 1;
const ANTDOWN = 2;
const ANTLEFT = 3;

var g_canvas = { cell_size:10, wid:90, hgt:90 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 1; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.

var iterations = 5; // # of steps per g_frame_mod. increase this to see results quickly.

var g_bot = { dir:ANTLEFT, x:45, y:45, color:955 }; // Dir is 0..7 clock, w 0 up.

var grid = [];
var width;
var height;

function setup() // P5 Setup Fcn
{
    var sz = g_canvas.cell_size;
    width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
	
	background("#000");
	
	for (var i = 0; i < width * height; i++) grid[i] = 0;
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
	draw_bot();
}

function draw_bot() {
	let sz = g_canvas.cell_size;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz;
	
    fill( "#" + g_bot.color ); // Concat string, auto-convert the number to string.
    rect( x, y, sz, sz );
}

function move_bot() {
	var state = grid_get(g_bot.x, g_bot.y);
	
	if (state == 0) {
		turn_right();
		update_cell(g_bot.x, g_bot.y, 1);
		move_forward();
	}
	else if (state == 1) {
		turn_left();
		update_cell(g_bot.x, g_bot.y, 0);
		move_forward();
	}
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

/*
function move_forward() {
	if (g_bot.dir == ANTUP) g_bot.y--;
	else if (g_bot.dir == ANTRIGHT) g_bot.x++;
	else if (g_bot.dir == ANTDOWN) g_bot.y++;
	else if (g_bot.dir == ANTLEFT) g_bot.x--;
	
	if (g_bot.x > width - 1) g_bot.x = 0;
	else if (g_bot.x < 0) g_bot.x = width - 1;

	if (g_bot.y > height - 1) g_bot.y = 0;
	else if (g_bot.y < 0) g_bot.y = height - 1;
}
*/

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
	
	//console.log("move_forward: " + g_bot.x + " "+ g_bot.y);
}

function update_cell(x, y, newState) {
	let sz = g_canvas.cell_size;
    let rectX = 1+ x*sz; // Set x one pixel inside the sz-by-sz cell.
    let rectY = 1+ y*sz;
	
	grid_set(x, y, newState);
	
	fill(newState == 0 ? "#000" : "#fff");
	rect(rectX, rectY, sz, sz);
}

function grid_get(x, y) {
	return grid[x + width * y];
}

function grid_set(x, y, state) {
	grid[x + width * y] = state;
}
