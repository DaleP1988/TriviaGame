var triviaQuestions = [{
	question: "In what year was New York City Ballet founded?",
	answerList: ["1956", "1948", "1910", "1800"],
	answer: 1
}, {
	question: "Who was the founding Director of the New York City Ballet?",
	answerList: ["George Balanchine", "Agnes de Mille", "William Forsythe", "Lincoln Kirstein"],
	answer: 0
}, {
	question: "The name of America's National Ballet Company is:",
	answerList: ["American Ballet Theatre", "American Ballet Company", "Classical Ballet of America", "American National Ballet"],
	answer: 0
}, {
	question: "Who is the current director of American Ballet Theatre?",
	answerList: ["Peter Martins", "Ben Stevenson", "Kevin McKenzie", "Gelsey Kirkland"],
	answer: 2
}, {
	question: "The New York City Ballet dances most of the performance season at:",
	answerList: ["Joyce Theatre", "Metropolitan Opera House", "Alicy Tully Hall", "New York State Theatre"],
	answer: 3
}, {
	question: "What footwear do female ballet dancers wear most of the time?",
	answerList: ["pointe shoes", "sneakers", "thongs", "ballet flats"],
	answer: 0
}, {
	question: "This Ballet Competition takes place every four years:",
	answerList: ["American Ballet Grand Prix ", "U.S. International Ballet Competition", "American Ballet Competition", "U.S. Ballet Tournament"],
	answer: 1
}, {
	question: "In general, when do ballet company performance seasons begin and end?",
	answerList: ["Year Around", "Fall-Winter", "Fall-Spring", "Winter-Fall"],
	answer: 2
}, {
	question: "Which choreographer expanded on the concept of Neo-Classical Ballet through the development of Movement Technologies?",
	answerList: ["Merce Cunningham", "William Forsythe", "Martha Graham", "George Balanchine"],
	answer: 1
}, {
	question: "What is the name of the most prestigious ballet company on the west coast of the United States?",
	answerList: ["Los Angeles Ballet", "Washington Ballet", "Houston Ballet", "San Fransisco Ballet"],
	answer: 3
}, {
	question: "What is the name of the U.K.'s oldest dance company (founded as a Ballet Company in 1926)?",
	answerList: ["Royal Ballet", "Birmingham Royal Ballet", "English National Ballet", "Rambert Ballet"],
	answer: 0
}, {
	question: "Ballet Performances originated in the Courts of this Royal Family:",
	answerList: ["The Tudors", "The de Medicis", "The Spencers", "The Grands"],
	answer: 1
}, {
	question: "In Act II of this ballet, the Willies (led by Myrtha) dance Albrecht to death:",
	answerList: ["Coppelia", "Don Quixote", "Swan Lake", "Giselle"],
	answer: 3
}, {
	question: "This ballet was created on the School of American Ballet by George Balanchine:",
	answerList: ["Serenade", "Symphony in C", "Tarantella", "Mozartiana"],
	answer: 0
}, {
	question: "This holiday was recently coined to acknowledge and appreciate the hard work of ballet dancers:",
	answerList: ["Balletpalooza", "Ballet Festival", "World Ballet Day", "National Ballet Day"],
	answer: 2

}];

var questionTimer;
var imgArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13', 'question14', 'question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}


$(document).ready(function () {
	console.log("ready!");

});

$("#start-button").on('click', function () {
	$(this).hide();
	newGame();
});

$("#arrowNextQuestion").on('click', function () {
	clearTimeout(questionTimer);
	newQuestion();

});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame() {
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	$('#startOverBtn').hide();
	//hide new game button. empty all that had content

	//reset the intervals and the IDs; make sure the start button happens later.
	
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion() {
	$('#answerList').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#img').empty();
	$('#arrowNextQuestion').hide();
	answered = true;

	//sets up new questions & answerList
	$('#currentQuestion').html('Question #' + (currentQuestion + 1) + ' of ' + (triviaQuestions.length));
	$('#question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for (var i = 0; i < 4; i++) {
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({ 'data-index': i });
		choices.addClass('thisChoice');
		$('#answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click', function () {
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown() {
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('#question').empty();
	$('#arrowNextQuestion').show();


	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#img').html('<img src = "assets/images/' + imgArray[currentQuestion] + '.jpg" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if ((userSelect == rightAnswerIndex) && (answered == true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((userSelect != rightAnswerIndex) && (answered == true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}

	if (currentQuestion === (triviaQuestions.length-1)) {
		setTimeout(scoreboard);
		clearTimeout(questionTimer);   //lines 184 - 188 new.
		$('#finalMessage').empty();
		$('#correctAnswers').empty();
		$('#incorrectAnswers').empty();
		$('#unanswered').empty();

	} else {
		currentQuestion++;
		questionTimer = setTimeout(newQuestion, 5000);  // additions below. this was original code.
		
	}

	//if (currentQuestion > (triviaQuestions.length - 1)) {
	//	endGame();
//	} else {
//		currentQuestion++;
//		questionTimer = setTimeout(newQuestion, 5000);  // additions below. this was original code.
	}

// function endGame(){								//new from this line to 207, also if endGame()
// 	$('#timeLeft').empty();
// 	$('#message').empty();
// 	$('#correctedAnswer').empty();
// 	$('#img').empty();
// 	$('#finalMessage').html("THE END");
// 	$('#correctAnswers').empty();
// 	$('#incorrectAnswers').empty();
// 	$('#unanswered').empty();
//}
function scoreboard() {
		$('#timeLeft').empty();
		$('#message').empty();
	//	$('#correctedAnswer').empty();
	//	$('#img').empty();
		$('#currentQuestion').empty();
		$('.thisChoice').empty(); //Clears question page
		$('#question').empty();
		$('#finalMessage').html(messages.finished);
		$('#correctAnswers').html("Correct Answers: " + correctAnswer);
		$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
		$('#unanswered').html("Unanswered: " + unanswered);
		$('#arrowNextQuestion').hide();
		//$('#startOverBtn').html('Start Over?');
	
}
	// $('#startOverBtn').click(newGame);
	// $('#startOverBtn').click(function() {console.log('clicked')});
			
	//use show from jquery
//}


$('#startOverBtn').click(newGame);