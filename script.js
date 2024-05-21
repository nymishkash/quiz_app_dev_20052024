const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('end.html')) {
        const finalScore = localStorage.getItem('score');
        document.getElementById('final-score').innerText = `Your score: ${finalScore}`;
    } else {
        showQuestion();
        updateHUD();
    }
});

function updateProgress() {
    const progress = document.getElementById('progress');
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progress.style.width = `${progressPercentage}%`;
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');

    resetState();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    
    const choices = [currentQuestion.choice1, currentQuestion.choice2, currentQuestion.choice3, currentQuestion.choice4];
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('btn');
        if (index + 1 === currentQuestion.answer) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    const answerButtonsElement = document.getElementById('answer-buttons');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function updateHUD() {
    document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById('score').innerText = `Score: ${score}`;
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.classList.add('correct');
        score += 10;
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Disable all buttons after an answer is selected
    const answerButtons = document.querySelectorAll('.btn');
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    updateHUD();
    updateProgress();

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            resetState();
            showQuestion();
        } else {
            localStorage.setItem('score', score);
            window.location.href = 'end.html';
        }
    }, 1000);
}


