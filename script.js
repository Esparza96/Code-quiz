var highScores = [];
$('.start').on('click', function () {
    $('.start').remove();
    quiz.loadQuestion();
});
$(document).on("click", ".answer-button", function (e) {
    quiz.clicked(e);
});

$(document).on("click", "#reset", function () {
    quiz.reset();
});

$(document).on("click", "#submit-btn", function () {
    quiz.addInitials();
    //quiz.displayInitials();
});
// Variable for questions, an array of objects

var questions = [
    {
        question: "How many states does the USA have:",
        answers: ["10", "30", "50", "1"],
        correctAnswer: "50"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correctAnswer: "parentheses"
    },
    {
        question: "Who stole xmas?",
        answers: [
            "Donald Trump",
            "Covid-19",
            "Grinch",
            "all of the above"
        ],
        correctAnswer: "Grinch"
    },
    {
        question:
            "3+3",
        answers: ["5", "6", "1", "9"],
        correctAnswer: "6"
    },
    {
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    }
];

var quiz = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

    countdown: function () {
        quiz.counter--;
        $(".counter").html(quiz.counter);
        if (quiz.counter <= 0) quiz.timeUp();
    },
    loadQuestion: function () {
        timer = setInterval(quiz.countdown, 1000);
        $("#subwrapper").html(
            "<h2> Time to Guess: <span class ='counter'>" + quiz.counter + "</span> Seconds</h2>"
        );
        $("#subwrapper").append(
            "<h2>" + questions[quiz.currentQuestion].question + "</h2>"
        );
        for (var i = 0; i < questions[quiz.currentQuestion].answers.length; i++) {
            $("#subwrapper").append(
                '<button class="answer-button btn btn-danger" id="button- ' +
                i +
                '" data-name="' +
                questions[quiz.currentQuestion].answers[i] +
                '">' +
                questions[quiz.currentQuestion].answers[i] +
                "</button> </br>"
            );
        }
    },
    nextQuestion: function () {

        $("#counter").html(quiz.counter);
        quiz.currentQuestion++;
        quiz.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        quiz.counter = 0;
        quiz.unanswered++;
        $("#subwrapper").html("<h2>Out of time!<h2>");
        $("#subwrapper").append(
            "<h3>The correct answer was: " +
            questions[quiz.currentQuestion].correctAnswer +
            "</h3>"
        );
        if (quiz.currentQuestion == questions.length - 1) {
            setTimeout(quiz.results, 3 * 1000);
        } else {
            setTimeout(quiz.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $('#game-over').removeClass("d-none");
        $('#d-initials').removeClass("d-none");
        $("#subwrapper").html("<h2>Complete!</h2>");
        $("#subwrapper").append(" Correct: " + quiz.correct + "<br/>");
        $("#subwrapper").append(" Incorrect: " + quiz.incorrect + "<br/>");
        $("#subwrapper").append(" Unanswered: " + quiz.unanswered + "<br/>");
        $("#subwrapper").append("<button id= reset>Try again?</button>");
    },

    addInitials: function () {
        var initials = $("#initials").val();
        var existingInitials = JSON.parse(localStorage.getItem('initials')) || [];
        existingInitials.push(initials);
        localStorage.setItem('initials', JSON.stringify(existingInitials));
        for (var i = 0; i < existingInitials.length; i++) {
            $("#d-initials").append("<div>" + existingInitials[i] + "</div>");
        }
        console.log(existingInitials);
        //$("#game-over").addClass("d-none");
        //$("#d-initials").addClass("d-none");
    },

    /*displayInitials: function(){
      var existingInitials = localStorage.getItem('initials');
      for(var i = 0; i <= existingInitials.length; i++){
        $("#d-initials").append("<p>"+ existingInitials[i]+"</p>");
     }
     $("#d-initials").addClass("d-none");
    },*/

    clicked: function (e) {
        clearInterval(timer);
        if (
            $(e.target).data("name") == questions[quiz.currentQuestion].correctAnswer
        ) {
            quiz.answeredCorrectly();
        } else {
            quiz.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        console.log("right!");

        quiz.correct++;
        $("#subwrapper").html("<h2> CORRECT!</h2>");
        if (quiz.currentQuestion == questions.length - 1) {
            setTimeout(quiz.results, 2 * 1000);
        } else {
            setTimeout(quiz.nextQuestion, 2 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("wrong");
        if (this) {
            quiz.counter -= 5;
        }
        quiz.incorrect++;
        $("#subwrapper").html("<h2> Wrong!</h2>");
        $("#subwrapper").append(
            "<h3>The correct answer was: " +
            questions[quiz.currentQuestion].correctAnswer +
            "</h3>"
        );
        if (quiz.currentQuestion == questions.length - 1) {
            setTimeout(quiz.results, 2 * 1000);
        } else {
            setTimeout(quiz.nextQuestion, 2 * 1000);
        }
    },
    reset: function () {
        quiz.currentQuestion = 0;
        quiz.counter = 30;
        quiz.correct = 0;
        quiz.incorrect = 0;
        quiz.unanswered = 0;
        quiz.loadQuestion();
        $("#game-over").addClass("d-none");
        $("#d-initials").addClass("d-none");
    },
};









