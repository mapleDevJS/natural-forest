// Our class to represent a raindrop
class Raindrop {
	constructor(startingX, startingY, endingY, fallSpeed, transparency, movementDirection, size) {
		this.xPosition = startingX;
		this.yPosition = startingY;
		this.yEndPosition = endingY;
		this.fallSpeed = fallSpeed;
		this.fallAcceleration = 0.1;
		this.transparency = transparency;
		this.movementDirection = movementDirection;
		this.size = size;
		this.color = `rgba(255, 255, 255, ${this.transparency})`;
		this.endOfRain = window.innerHeight + 100;
	}

	// Method to draw the raindrop
	draw(context) {
		context.beginPath();
		context.arc(this.xPosition, this.yPosition, this.size/2, 0, Math.PI * 2, true);
		context.fillStyle = this.color;
		context.fill();
	}

	// Method to update the position of the raindrop
	update(context) {
		this.fallSpeed += this.fallAcceleration;
		this.yPosition = this.yPosition >= this.endOfRain ? this.yEndPosition - 100 : this.yPosition + this.fallSpeed;
		this.draw(context);
	}
}

// Helper function to generate a random number between min and max
function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create an array of random raindrops
function createRaindrops() {
	const raindrops = [];
	for (let i = 0; i < 70; i++) {
		let xPosition = generateRandomNumber(1, window.innerWidth);
		let yPosition = Math.random() * -500;
		let yEndPosition = generateRandomNumber(2, 10);
		let fallSpeed = generateRandomNumber(30, 40) * (yEndPosition / 10);
		let transparency = Math.random() * .55;
		let movementDirection = Math.random() > 0.5 ? 1 : -1;
		let size = Math.random() * .1 + .05;
		raindrops.push(new Raindrop(xPosition, yPosition, yEndPosition, fallSpeed, transparency, movementDirection, size));
	}
	return raindrops;
}

// Setting up the canvas
const canvas = document.getElementsByClassName('rain')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

// Creating our raindrops
const raindrops = createRaindrops();

// Animation
let previousFrameTimestamp = 0;
const maxFramesPerSecond = 60;

function animateRaindrops(currentFrameTimestamp) {
	if (currentFrameTimestamp < previousFrameTimestamp + (1000 / maxFramesPerSecond)) {
		requestAnimationFrame(animateRaindrops);
		return;
	}
	previousFrameTimestamp = currentFrameTimestamp;

	//update each raindrop's position and redraw it on the canvas
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);
	for (const raindrop of raindrops) {
		raindrop.update(context);
	}

	// Request the next frame
	requestAnimationFrame(animateRaindrops);
}

// Start the animation
requestAnimationFrame(animateRaindrops);
