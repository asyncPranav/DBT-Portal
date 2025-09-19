// Quiz data
const quizQuestions = [
  {
    question:
      "What does DBT stand for in the context of government scholarships?",
    options: [
      "Digital Bank Transfer",
      "Direct Benefit Transfer",
      "Database Banking Technology",
      "Digital Benefit Technology",
    ],
    correct: 1,
    explanation:
      "DBT stands for Direct Benefit Transfer - a system that enables direct transfer of government benefits to beneficiaries' bank accounts.",
  },
  {
    question:
      "Is an Aadhaar-linked bank account the same as a DBT-enabled account?",
    options: [
      "Yes, they are exactly the same",
      "No, DBT-enabled accounts require additional registration",
      "Yes, but only for government employees",
      "No, Aadhaar linking is not required for DBT",
    ],
    correct: 1,
    explanation:
      "While Aadhaar linking is necessary, DBT-enabled accounts require additional registration through NPCI (National Payments Corporation of India) to receive government benefits.",
  },
  {
    question: "Which organization manages the DBT system in India?",
    options: [
      "Reserve Bank of India (RBI)",
      "State Bank of India (SBI)",
      "National Payments Corporation of India (NPCI)",
      "Ministry of Finance",
    ],
    correct: 2,
    explanation:
      "NPCI (National Payments Corporation of India) manages the DBT infrastructure and maintains the database of DBT-enabled accounts.",
  },
  {
    question:
      "What happens if your account is not DBT-enabled when you apply for scholarships?",
    options: [
      "You get the money in cash",
      "The scholarship amount may be delayed or rejected",
      "It's automatically converted to DBT-enabled",
      "You can use any other account",
    ],
    correct: 1,
    explanation:
      "If your account is not DBT-enabled, scholarship payments may be delayed, rejected, or require manual processing, causing significant delays.",
  },
  {
    question:
      "How long does it typically take to enable DBT on your bank account?",
    options: ["Immediately", "1-2 business days", "1-2 weeks", "1-2 months"],
    correct: 1,
    explanation:
      "DBT enablement typically takes 1-2 business days after submitting the required documents and completing the registration process at your bank.",
  },
  {
    question: "Which document is mandatory for DBT account registration?",
    options: [
      "PAN Card only",
      "Voter ID only",
      "Aadhaar Card",
      "Driving License",
    ],
    correct: 2,
    explanation:
      "Aadhaar Card is mandatory for DBT account registration as it provides the unique identification required for the Direct Benefit Transfer system.",
  },
  {
    question: "Can you have multiple DBT-enabled accounts?",
    options: [
      "Yes, unlimited accounts",
      "No, only one account per person",
      "Yes, but maximum 3 accounts",
      "Only if you have multiple Aadhaar cards",
    ],
    correct: 1,
    explanation:
      "You can have only one DBT-enabled account per Aadhaar number. If you want to change your DBT account, you need to deregister the old one and register a new account.",
  },
  {
    question: "What should you do if your scholarship payment is delayed?",
    options: [
      "Wait indefinitely",
      "Apply for the scholarship again",
      "Check if your account is DBT-enabled and contact support",
      "Open a new bank account",
    ],
    correct: 2,
    explanation:
      "First verify that your account is DBT-enabled, then contact the scholarship portal support and your bank to track the payment status and resolve any issues.",
  },
  {
    question: "Which type of bank accounts can be made DBT-enabled?",
    options: [
      "Only savings accounts",
      "Only current accounts",
      "Both savings and current accounts",
      "Only joint accounts",
    ],
    correct: 2,
    explanation:
      "Both savings and current accounts can be made DBT-enabled, but individual accounts are preferred over joint accounts for scholarship payments.",
  },
  {
    question: "What is the NPCI helpline number for DBT-related queries?",
    options: ["1947", "1800-1201-1947", "1800-180-1551", "1800-425-3800"],
    correct: 1,
    explanation:
      "The NPCI helpline number 1800-1201-1947 provides support for DBT-related queries, account registration issues, and payment tracking.",
  },
];

// Quiz state
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStarted = false;
let quizCompleted = false;

// DOM elements
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultsScreen = document.getElementById("resultsScreen");
const quizStats = document.getElementById("quizStats");
const startQuizBtn = document.getElementById("startQuizBtn");
const questionCard = document.getElementById("questionCard");
const explanationCard = document.getElementById("explanationCard");

// Initialize quiz
document.addEventListener("DOMContentLoaded", function () {
  startQuizBtn.addEventListener("click", startQuiz);
  document.getElementById("retakeBtn").addEventListener("click", resetQuiz);
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document.getElementById("prevBtn").addEventListener("click", prevQuestion);
});

function startQuiz() {
  quizStarted = true;
  currentQuestionIndex = 0;
  userAnswers = [];

  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  quizStats.classList.remove("hidden");

  document.getElementById("totalQuestions").textContent = quizQuestions.length;
  displayQuestion();
}

function displayQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("questionText");
  const questionOptions = document.getElementById("questionOptions");
  const currentQuestionSpan = document.getElementById("currentQuestion");
  const progressBar = document.getElementById("progressBar");

  // Update question counter and progress
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  progressBar.style.width = progress + "%";

  // Display question
  questionText.textContent = question.question;

  // Clear previous options
  questionOptions.innerHTML = "";

  // Create option buttons
  question.options.forEach((option, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.className =
      "option-button p-4 border rounded-lg cursor-pointer transition hover:bg-blue-50 hover:border-blue-300";
    optionDiv.innerHTML = `
      <div class="flex items-center">
        <div class="w-6 h-6 border-2 border-gray-300 rounded-full mr-3 flex items-center justify-center">
          <div class="w-3 h-3 bg-blue-600 rounded-full hidden option-selected"></div>
        </div>
        <span>${option}</span>
      </div>
    `;

    optionDiv.addEventListener("click", () => selectOption(index, optionDiv));
    questionOptions.appendChild(optionDiv);
  });

  // Update navigation buttons
  document.getElementById("prevBtn").disabled = currentQuestionIndex === 0;
  document.getElementById("nextBtn").disabled = true;

  // Hide explanation card
  explanationCard.classList.add("hidden");
}

