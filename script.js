const questions = [
  {
    question: "Temizleyici, koruyucu anlamı veren Allah’ın Esma’sı hangisidir?",
    options: ["A) El-Kuddüs", "B) El-Gaffar"],
    correct: 0,
    answerText: "Doğru cevap: A) El-Kuddüs"
  },
  {
    question: "Mutlak adaletin sahibi olan anlamına gelen Allah’ın Esma’sı hangisidir?",
    options: ["A) El-Kuddüs", "B) El-Adl"],
    correct: 1,
    answerText: "Doğru cevap: B) El-Adl"
  },
  {
    question: "Mekkî bir suredir, 7 ayetten oluşur, Ümmü’l-Kitap olarak anılır, duaların bütünüdür. Hangisidir?",
    options: ["A) Fatiha Suresi", "B) İhlas Suresi"],
    correct: 0,
    answerText: "Doğru cevap: A) Fatiha Suresi"
  },
  {
    question: "Niyete bağlı yapılmasında Allah’ın sevdiği her iş nedir?",
    options: ["A) İbadet", "B) Sünnet"],
    correct: 0,
    answerText: "Doğru cevap: A) İbadet"
  },
  {
    question: "Allah’a yakınlık anlamına gelen kavram hangisidir?",
    options: ["A) Farz", "B) Kurbet"],
    correct: 1,
    answerText: "Doğru cevap: B) Kurbet"
  },
  {
    question: "Erkek çocuklarda buluğa erme yaşı hangisidir?",
    options: ["A) 10", "B) 12"],
    correct: 1,
    answerText: "Doğru cevap: B) 12"
  },
  {
    question: "Kız çocuklarında buluğa erme yaşı hangisidir?",
    options: ["A) 7", "B) 9"],
    correct: 1,
    answerText: "Doğru cevap: B) 9"
  },
  {
    question: "Buluğa ermeyen çocuk için tüm ibadetlerin net olarak farz olduğu yaş hangisidir?",
    options: ["A) 13", "B) 15"],
    correct: 1,
    answerText: "Doğru cevap: B) 15"
  },
  {
    question: "Peygamber Efendimizin sürekli yaptığı ve terk etmediği ibadetler hangisidir?",
    options: ["A) Sünnet-i Gayri Müekkede", "B) Sünnet-i Müekkede"],
    correct: 1,
    answerText: "Doğru cevap: B) Sünnet-i Müekkede"
  },
  {
    question: "Peygamber Efendimizin bazen terk ettiği ibadetler hangisidir?",
    options: ["A) Sünnet-i Müekkede", "B) Sünnet-i Gayri Müekkede"],
    correct: 1,
    answerText: "Doğru cevap: B) Sünnet-i Gayri Müekkede"
  }
];

const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const totalQuestions = document.getElementById("total-questions");
const optionsContainer = document.getElementById("options");
const progressFill = document.getElementById("progress-fill");
const feedbackBox = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  questionNumber.textContent = currentQuestionIndex + 1;
  totalQuestions.textContent = questions.length;

  optionsContainer.innerHTML = "";
  feedbackBox.classList.add("hidden");
  feedbackBox.textContent = "";
  feedbackBox.classList.remove("correct", "wrong");
  nextBtn.classList.add("hidden");
  answered = false;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.type = "button";
    button.textContent = option;
    button.setAttribute("data-index", index);
    button.addEventListener("click", () => checkAnswer(index, button));
    optionsContainer.appendChild(button);
  });

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
}

function checkAnswer(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;
  const currentQuestion = questions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((button) => {
    button.disabled = true;
    const index = Number(button.dataset.index);

    if (index === currentQuestion.correct) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== currentQuestion.correct) {
      button.classList.add("wrong");
    }
  });

  if (selectedIndex === currentQuestion.correct) {
    score += 1;
    feedbackBox.textContent = "✅ Doğru! " + currentQuestion.answerText;
    feedbackBox.classList.add("correct");
  } else {
    feedbackBox.textContent = "❌ Yanlış! " + currentQuestion.answerText;
    feedbackBox.classList.add("wrong");
  }

  feedbackBox.classList.remove("hidden");

  if (currentQuestionIndex < questions.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    nextBtn.textContent = "Sonucu Göster";
    nextBtn.classList.remove("hidden");
  }
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  questionText.textContent = `Test tamamlandı! Skorunuz: ${score}/${questions.length}`;
  optionsContainer.innerHTML = "";
  feedbackBox.classList.remove("hidden");
  feedbackBox.classList.add("correct");

  const percent = Math.round((score / questions.length) * 100);
  feedbackBox.textContent = `Başarı oranınız: %${percent}. Tebrikler!`;

  nextBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;
  nextBtn.textContent = "Sonraki Soru";
  restartBtn.classList.add("hidden");
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

renderQuestion();
