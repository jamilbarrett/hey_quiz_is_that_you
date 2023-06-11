var questionData = [
    {
        question: 'What does the acronym D.O.M. stand for?',
        choices: ['Dog Only Members', 'Document Object Model', 'Dancing On Mercury', 'Document On Memory'],
        answer: 'Document Object Model'
    },
    {
        question: 'What is the difference between let, var, and const in JavaScript?',
        choices: ['let and const are block-scoped, var is function-scoped', 'var and const are block-scoped, let is function-scoped', 'var and let are block-scoped, const is function-scoped', 'all of them are function-scoped'],
        answer: 'let and const are block-scoped, var is function-scoped'
    },
    {
        question: 'What is the output of 2+3+"7"?',
        choices: ['12', '57', '23', '237'],
        answer: '57'
    },
    {
        question: 'What is the purpose of the JavaScript function "setInterval()"?',
        choices: ['to execute a function repeatedly after a certain amount of time', 'to execute a function once after a certain amount of time', 'to execute a function when a certain event occurs', 'to execute a function when a certain condition is met'],
        answer: 'to execute a function repeatedly after a certain amount of time'
    },
    {
        question: 'What is a closure in JavaScript?',
        choices: ['a function that returns another function', 'a function that has access to variables in its outer function', 'a function that has access to variables in its inner function', 'a function that has no access to variables in outer or inner functions'],
        answer: 'a function that has access to variables in its outer function'
    },
    {
        question: 'What is hoisting in JavaScript?',
        choices: ['the behavior of moving variables and function declarations to the top of their respective scopes', 'the behavior of moving variables and function expressions to the top of their respective scopes', 'the behavior of copying variables and function declarations to the top of their respective scopes', 'the behavior of copying variables and function expressions to the top of their respective scopes'],
        answer: 'the behavior of moving variables and function declarations to the top of their respective scopes'
    },
    {
        question: 'What is the output of "10" == 10?',
        choices: ['true', 'false', 'undefined', 'null'],
        answer: 'true'
    },
    {
        question: 'What method in JavaScript can be used to add or remove elements from an array?',
        choices: ['push()', 'pop()', 'shift()', 'splice()'],
        answer: 'splice()'
    },
    {
        question: 'What is the purpose of the JavaScript function "JSON.parse()"?',
        choices: ['to parse a JSON string and convert it into a JavaScript object', 'to parse a JavaScript object and convert it into a JSON string', 'to validate if a JSON string is properly formatted', 'to convert a JSON string into a different data format'],
        answer: 'to parse a JSON string and convert it into a JavaScript object'
    },
    {
        question: 'What is the purpose of the "event.preventDefault()" method in JavaScript?',
        choices: ['to prevent the default behavior of an event', 'to trigger the default behavior of an event', 'to stop the propagation of an event', 'to restart the execution of an event'],
        answer: 'to prevent the default behavior of an event'
    }
];


// Create a variable to track the current question index

// Create a function that shows the current question object question property on the page
// You only need to show the question text for this activity, not the choices
// You'll use the question index variable to pull the object from the questions array
// You will need to generate the html, either through createElement or through
// a string

// Call your show question function. It should display the question to the page.


var questionOutputEl = document.querySelector('#question-output');
var currentQuestionIndex;
var secondsLeft;
var choiceli1El = document.querySelector("#choice1");
var choiceli2El = document.querySelector("#choice2");
var choiceli3El = document.querySelector("#choice3");
var choiceli4El = document.querySelector("#choice4");
var queEl = document.querySelector("#que");
var timerEl = document.querySelector('#timer');
var body = document.querySelector('body')
var startBtn = document.querySelector('#start-button')

function endQuiz() {
    if (secondsLeft <= 0 || currentQuestionIndex >= questionData.length)
    
    
    
    return body.innerText='Game Over'
    prompt('Enter Your Initials:')
    
    //display prompt to enter name and final score
}


// This function controls the timer of the quiz
function startTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft + ' seconds left';

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz()
        }
    }, 1000);
}


// This function creates the buttons and displays the questions for the quiz
function showQuestion() {
    // console.log("showing a question now")
    var questionObj = questionData[currentQuestionIndex];

    choiceli1El.innerHTML = '';
    choiceli2El.innerHTML = '';
    choiceli3El.innerHTML = '';
    choiceli4El.innerHTML = '';



    queEl.textContent = questionObj.question;
    btnChoice1El = document.createElement("button");
    btnChoice2El = document.createElement("button");
    btnChoice3El = document.createElement("button");
    btnChoice4El = document.createElement("button");


    btnChoice1El.textContent = questionData[currentQuestionIndex].choices[0];
    btnChoice2El.textContent = questionData[currentQuestionIndex].choices[1];
    btnChoice3El.textContent = questionData[currentQuestionIndex].choices[2];
    btnChoice4El.textContent = questionData[currentQuestionIndex].choices[3];

    choiceli1El.appendChild(btnChoice1El)
    choiceli2El.appendChild(btnChoice2El)
    choiceli3El.appendChild(btnChoice3El)
    choiceli4El.appendChild(btnChoice4El)

    btnChoice1El.addEventListener('click', checkAnswer)
    btnChoice2El.addEventListener('click', checkAnswer)
    btnChoice3El.addEventListener('click', checkAnswer)
    btnChoice4El.addEventListener('click', checkAnswer)



}
// this function substracts 5 seconds if the user enters in the wrog answer, it also allows the user to proceed regardless if the question is asnwered correctly or not
function checkAnswer(event) {
    var pressedAnswer = event.target.textContent


    var correctValue = questionData[currentQuestionIndex].answer;
    if (pressedAnswer !== correctValue) {
        secondsLeft -= 5

    }
    else (pressedAnswer == correctValue)

    var lastIndex = questionData.length - 1
    if (currentQuestionIndex === lastIndex) {
        endQuiz()
        return
    }
    currentQuestionIndex++
    showQuestion()
}


// this function starts the quiz and contains the other quizes in the order needed to run the game
function startQuiz() {
    // console.log("Starting the quiz")
    secondsLeft = 60
    currentQuestionIndex = 0
    //call the timer
    startTimer()
    // change our ui (hide elements or show others)
    //query select some elements and use the html node properties to show/hide them
    showQuestion()
    checkAnswer()
}


// create an element that's a button to start the quiz
//when clicked we want to startQuiz
// startQuiz()

startBtn.addEventListener('click', startQuiz)