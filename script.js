// Questions
var questions = [
    {
        question: "What is a baby Hamster called?",
        choices: ["pup", "chick", "infant", "billy"],
        correctAnswer: 0
    },
    {
        question: "What is a baby Goose called?",
        choices: ["gooser", "gosling", "gup", "pup"],
        correctAnswer: 1
    },

    {
        question: "What is the adult of a kid called",
        choices: ["calf", "doe", "goat", "chick"],
        correctAnswer: 2
    },
    {
        question: "What is the baby of a Moth known as?",
        choices: ["baby", "infant", "kit", "larva"],
        correctAnswer: 3
    },
    {
        question: "What is a baby Hawk called?",
        choices: ["hawklett", "pup", "larva", "eyas"],
        correctAnswer: 3
    },
    {
        question: "What a baby Aligator called?",
        choices: ["baby", "gator", "hatchling", "calf"],
        correctAnswer: 2
    }
];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {
            var value = $('input[type="radio"]:checked').val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            }
            else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                currentQuestion++; // Since we have already displayed the first question on DOM ready

                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                }
                else {
                    displayScore();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        }
        else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    })

});


// This displays the current question AND the choices
function displayCurrentQuestion() {
    console.log("Current Question: ", currentQuestion);

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (var i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}