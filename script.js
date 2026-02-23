let userName = "";

const questions = [
    {
        question: "Which data structure uses FIFO principle?",
        options: ["Stack", "Queue", "Tree"],
        answer: 1
    },
    {
        question: "What is the time complexity of Binary Search?",
        options: ["O(n)", "O(log n)", "O(n^2)"],
        answer: 1
    },
    {
        question: "Which protocol is used to transfer web pages?",
        options: ["FTP", "HTTP", "SMTP"],
        answer: 1
    },
    {
        question: "Which layer of OSI model handles encryption?",
        options: ["Application", "Transport", "Presentation"],
        answer: 2
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    userName = document.getElementById("username").value;

    if (userName === "") {
        alert("Please enter your name!");
        return;
    }

    document.getElementById("nameSection").style.display = "none";
    document.getElementById("quizSection").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(button);
        optionsDiv.appendChild(document.createElement("br"));
    });
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].answer) {
        score++;
    }
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const total = questions.length;
    const percentage = ((score / total) * 100).toFixed(2);

    document.getElementById("question").innerText = "Quiz Completed!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("result").innerText = 
        "Your Score: " + score + "/" + total;
    document.getElementById("percentage").innerText = 
        "Percentage: " + percentage + "%";

    document.getElementById("certificateBtn").style.display = "inline-block";
}

function downloadCertificate() {

    if (typeof window.jspdf === "undefined") {
        alert("Internet ON karo. PDF library load nathi thai.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Certificate of Achievement", 20, 30);

    doc.setFontSize(16);
    doc.text("Awarded to: " + userName, 20, 60);
    doc.text("Score: " + score + "/" + questions.length, 20, 80);

    doc.save(userName + "_Certificate.pdf");
}