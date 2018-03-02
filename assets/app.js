var questionsIndex = 0;
var timeLeft = 0;
var selectedAnswer = -1;
var countdownTimer;
var rightAnswers = 0;  
var wrongAnswers = 0;
var unanswered = 0;
var questions = [
    {
        "question": "What game do the characters play in almost every season?",
        "choices": ["Dungeons and Dragons", "Win, Lose, or Draw", "True American", "American Idol"],
        "answer": 2,
        "image": "assets/images/Q1.jpg"
    },
    {
        "question": "Who is Jess’s best friend?",
        "choices": ["Nick", "Nadia", "Cece", "Coach"],
        "answer": 2,
        "image": "assets/images/Q2.jpg"
    },
    {
        "question": "What is Jess’s profession?",
        "choices": ["teacher", "lawyer", "florist", "musician"],
        "answer": 0,
        "image": "assets/images/Q3.jpg"
    },
    {
        "question": "Where is Jess from?",
        "choices": ["Cleveland, Ohio", "Los Angeles, California", "Chicago, Illinois", "Portland, Oregon"],
        "answer": 3,
        "image": "assets/images/Q4.jpg"
    },
    {
        "question": "What theme did Nick’s father want for his funeral?",
        "choices": ["Elvis", "Baseball", "Prince", "Space"],
        "answer": 0,
        "image": "assets/images/Q5.jpg"
    },
    {
        "question": "What movie did Jess watch repeatedly after breaking up with her boyfriend?",
        "choices": ["While You Were Sleeping", "Dirty Dancing", "You've Got Mail", "Speed"],
        "answer": 1,
        "image": "assets/images/Q6.jpg"
    },
    {
        "question": "What is the name of Nick’s bar?",
        "choices": ["The Griffin", "Hufflepuff", "Bar", "Riverwood"],
        "answer": 0,
        "image": "assets/images/Q7.jpg"
    },
    {
        "question": "What is Schmidt’s first name?",
        "choices": ["Schmidt", "Nick", "Andrew", "Winston"],
        "answer": 3,
        "image": "assets/images/Q8.jpg"
    },
    {
        "question": "Schmidt pretends to be the son of what famous politician?",
        "choices": ["George Bush", "Mitt Romney", "Jon McCain", "Bill Clinton"],
        "answer": 1,
        "image": "assets/images/Q9.jpg"
    },
    {
        "question": "What is the name of Winston’s cat?",
        "choices": ["Ferguson", "Fergie", "Ferdinand", "Frank"],
        "answer": 0,
        "image": "assets/images/Q10.jpg"
    },
];

//timer for 30 seconds to answer each question

function updateTimer() {
    timeLeft--;
    if (timeLeft === 0) {
        unanswered ++;
        var q = questions[questionsIndex];
        $("#result").text("Time's Up! The correct answer is " + q.choices[q.answer]);
        $("#image").attr("src", q.image);
        $("#resultContainer").show();
        $("#answers").hide();
        //STOP THE TIMER!!
        clearInterval(countdownTimer);
        //start 5 second timer 
        //hide result
        //show next question and answer choices 
        setTimeout(function () {
            showQuestion();
        }, 5000);
    }
    $("#countdown").text(timeLeft + " seconds");

}
//loads when the initial page loads
function startQuiz() {
    questionsIndex = -1;
    rightAnswers = 0;
    wrongAnswers = 0;
    unanswered = 0;
    showQuestion();
}

//shows the start page
function showStartPage() {
    $("#startPage").show();
    $("#mainPage").hide();
    $("#endPage").hide();
}
function showEndPage() {
    $("#correct").text("Correct Answers= " + rightAnswers);
    $("#incorrect").text("Incorrect Answers= " + wrongAnswers);
    $("#unanswered").text("Unanswered= " + unanswered);
    $("#startPage").hide();
    $("#mainPage").hide();
    $("#endPage").show();
}
//shows question and possible answer choices
function showQuestion() {
    questionsIndex++;
    if (questionsIndex >= questions.length) {
       showEndPage();
        return;
    }
    $("#startPage").hide();
    $("#mainPage").show();
    $("#endPage").hide();
    $("#question").text(questions[questionsIndex].question);
    $("#answerChoice1").text(questions[questionsIndex].choices[0]);
    $("#answerChoice2").text(questions[questionsIndex].choices[1]);
    $("#answerChoice3").text(questions[questionsIndex].choices[2]);
    $("#answerChoice4").text(questions[questionsIndex].choices[3]);
    $("#resultContainer").hide();
    $("#image").attr("src", "");
    $("#answers").show();
    timeLeft = 30; 
    $("#countdown").text(timeLeft + " seconds");
    countdownTimer = setInterval (updateTimer, 1000);
}
//identifies if the answer selected is the correct or incorrect answer
function selectAnswer() {
    //STOP THE TIMER!!
    clearInterval(countdownTimer);
    console.log(this.id);
    switch (this.id) {
        case "answerChoice1":
            selectAnswer = 0;
            break;
        case "answerChoice2":
            selectAnswer = 1;
            break;
        case "answerChoice3":
            selectAnswer = 2;
            break;
        case "answerChoice4":
            selectAnswer = 3;
            break;
    }
    var q = questions[questionsIndex];

    if (selectAnswer === q.answer) {
        $("#result").text(q.choices[q.answer] + " is correct!");
        rightAnswers ++;
    }
    else {
        $("#result").text("Wrong! The correct answer is " + q.choices[q.answer] + ".");
        wrongAnswers ++;

    }
    $("#image").attr("src", q.image);
    $("#resultContainer").show();
    $("#answers").hide();
    //start 5 second timer 
    //hide result
    //show next question and answer choices 
    setTimeout(function () {
        showQuestion();
    }, 5000);


}

$(document).ready(function () {
    $(".answerChoice").on("click", selectAnswer);
    $("#start").on("click", startQuiz);
    $("#startOver").on("click", startQuiz);
    showStartPage();
})