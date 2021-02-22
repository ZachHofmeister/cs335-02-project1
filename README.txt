CPSC 335-02 Project 1 - Larks Ant
Team Name: YZJ
	Members: Youssef Chahine, Zach Hofmeister, Jonathan Hana

Intro

	This project is based on the TP (Turk-Prop) Ant Cellular Automata, with an extension to include different modes other than LR (Left-Right), such as "Set-Count" and "Countdown".
	Hence why this algorithm is called Cella "Larks" Ant, since it derives from the "LRCS" modes.
	The "Set-Count" mode will set the counter to the color index that the ant is on, then change the "Countdown" mode.
	The "Countdown" mode will decrement a counter on each step and continuously check if the counter is 0. If it's 0, it will change to "LR" mode, increment the cell's color, then move to the neighboring cell.
	There is no need to interact with the ant, it will simply move on its own on the canvas.

	This is designed to run on your browser, so there is no need to install any programs for it to work.
	To get started, just double-click the "larks.html" file for it to run on your browser; you can also drag-and-drop it onto your browser.
	You also do not need to worry about building it, it will simply just run after any code changes.
	You do however need to refresh the page if you make any code changes while the page is open, in order to see active changes.
	
	This was programmed in HTML and JavaScript, and the library P5.js is used for drawing on the canvas.
	If you'd like to know more about these technologies, visit the following links:
		HTML: https://en.wikipedia.org/wiki/HTML
		JavaScript: https://en.wikipedia.org/wiki/JavaScript
		P5.js https://p5js.org/

Zip Contents

	README.txt - This file.
	
	src/larks.html - Run this file by either double clicking on it, or drag-and-drop it onto your preferred browser.
	
	src/larks.js - The JavaScript file that contains the code for the Larks Ant algorithm.
	
	src/p5.js - The library file used for drawing.

Bugs

	There are currently no known bugs found with the algorithm.
