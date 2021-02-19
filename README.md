CPSC 335-02 Project 1 - Larks Ant

Members: Zach Hofmeister, Youssef Chahine, Jonathan Hana

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
	
	This was programmed in HTML and JavaScript, and the library used is P5.js for drawing on the canvas.
	If you'd like to know more about these technologies, visit the following links:
		HTML: https://en.wikipedia.org/wiki/HTML
		JavaScript: https://en.wikipedia.org/wiki/JavaScript
		P5.js https://p5js.org/

Zip Contents

	readme.txt - This file.
	
	src/larks.html - Run this file by either double clicking on it, or drag-and-drop it onto your preferred browser.
	
	src/larks.js - The JavaScript file that contains the code for the Larks Ant algorithm.
	
	src/p5.js - The library file used for drawing.
	
	demos - A folder that contains demos for TP's Ant and Langton's Ant, used for learning purposes as well as a base for writing the Larks algorithm.
		This folder is not necessary for Larks to run. You can delete this if you'd like.
	
	js-p5-example - The example project that was given to us by the professor in order to use as a starter.
		Used as a structure in order to remove the tediousness of having to re-write code not relevant to the algorithm.
		This file is not necessary for Larks to run. You can delete this if you'd like.

	335-p1-cella-larks-ant.pdf - Instructions provided to us by the professor on what Larks Ant is and how to implement it.
		This file is not necessary for Larks to run. You can delete this if you'd like.
	
	first-30-moves-example.txt - Sample debug log from the professor to compare with our implementation of Larks Ant to determine if we've done it correctly or not.
		This file is not necessary for Larks to run. You can delete this if you'd like.

Bugs

	There are currently no known bugs found with the algorithm.
