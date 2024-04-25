const questions = [
  {
    question: "Which is the highest peak in the world?",
    answers: [
      { text: "Mt. Kanchanjunga", correct: false },
      { text: "Mt. Dhaulagiri", correct: false },
      { text: "Mt. Everest", correct: true },
      { text: "Mt. Manaslu", correct: false },
    ],
  },
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Shark", correct: false },
      { text: "Giraffee", correct: false },
      { text: "Blue Whale", correct: true },
    ],
  },
  {
    question: "which country is know as birthplace of Gautam Buddha?",
    answers: [
      { text: "China", correct: false },
      { text: "Nepal", correct: true },
      { text: "Bhutan", correct: false },
      { text: "India", correct: false },
    ],
  },
  {
    question: "Which is the Smallest country in the world?",
    answers: [
      { text: "Vatican city", correct: true },
      { text: "Maldives", correct: false },
      { text: "Sri-Lanka", correct: false },
      { text: "Bhutan", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector(".next-btn");
const addQuestion = document.querySelector(".add-question");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  resetState();
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
addQuestion.addEventListener("click", () => {
  resetState();
  questionElement.innerHTML = "Add your new question here";
  var qf = document.createElement("input");
  qf.setAttribute("type", "text");
  qf.setAttribute("class", "newQuestionInput");
  questionElement.appendChild(document.createElement("br"));
  questionElement.appendChild(qf);
});
startQuiz();
