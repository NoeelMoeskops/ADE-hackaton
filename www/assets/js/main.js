$('html').addClass('has-js');

// elements
var introTitle = $('.screen-intro__title');
var introQuote = $('.screen-intro__quote');
var introButtonContainer = $('.button-container');
var introButton = $('.button-start');
var btnShowSong = $('.js--show-song');
var btnShowMoods = $('.js--show-moods');

// settings
TweenLite.defaultEase = Linear.easeNone;

var arrScreens = $('.screen');
var currentScreen = 0;

// skipsscreen is not needed in current implementation
function nextScreen(skipScreen) {
	var current = arrScreens.eq(currentScreen);
	var next = arrScreens.eq(currentScreen+1);
	animateScreenOut(current);

	// if skipScreen, go to next+1
	skipScreen ? animateScreenIn(next+1) : animateScreenIn(next)
	
	// update the values
	skipScreen ? currentScreen += 2 : currentScreen++
		
}

// animations
var splitIntroTitle = new SplitText(introTitle, { type: 'chars, lines', linesClass: 'overflow' });
var splitIntroQuote = new SplitText(introQuote, { type: 'chars, lines', linesClass: 'overflow' });

function animateCharsIn(target, type) {
	var tl = new TimelineLite();
	return tl.staggerTo(target[type], 0.5, { yPercent: 100, ease: 'Circ.easeOut' }, 0.1);
}
	
function animateCharsOut(target, type) {
	var tl = new TimelineLite();
	return tl.staggerTo(target[type], 0.35, { yPercent: 0, ease: 'Circ.easeOut' }, 0.1);
}

function animateScreenIn(target) {
	target.addClass('animate--in');
}

function animateScreenOut(target) {
	target.removeClass('animate--in');
	target.addClass('animate--out');

	target.bind( 'transitionend', function() { 
		target.removeClass('animate--out');
	});
}

var tlIntroIn = new TimelineLite({ paused: true });
tlIntroIn
	.call(animateCharsIn, [splitIntroTitle, 'chars'], this, 0)
	.call(animateCharsIn, [splitIntroQuote, 'chars'], this, 1.2)
	;

var tlIntroOut = new TimelineLite({ paused: true });
tlIntroOut
	.call(animateCharsOut, [splitIntroTitle, 'chars'], this, 0)
	.call(animateCharsOut, [splitIntroQuote, 'chars'], this, 0)
	.to(introButtonContainer, .3, { yPercent: 100, ease: 'Circ.easeOut' }, .8)
	.call(nextScreen, [], this, 1.2)
	;



function init() {
	tlIntroIn.play();

	introButton.on('click', function() {
		tlIntroOut.play();
	});

	btnShowSong.on('click', function() {
		nextScreen();
	});

	btnShowMoods.on('click', function() {
		nextScreen(true);
	});
}



// init
document.addEventListener('DOMContentLoaded', init);
$(document).on('keydown', function(e) {
	if (e.keyCode === 39) nextScreen();		
});




/*
tlMenuOut
	.add('start', '+=.2')
	.staggerFromTo(socialItems, .1, 
		{ scale: 1 }, 
		{ scale: 0.001 }, 
		.04, 'start')
	.call(animateCharsOut, [splitNavMain, 'words'], this, 'start')
	.to($navClose, .2, {opacity: 0}, 'start')
	.staggerFromTo($navProjects, .2, 
		{ x: 0, opacity: 1 }, 
		{ x: -100, opacity: 0 }, 
		.12, 'start+=.4')
	// .to($navOverlay, .2, {x: 0})
    .to($navContainer, .2, {x: '100%'})
	;

	tlMenuIn
		// play with easings
		.fromTo($navOverlay, .2, {x: 0}, {xPercent: -100})
		// .fromTo($navOverlay, .2, {scaleY: 1}, {scaleY: 500})
		.to($navContainer, .25, {xPercent: -10 })
		.to($navContainer, .15, {xPercent: -100 })
		.staggerFromTo($navProjects, .2, 
			{ x: -100, opacity: 0 },
			{ x: 0, opacity: 1 },
			-.12)
		.call(animateCharsIn, [splitNavMain, 'words'], this, 1.2)
		.fromTo($navClose, .2, {opacity: 0}, {opacity: 1}, 1.2)
		.staggerFromTo(socialItems, .1, 
			{ scale: 0.001 }, 
			{ scale: 1 }, 
			-.05, 1.2)
		;

// events
$('.js--open-nav').on('click',  function(e) { 
	tlMenuIn.progress() === 1 ? tlMenuIn.restart() : tlMenuIn.play();
});
$('.js--close-nav').on('click', function(e) { 
	tlMenuOut.progress() === 1 ? tlMenuOut.restart() : tlMenuOut.play();
});

*/