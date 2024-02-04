let moveX, moveY;

function eventListener(e) {
	moveX = (e.clientX - window.innerWidth / 2) * -.005;
	moveY = (e.clientY - window.innerHeight / 2) * .01;

	document.documentElement.style.setProperty('--move-x', `${moveX}deg`);
	document.documentElement.style.setProperty('--move-y', `${moveY}deg`);
}
const throttledEventListener = throttle(eventListener, 10);

document.addEventListener('mousemove', throttledEventListener);

// Throttle function
function throttle(func, limit) {
	let inThrottle;
	return function() {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, limit);
		}
	}
}
