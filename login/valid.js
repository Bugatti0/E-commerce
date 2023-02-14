//Validtion Code For Inputs

var email = document.forms["form"]["email"];
var password = document.forms["form"]["password"];

var email_error = document.getElementById("email_error");
var pass_error = document.getElementById("pass_error");

email.addEventListener("textInput", email_Verify);
password.addEventListener("textInput", pass_Verify);

function validated() {
	if (email.value.length < 9) {
		email.style.border = "1px solid red";
		email_error.style.display = "block";
		email.focus();
		return false;
	}
	if (password.value.length < 6) {
		password.style.border = "1px solid red";
		pass_error.style.display = "block";
		password.focus();
		return false;
	}
}
function email_Verify() {
	if (email.value.length >= 8) {
		email.style.border = "1px solid silver";
		email_error.style.display = "none";
		return true;
	}
}
function pass_Verify() {
	if (password.value.length >= 5) {
		password.style.border = "1px solid silver";
		pass_error.style.display = "none";
		return true;
	}
}

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

window.addEventListener("resize", function (e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

let hueCol = 0;

const mouse = {
	x: undefined,
	y: undefined,
};

canvas.addEventListener("click", function (e) {
	mouse.x = e.x;
	mouse.y = e.y;
	for (let i = 0; i < 5; i++) {
		particles.push(new Particle());
	}
});

canvas.addEventListener("mousemove", function (e) {
	mouse.x = e.x;
	mouse.y = e.y;
	for (let i = 0; i < 5; i++) {
		particles.push(new Particle());
	}
});

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.speedX = Math.random() * 5 - 1.5;
		this.speedY = Math.random() * 5 - 1.5;
		this.color = "hsl(" + hueCol + ", 100%, 50%)";
		this.size = Math.random() * 5 + 1;
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		this.size -= 0.1;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
		ctx.fill();
	}
}

function handleParticles() {
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].draw();
		for (var j = i + 1; j < particles.length; j++) {
			const dx = particles[j].x - particles[i].x;
			const dy = particles[j].y - particles[i].y;
			const distance = dx * dx + dy * dy;
			if (distance < 10000) {
				ctx.beginPath();
				ctx.strokeStyle = particles[i].color;
				ctx.lineWidth = 0.3;
				ctx.moveTo(particles[i].x, particles[i].y);
				ctx.lineTo(particles[j].x, particles[j].y);
				ctx.stroke();
			}
		}
		if (particles.size < 0.3) {
			particles.splice(i, 1);
			i--;
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	hueCol += 2;
	requestAnimationFrame(animate);
}

animate();
