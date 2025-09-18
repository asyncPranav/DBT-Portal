// Sample questions data
const questions = [
  {
    id: 1,
    title: "How do I check if my account is DBT-enabled?",
    details:
      "I've linked my Aadhaar to my bank account but I'm not sure if it's DBT-enabled. How can I verify this?",
    category: "dbt-setup",
    author: "Priya Sharma",
    time: "2 hours ago",
    answers: 3,
    views: 45,
    status: "answered",
    tags: ["verification", "dbt-status"],
  },
  {
    id: 2,
    title: "Scholarship payment failed - what should I do?",
    details:
      "I applied for a scholarship and it shows approved, but the payment failed. My account is Aadhaar linked. What could be wrong?",
    category: "scholarships",
    author: "Rahul Kumar",
    time: "5 hours ago",
    answers: 7,
    views: 128,
    status: "answered",
    tags: ["payment-failed", "troubleshooting"],
  },
  {
    id: 3,
    title: "Can I use joint account for DBT?",
    details:
      "I have a joint savings account with my father. Can this account receive DBT payments for scholarships?",
    category: "account-linking",
    author: "Anita Singh",
    time: "1 day ago",
    answers: 2,
    views: 67,
    status: "answered",
    tags: ["joint-account", "eligibility"],
  },
  {
    id: 4,
    title: "Different banks have different DBT setup process?",
    details:
      "I've heard that the process to enable DBT varies across banks. Is this true? I have an account with Canara Bank.",
    category: "dbt-setup",
    author: "Vikram Patel",
    time: "1 day ago",
    answers: 0,
    views: 23,
    status: "unanswered",
    tags: ["bank-specific", "canara-bank"],
  },
  {
    id: 5,
    title: "How long does it take for DBT to activate?",
    details:
      "I submitted the DBT enablement form at my bank branch yesterday. How long does it typically take to activate?",
    category: "dbt-setup",
    author: "Sneha Reddy",
    time: "2 days ago",
    answers: 5,
    views: 89,
    status: "answered",
    tags: ["timeline", "activation"],
  },
  {
    id: 6,
    title: "Error while linking Aadhaar online",
    details:
      "I'm getting an error message when trying to link my Aadhaar online through the bank website. It says 'Invalid OTP' even though I'm entering the correct OTP.",
    category: "technical-issues",
    author: "Amit Joshi",
    time: "3 days ago",
    answers: 4,
    views: 156,
    status: "answered",
    tags: ["otp-error", "online-linking"],
  },
];

let currentQuestions = [...questions];

// DOM elements
const questionModal = document.getElementById("questionModal");
const askQuestionBtn = document.getElementById("askQuestionBtn");
const closeModal = document.getElementById("closeModal");
const cancelQuestion = document.getElementById("cancelQuestion");
const questionForm = document.getElementById("questionForm");
const questionsContainer = document.getElementById("questionsContainer");
const searchQuestions = document.getElementById("searchQuestions");
const categoryFilter = document.getElementById("categoryFilter");
const sortButtons = {
  recent: document.getElementById("sortRecent"),
  popular: document.getElementById("sortPopular"),
  unanswered: document.getElementById("sortUnanswered"),
};
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

// Mobile menu functionality
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.add("translate-x-full");
});

// Modal functionality
askQuestionBtn.addEventListener("click", () => {
  questionModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

closeModal.addEventListener("click", closeQuestionModal);
cancelQuestion.addEventListener("click", closeQuestionModal);

function closeQuestionModal() {
  questionModal.classList.add("hidden");
  document.body.style.overflow = "auto";
  questionForm.reset();
}

// Form submission
questionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newQuestion = {
    id: questions.length + 1,
    title: document.getElementById("questionTitle").value,
    details: document.getElementById("questionDetails").value,
    category: document.getElementById("questionCategory").value,
    author: document.getElementById("userName").value,
    time: "Just now",
    answers: 0,
    views: 0,
    status: "unanswered",
    tags: [],
  };

  questions.unshift(newQuestion);
  currentQuestions.unshift(newQuestion);
  renderQuestions();
  closeQuestionModal();

  // Show success message
  showSuccessMessage("Your question has been posted successfully!");
});

// Search and filter functionality
searchQuestions.addEventListener("input", filterQuestions);
categoryFilter.addEventListener("change", filterQuestions);

function filterQuestions() {
  const searchTerm = searchQuestions.value.toLowerCase();
  const category = categoryFilter.value;

  currentQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm) ||
      q.details.toLowerCase().includes(searchTerm) ||
      q.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
    const matchesCategory = !category || q.category === category;

    return matchesSearch && matchesCategory;
  });

  renderQuestions();
}

// Sort functionality
Object.keys(sortButtons).forEach((key) => {
  sortButtons[key].addEventListener("click", () => {
    // Update active button
    Object.values(sortButtons).forEach((btn) => {
      btn.className =
        "px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-full";
    });
    sortButtons[key].className =
      "px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full";

    // Sort questions
    sortQuestions(key);
  });
});

function sortQuestions(sortType) {
  switch (sortType) {
    case "recent":
      currentQuestions.sort((a, b) => new Date(b.time) - new Date(a.time));
      break;
    case "popular":
      currentQuestions.sort((a, b) => b.views - a.views);
      break;
    case "unanswered":
      currentQuestions = currentQuestions.filter(
        (q) => q.status === "unanswered"
      );
      break;
  }
  renderQuestions();
}

// Render questions
function renderQuestions() {
  questionsContainer.innerHTML = currentQuestions
    .map(
      (q) => `
        <div class="question-card bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-3">
              <span class="bg-${getCategoryColor(
                q.category
              )}-100 text-${getCategoryColor(
        q.category
      )}-700 text-xs font-semibold px-2 py-1 rounded-full">
                ${formatCategory(q.category)}
              </span>
              ${
                q.status === "unanswered"
                  ? '<span class="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">Unanswered</span>'
                  : ""
              }
            </div>
            <div class="text-sm text-gray-500">${q.time}</div>
          </div>
          
          <h3 class="font-semibold text-lg text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">${
            q.title
          }</h3>
          <p class="text-gray-600 mb-4 line-clamp-2">${q.details}</p>
          
          <div class="flex items-center justify-between text-sm text-gray-500">
            <div class="flex items-center gap-4">
              <span>👤 ${q.author}</span>
              <span>💬 ${q.answers} answers</span>
              <span>👁️ ${q.views} views</span>
            </div>
            <button class="text-blue-600 hover:text-blue-700 font-medium">View Details</button>
          </div>
          
          ${
            q.tags.length > 0
              ? `
            <div class="flex gap-2 mt-3">
              ${q.tags
                .map(
                  (tag) =>
                    `<span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">#${tag}</span>`
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      `
    )
    .join("");
}

function getCategoryColor(category) {
  const colors = {
    "dbt-setup": "blue",
    "account-linking": "green",
    scholarships: "purple",
    "technical-issues": "red",
    general: "gray",
  };
  return colors[category] || "gray";
}

function formatCategory(category) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.className =
    "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 fade-in";
  successDiv.textContent = message;
  document.body.appendChild(successDiv);

  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Initial render
renderQuestions();

// Close modal when clicking outside
questionModal.addEventListener("click", (e) => {
  if (e.target === questionModal) {
    closeQuestionModal();
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    mobileMenu.classList.add("translate-x-full");
  }
});
