const tabComparison = document.getElementById("tab-comparison");
const tabProcess = document.getElementById("tab-process");

const contentComparison = document.getElementById("content-comparison");
const contentProcess = document.getElementById("content-process");

// Get the warning card element
const warningCard = document.getElementById("warning-card");

tabComparison.addEventListener("click", () => {
  // Show comparison, hide process flow
  contentComparison.classList.remove("hidden");
  contentProcess.classList.add("hidden");

  // Show warning
  warningCard.classList.remove("hidden");

  // Style active tab
  tabComparison.classList.add("bg-blue-600", "text-white", "shadow");
  tabComparison.classList.remove("bg-gray-100", "text-gray-700");
  tabProcess.classList.remove("bg-blue-600", "text-white", "shadow");
  tabProcess.classList.add("bg-gray-100", "text-gray-700");
});

tabProcess.addEventListener("click", () => {
  // Show process flow, hide comparison
  contentProcess.classList.remove("hidden");
  contentComparison.classList.add("hidden");

  // Hide warning
  warningCard.classList.add("hidden");

  // Style active tab
  tabProcess.classList.add("bg-blue-600", "text-white", "shadow");
  tabProcess.classList.remove("bg-gray-100", "text-gray-700");
  tabComparison.classList.remove("bg-blue-600", "text-white", "shadow");
  tabComparison.classList.add("bg-gray-100", "text-gray-700");
});
