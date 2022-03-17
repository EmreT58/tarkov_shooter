// ==========================================
//              === Variables === 
// ==========================================

// defineert main en body
var mainElement = document.querySelector('main');
var bodyElement = document.querySelector('body');

// Alle button variables
var gameDiff = document.querySelector('.difficulty'); // buttons container
var easyButton = document.querySelector('#easy'); // 1.5s gamemode
var mediumButton = document.querySelector('#medium'); // 1s gamemode
var hardButton = document.querySelector('#hard'); // 0.5s gamemode
var rushButton = document.querySelector('#rush'); // steeds sneller (1.5s) gamemode


// img generator
var img = document.createElement('img');
img.setAttribute("style", "position:relative;");
img.setAttribute("src", "images/pmc-crop.png");
mainElement.appendChild(img); 

var clicksCount = 0; // score oftewel kills

var healthPoints = 3; // 3 hartjes

var timer; // timer functie om de tijd te bepalen met difficultyLevel

var shotHit =  new Audio('audio/peww.mp3'); // audio voor raak schieten
var shotMiss = new Audio('audio/buzz-short.mp3'); // audio voor mis schieten

var difficultyLevel; // bepaalt de aantal miliseconden om te reageren

var rushStatus = false; // zorgt ervoor dat de rush game werkt. (Steeds sneller)

// ==========================================
//              === Functions === 
// ==========================================

// Berekent de mogelijke random positions
function getRandomPosition() {
	var x = mainElement.offsetHeight - img.clientHeight;
	var y = mainElement.offsetWidth - img.clientWidth;
	var randomX = Math.floor(Math.random()*x);
	var randomY = Math.floor(Math.random()*y);
	return [randomX,randomY];
}

// Plaatst de random positions voor de target
function randomPosition() {
	var xy = getRandomPosition(img);
	img.style.top = xy[0] + 'px';
	img.style.left = xy[1] + 'px';
	clearTimeout(timer);
	timer = setTimeout( () => {
		healthDamage();
		shotMiss.play();
		randomPosition()
	}, difficultyLevel);
	if (rushStatus == true) {
		difficultyLevel = difficultyLevel - 50;
	}
	console.log(difficultyLevel);
}
// Telt de score/kills op
function clickImage () {
    clicksCount += 1;
    document.getElementById('clicksCount').innerHTML = clicksCount;
};
// Linked de healthpoints var met de hartjes en zorgt voor een game over
function healthDamage () {
	if (healthPoints == 1) {
		healthPoints -= 1;
		document.getElementById('heart1').style.display = "none";
	}
	if (healthPoints == 2) {
		healthPoints -= 1;
		document.getElementById('heart2').style.display = "none";
	}
	if (healthPoints == 3) {
		healthPoints -= 1;
		document.getElementById('heart3').style.display = "none";
	}
	if (healthPoints == 0) {
		setTimeout(function(){
			alert("Game Over! Your got " + clicksCount + " kills! Press OK to try again!"); 
			window.location.reload();
	   }, 200); //wacht 0.2 seconds
	}
}

//Deze functie is verplaatst naar in de gamemodes om error te voorkomen

// Detecteerd de mousedown op de img target en de misklik op de main
// mainElement.addEventListener('mousedown', e => {
// 	if(e.target !== e.currentTarget) { //als de IMG in main wordt geklikt
// 		clickImage();
// 		shotHit.play();
// 		randomPosition();
// 	}
// 	if (e.target === e.currentTarget) { //als de main zelf wordt geklikt
// 		healthDamage();
// 		shotMiss.play();
// 		randomPosition();
// 	}
// });


// 1.5s reactie tijd gamemode
function easyGame() {
	setTimeout(function(){
		difficultyLevel = 1500;
		randomPosition();
		img.style.display = "initial";
		mainElement.addEventListener('mousedown', e => {
			if(e.target !== e.currentTarget) { //als de IMG in main wordt geklikt
				clickImage();
				shotHit.play();
				randomPosition();
			}
			if (e.target === e.currentTarget) { //als de main zelf wordt geklikt
				healthDamage();
				shotMiss.play();
				randomPosition();
			}
		});
   }, 1000); //wacht 1 second
	gameDiff.style.display = "none";
}
// 1s reactie tijd gamemode
function mediumGame() {
	setTimeout(function(){
		difficultyLevel = 1000;
		randomPosition();
		img.style.display = "initial";
		mainElement.addEventListener('mousedown', e => {
			if(e.target !== e.currentTarget) { //als de IMG in main wordt geklikt
				clickImage();
				shotHit.play();
				randomPosition();
			}
			if (e.target === e.currentTarget) { //als de main zelf wordt geklikt
				healthDamage();
				shotMiss.play();
				randomPosition();
			}
		});
   }, 1000); //wacht 1 second
	gameDiff.style.display = "none";
}
// 0.5s reactie tijd gamemode
function hardGame() {
	setTimeout(function(){
		difficultyLevel = 500;
		randomPosition();
		img.style.display = "initial";
		mainElement.addEventListener('mousedown', e => {
			if(e.target !== e.currentTarget) { //als de IMG in main wordt geklikt
				clickImage();
				shotHit.play();
				randomPosition();
			}
			if (e.target === e.currentTarget) { //als de main zelf wordt geklikt
				healthDamage();
				shotMiss.play();
				randomPosition();
			}
		});
   }, 1000); //wacht 1 second
	gameDiff.style.display = "none";
}
// Steeds sneller gamemode (inital 1500s)
function rushGame() {
	setTimeout(function(){
		rushStatus = true;
		difficultyLevel = 1500;
		randomPosition();
		difficultyLevel = difficultyLevel -50
		img.style.display = "initial";
		mainElement.addEventListener('mousedown', e => {
			if(e.target !== e.currentTarget) { //als de IMG in main wordt geklikt
				clickImage();
				shotHit.play();
				randomPosition();
			}
			if (e.target === e.currentTarget) { //als de main zelf wordt geklikt
				healthDamage();
				shotMiss.play();
				randomPosition();
			}
		});
   }, 1000); //wacht 1 second
	gameDiff.style.display = "none";
}
// gamemode keuze detectors
easyButton.addEventListener('click', easyGame);
mediumButton.addEventListener('click', mediumGame);
hardButton.addEventListener('click', hardGame);
rushButton.addEventListener('click', rushGame);
