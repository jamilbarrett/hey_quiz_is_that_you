let questionOutputEl = document.querySelector('#question-output');
let currentQuestionIndex = 0;
let secondsLeft;
let timerEl = document.querySelector('#timer');
let body = document.querySelector('body');
let startBtn = document.querySelector('#start-btn');

function endQuiz() {
    if (currentQuestionIndex >= questionData.length) {
        questionOutputEl.innerHTML = '';

        const gameOverMessage = document.createElement('p');
        gameOverMessage.textContent = 'Game Over';
        gameOverMessage.classList.add('game-over-message');

        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'Restart Quiz';
        restartBtn.classList.add('restart-btn');
        restartBtn.addEventListener('click', startQuiz);

        questionOutputEl.appendChild(gameOverMessage);
        questionOutputEl.appendChild(restartBtn);

        const gamerTag = prompt('Enter Your Gamer Tag:');
        const score = calculateScore();
        saveScoreToLocalStorage(gamerTag, score);
    }
}

    function calculateScore() {
        let correctAnswers = 0;
        const totalQuestions = questionData.length;
    
        for (let i = 0; i < totalQuestions; i++) {
            const selectedAnswer = questionData[i].selectedAnswer;
            const correctAnswer = questionData[i].answer;
            if (selectedAnswer === correctAnswer) {
                correctAnswers++;
            }
        }
    
      
        return correctAnswers;
    }
    
// Save scores to local storage
function saveScoreToLocalStorage(gamerTag, score) {
 
    const savedScores = JSON.parse(localStorage.getItem('quizScores')) || [];

    // Create a new score object
    const newScore = {
        gamerTag,
        score
    };

    // Add the new score to the existing scores
    savedScores.push(newScore);

    // Save the updated scores back to local storage
    localStorage.setItem('quizScores', JSON.stringify(savedScores));
}

    
// Start Timer
function startTimer() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = secondsLeft + ' seconds left';

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            timerEl.textContent = 'Times Up!';
            endQuiz(); 
        }
    }, 1000);
}
// Display questions
function showQuestion() {
    const questionObj = questionData[currentQuestionIndex];

    const questionEl = document.createElement('p');
    questionEl.textContent = questionObj.question;

    const choicesContainer = document.createElement('ul');
    choicesContainer.classList.add('choices');

    questionOutputEl.innerHTML = '';
    questionOutputEl.appendChild(questionEl);
    questionOutputEl.appendChild(choicesContainer);

    questionObj.choices.forEach((choice) => {
        const choiceLi = document.createElement('li');
        const choiceBtn = document.createElement('button');
        choiceBtn.textContent = choice;
        choiceLi.appendChild(choiceBtn);
        choicesContainer.appendChild(choiceLi);
        choiceBtn.addEventListener('click', checkAnswer);
    });
}

// Check answers 
function checkAnswer(event) {
    const pressedAnswer = event.target.textContent;
    const correctValue = questionData[currentQuestionIndex].answer;
  
    questionData[currentQuestionIndex].selectedAnswer = pressedAnswer; // Update selectedAnswer
  
    secondsLeft -= pressedAnswer !== correctValue ? 5 : 0;
    currentQuestionIndex += pressedAnswer === correctValue ? 1 : 0;
  
    if (currentQuestionIndex === questionData.length) {
      endQuiz();
      return;
    }
    showQuestion();
  }
  

// Start the Quiz
  function startQuiz() {
    secondsLeft = 60;
    currentQuestionIndex = 0;

    timerEl.textContent = secondsLeft + ' seconds left';

    startTimer();
    showQuestion();
}


startBtn.addEventListener('click', startQuiz);
