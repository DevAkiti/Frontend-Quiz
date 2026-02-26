const statement = document.getElementById("statement");
const optionsButton = document.querySelector("#options").children;
const explanation = document.getElementById("explanation");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const questionNumber = document.getElementById("question-number");


const facts = [
    {
        statement: "CSS stands for Cascading Style Sheets",
        answer: true,
        explanation: "CSS stands for Cascading Style Sheets, used for styling web pages.",
    },
    {
        statement: "JavaScript is case-sensitive",
        answer: true,
        explanation: "JavaScript is case-sensitive, meaning 'Hello' and 'hello' are different.",
    },
    {
        statement: "HTML is a programming language",
        answer: false,
        explanation: "HTML is a markup language, not a programming language.",
    },
    {
        statement: "The DOM stands for Document Object Model",
        answer: true,
        explanation: "DOM stands for Document Object Model, which represents the structure of a web page.",
    },
    {
        statement: "Arrays are like Objects",
        answer: true,
        explanation: "Arrays are type of Objects with special properties",
    }
];

let currentQuestionIndex = 0;

// Function to load a question
function loadQuestion(index) {
    const fact = facts[index];
    statement.textContent = fact.statement;
    explanation.textContent = "";
    questionNumber.textContent = `Question ${index + 1} of ${facts.length}`;
    
    // Enable buttons and remove classes
    for (let button of optionsButton) {
        enable(button);
        button.classList.remove("correct", "incorrect");
    }
    
    // Update navigation buttons
    prevButton.disabled = index === 0;
    nextButton.disabled = index === facts.length - 1;
}

// Disable function
const disable = (button) => {
    button.setAttribute("disabled", "");
};

// Enable function
const enable = (button) => button.removeAttribute("disabled");

// Iscorrect function
function isCorrect(guessString) {
    return guessString === facts[currentQuestionIndex].answer.toString();
}

// Add event listeners to option buttons
for (let button of optionsButton) {
    button.addEventListener("click", (event) => {
        const fact = facts[currentQuestionIndex];
        explanation.textContent = fact.explanation;

        // Disable all buttons
        for (let disableButton of optionsButton) {
            disable(disableButton);
        }

        // Check answer
        let value = button.getAttribute("value");
        if (isCorrect(value)) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });
}

// Navigation event listeners
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < facts.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

// Load the first question
loadQuestion(currentQuestionIndex);