function selectOption(selectedIndex, optionElement) {
  // Remove previous selections
  document.querySelectorAll(".option-button").forEach((btn) => {
    btn.classList.remove("bg-blue-100", "border-blue-500");
    btn.querySelector(".option-selected").classList.add("hidden");
  });

  // Mark selected option
  optionElement.classList.add("bg-blue-100", "border-blue-500");
  optionElement.querySelector(".option-selected").classList.remove("hidden");

  // Store answer
  userAnswers[currentQuestionIndex] = selectedIndex;

  // Enable next button
  document.getElementById("nextBtn").disabled = false;

  // Show explanation
  showExplanation(selectedIndex);
}

function showExplanation(selectedIndex) {
  const question = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedIndex === question.correct;

  const explanationIcon = document.getElementById("explanationIcon");
  const explanationTitle = document.getElementById("explanationTitle");
  const explanationText = document.getElementById("explanationText");

  if (isCorrect) {
    explanationIcon.innerHTML = `
      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `;
    explanationTitle.textContent = "Correct!";
    explanationTitle.className = "font-semibold mb-2 text-green-600";
  } else {
    explanationIcon.innerHTML = `
      <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `;
    explanationTitle.textContent = "Incorrect";
    explanationTitle.className = "font-semibold mb-2 text-red-500";
  }

  explanationText.textContent = question.explanation;
  explanationCard.classList.remove("hidden");
}

function nextQuestion() {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();

    // If user had already answered this question, show their selection
    if (userAnswers[currentQuestionIndex] !== undefined) {
      const selectedIndex = userAnswers[currentQuestionIndex];
      const optionButtons = document.querySelectorAll(".option-button");
      selectOption(selectedIndex, optionButtons[selectedIndex]);
    }
  }
}

function showResults() {
  quizCompleted = true;

  // Hide quiz screen, show results
  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
  quizStats.classList.add("hidden");

  // Calculate score
  let correctCount = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === quizQuestions[index].correct) {
      correctCount++;
    }
  });

  const totalQuestions = quizQuestions.length;
  const incorrectCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Update score display
  document.getElementById(
    "finalScore"
  ).textContent = `${correctCount}/${totalQuestions}`;
  document.getElementById("correctAnswers").textContent = correctCount;
  document.getElementById("incorrectAnswers").textContent = incorrectCount;

  // Update results based on score
  const resultIcon = document.getElementById("resultIcon");
  const resultTitle = document.getElementById("resultTitle");
  const resultDescription = document.getElementById("resultDescription");

  if (percentage >= 80) {
    resultIcon.innerHTML = `
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    `;
    resultTitle.textContent = "Excellent! 🎉";
    resultDescription.textContent =
      "You have a great understanding of DBT-enabled accounts. You're ready to help others too!";
  } else if (percentage >= 60) {
    resultIcon.innerHTML = `
      <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    `;
    resultTitle.textContent = "Good Job! 👍";
    resultDescription.textContent =
      "You have a solid understanding but could benefit from reviewing some concepts.";
  } else {
    resultIcon.innerHTML = `
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-9-6a9 9 0 1118 0 9 9 0 01-18 0z"></path>
        </svg>
      </div>
    `;
    resultTitle.textContent = "Keep Learning! 📚";
    resultDescription.textContent =
      "Don't worry! Review the study materials and try again to improve your understanding.";
  }

  // Show recommended actions
  showRecommendedActions(percentage);
}

function showRecommendedActions(percentage) {
  const actionsList = document.getElementById("actionsList");
  actionsList.innerHTML = "";

  const actions = [];

  if (percentage < 60) {
    actions.push("📖 Review the 'What's the Difference?' guide thoroughly");
    actions.push("🏦 Visit your bank to understand DBT enablement process");
    actions.push("📞 Call NPCI helpline (1800-1201-1947) for clarification");
    actions.push("🔄 Retake this quiz after studying");
  } else if (percentage < 80) {
    actions.push("✅ Check if your account is already DBT-enabled");
    actions.push("📋 Review the setup guide for any missed steps");
    actions.push("🎯 Focus on areas where you answered incorrectly");
  } else {
    actions.push("🎉 Your account should be ready for scholarships!");
    actions.push("📋 Double-check your account status to be sure");
    actions.push("👥 Help others learn about DBT accounts");
    actions.push("📚 Stay updated with any policy changes");
  }

  actions.forEach((action) => {
    const actionDiv = document.createElement("div");
    actionDiv.className = "flex items-center text-gray-700";
    actionDiv.innerHTML = `<span class="mr-2">•</span> ${action}`;
    actionsList.appendChild(actionDiv);
  });
}

function resetQuiz() {
  quizCompleted = false;
  quizStarted = false;
  currentQuestionIndex = 0;
  userAnswers = [];

  // Reset displays
  resultsScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  quizStats.classList.add("hidden");

  // Reset score display
  document.getElementById("currentScore").textContent = "0";
  document.getElementById("maxScore").textContent = "0";
}

// Mobile menu functionality (from original)
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu && closeMenu) {
    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.remove("translate-x-full");
    });

    closeMenu.addEventListener("click", function () {
      mobileMenu.classList.add("translate-x-full");
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener("click", function (e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.add("translate-x-full");
      }
    });
  }
});
