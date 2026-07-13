let quiz = JSON.parse(localStorage.getItem("quiz")) || [];
let current = 0;
let score = 0;
let userAnswers = [];

function hideAll() {
    document.querySelectorAll(".card").forEach(card => {
        card.classList.add("hidden");
    });
}

function goHome() {
    hideAll();
    document.getElementById("home").classList.remove("hidden");
}

function showCreate() {
    hideAll();
    document.getElementById("createQuiz").classList.remove("hidden");
}

function showList() {
    hideAll();
    document.getElementById("quizList").classList.remove("hidden");

    let list = document.getElementById("list");

    if (quiz.length === 0) {
        list.innerHTML = "<p>No Quiz Available.</p>";
    } else {
        list.innerHTML = `
            <p>Total Questions: ${quiz.length}</p>
            <button onclick="startQuiz()">Start Quiz</button>
        `;
    }
}

function addQuestion() {

    let q = document.getElementById("question").value;
    let o1 = document.getElementById("option1").value;
    let o2 = document.getElementById("option2").value;
    let o3 = document.getElementById("option3").value;
    let o4 = document.getElementById("option4").value;
    let ans = Number(document.getElementById("answer").value);

    if (!q || !o1 || !o2 || !o3 || !o4) {
        alert("Fill all fields!");
        return;
    }

    quiz.push({
        question: q,
        options: [o1, o2, o3, o4],
        answer: ans
    });

    document.getElementById("question").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    document.getElementById("option4").value = "";

    alert("Question Added!");
}

function saveQuiz() {
    localStorage.setItem("quiz", JSON.stringify(quiz));
    alert("Quiz Saved Successfully!");
}

function startQuiz() {
    current = 0;
    score = 0;
    userAnswers = [];

    hideAll();
    document.getElementById("quizBox").classList.remove("hidden");

    loadQuestion();
}

function loadQuestion() {

    let q = quiz[current];

    document.getElementById("qText").innerHTML =
        `Q${current + 1}. ${q.question}`;

    document.getElementById("progressBar").style.width =
        ((current + 1) / quiz.length) * 100 + "%";

    let options = document.getElementById("options");
    options.innerHTML = "";

    q.options.forEach((opt, index) => {

        let btn = document.createElement("button");

        btn.className = "option";

        btn.innerHTML = opt;

        btn.onclick = () => checkAnswer(index);

        options.appendChild(btn);

    });

}

function checkAnswer(selected) {

    userAnswers.push(selected);

    if (selected === quiz[current].answer) {
        score++;
    }

    current++;

    if (current < quiz.length) {
        loadQuestion();
    } else {
        showResult();
    }

}

function showResult() {

    hideAll();

    document.getElementById("result").classList.remove("hidden");

    document.getElementById("score").innerHTML =
        `Your Score: ${score} / ${quiz.length}`;

    let ans = "";

    quiz.forEach((q, i) => {

        ans += `
        <hr>
        <p><b>Question ${i + 1}:</b> ${q.question}</p>
        <p>Correct Answer:
        <span style="color:green">
        ${q.options[q.answer]}
        </span></p>
        `;

    });

    document.getElementById("answers").innerHTML = ans;

}