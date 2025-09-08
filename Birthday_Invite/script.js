const questions = [
  { question: "Do you know Loree?" },
  { question: "Do you know when it's her birthday?" },
  { question: "Can you guess what is the theme of the party?" },
  { question: "Would you please like to join us?" }
];

const birthdayDate = "09/11";
const correctThemeAnswer = "stranger things";

let currentIndex = 0;
let waitingForConfirmation = false;
let waitingForDateInput = false;
let waitingForDareAnswer = false;
let waitingForThemeInput = false;

const questionEl = document.getElementById('question');
const buttonsEl = document.getElementById('buttons');
const confirmationEl = document.getElementById('confirmation');
const feedbackEl = document.getElementById('feedback');
const dateInputContainer = document.getElementById('date-input-container');
const dateInput = document.getElementById('date-input');
const dareQuestionContainer = document.getElementById('dare-question-container');
const themeInputContainer = document.getElementById('theme-input-container');
const themeInput = document.getElementById('theme-input');
const noMessage = document.getElementById('no-message');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const container = document.getElementById('container');

function loadQuestion() {
  waitingForConfirmation = false;
  waitingForDateInput = false;
  waitingForDareAnswer = false;
  waitingForThemeInput = false;

  confirmationEl.style.display = 'none';
  dateInputContainer.style.display = 'none';
  dareQuestionContainer.style.display = 'none';
  themeInputContainer.style.display = 'none';
  feedbackEl.textContent = '';
  noMessage.textContent = '';
  buttonsEl.style.display = 'block';
  yesBtn.style.display = 'inline-block';
  noBtn.style.display = 'inline-block';
  questionEl.textContent = questions[currentIndex].question;

  dateInput.value = '';
  themeInput.value = '';
}

function answerYes() {
  if (waitingForConfirmation || waitingForDateInput || waitingForDareAnswer || waitingForThemeInput) return;

  if (currentIndex === 1) {
    waitingForDateInput = true;
    buttonsEl.style.display = 'none';
    dateInputContainer.style.display = 'block';
  } else if (currentIndex === 2) {
    waitingForThemeInput = true;
    buttonsEl.style.display = 'none';
    themeInputContainer.style.display = 'block';
  } else if (currentIndex === 3) {
    feedbackEl.style.color = 'green';
    feedbackEl.textContent = "Be right there at Chulha Chowka 9:30 PM onwards 10th of September 🍽️";
    buttonsEl.style.display = 'none';
    setTimeout(() => {
      questionEl.textContent = "Thank you for being awesome!";
      feedbackEl.textContent = '';
    }, 3000);
  } else {
    feedbackEl.style.color = 'green';
    feedbackEl.textContent = 'Wow you are awesome ✅';
    nextQuestion();
  }
}

function answerNo() {
  if (waitingForConfirmation || waitingForDateInput || waitingForDareAnswer || waitingForThemeInput) return;

  if (currentIndex === 1) {
    feedbackEl.style.color = 'blue';
    feedbackEl.textContent = "It's on 11th of September.";
    buttonsEl.style.display = 'none';
    setTimeout(() => {
      feedbackEl.textContent = '';
      nextQuestion();
    }, 2500);
  } else if (currentIndex === 2) {
    waitingForDareAnswer = true;
    buttonsEl.style.display = 'none';
    dareQuestionContainer.style.display = 'block';
    feedbackEl.textContent = '';
  } else if (currentIndex === 3) {
    jumpNoButton();
  } else {
    waitingForConfirmation = true;
    confirmationEl.style.display = 'block';
    buttonsEl.style.display = 'none';
    feedbackEl.textContent = '';
  }
}

function confirmNo(confirmed) {
  if (confirmed) {
    feedbackEl.style.color = 'red';
    feedbackEl.textContent = 'Really urghh ❌';
    confirmationEl.style.display = 'none';
    nextQuestion();
  } else {
    waitingForConfirmation = false;
    confirmationEl.style.display = 'none';
    buttonsEl.style.display = 'block';
    feedbackEl.textContent = '';
  }
}

function submitDate() {
  const userDate = dateInput.value.trim();
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;

  if (!dateRegex.test(userDate)) {
    feedbackEl.style.color = 'red';
    feedbackEl.textContent = 'Please enter the date in MM/DD format';
    return;
  }

  if (userDate === birthdayDate) {
    feedbackEl.style.color = 'green';
    feedbackEl.textContent = 'Good to know ✅';
  } else {
    feedbackEl.style.color = 'red';
    feedbackEl.textContent = 'That hurts ❌';
  }

  setTimeout(() => {
    dateInputContainer.style.display = 'none';
    feedbackEl.textContent = '';
    nextQuestion();
  }, 2000);
}

function dareAnswer(yes) {
  if (yes) {
    waitingForThemeInput = true;
    waitingForDareAnswer = false;
    dareQuestionContainer.style.display = 'none';
    themeInputContainer.style.display = 'block';
  } else {
    waitingForDareAnswer = false;
    dareQuestionContainer.style.display = 'none';
    feedbackEl.textContent = '';
    nextQuestion();
  }
}

function submitTheme() {
  const userTheme = themeInput.value.trim().toLowerCase();

  if (!userTheme) {
    feedbackEl.style.color = 'red';
    feedbackEl.textContent = 'Please enter your guess';
    return;
  }

  if (userTheme === correctThemeAnswer) {
    feedbackEl.style.color = 'green';
    feedbackEl.textContent = 'Nice! You got it right ✅';
    themeInputContainer.style.display = 'none';
    setTimeout(() => {
      feedbackEl.textContent = '';
      nextQuestion();
    }, 2000);
  } else {
    feedbackEl.style.color = 'red';
    feedbackEl.textContent = 'It is Stranger Things (The Series)';
    themeInputContainer.style.display = 'none';
    setTimeout(() => {
      feedbackEl.textContent = '';
      nextQuestion();
    }, 3000);
  }
}

function jumpNoButton() {
  const containerRect = container.getBoundingClientRect();
  const noBtnRect = noBtn.getBoundingClientRect();

  const maxX = containerRect.width - noBtnRect.width;
  const maxY = containerRect.height - noBtnRect.height;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.position = 'absolute';
  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';

  noMessage.textContent = "There is no answer such as NO to this question.";

  setTimeout(() => {
    noMessage.textContent = '';
  }, 3000);
}

function nextQuestion() {
  noBtn.style.position = 'static';
  noBtn.style.left = '';
  noBtn.style.top = '';
  noMessage.textContent = '';

  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Can't wait to meet you! Thanks for participating.";
    buttonsEl.style.display = 'none';
    confirmationEl.style.display = 'none';
    dateInputContainer.style.display = 'none';
    dareQuestionContainer.style.display = 'none';
    themeInputContainer.style.display = 'none';
    feedbackEl.textContent = '';
  }
}

loadQuestion();
