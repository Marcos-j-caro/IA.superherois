const questions = [
    {
        question: "Qual super-herói tem o alter ego de Bruce Wayne?",
        options: ["Batman", "Superman", "Homem-Aranha", "Capitão América"],
        answer: "Batman"
    },
    {
        question: "Qual é o nome da cidade onde o Batman opera?",
        options: ["Gotham", "Metrópolis", "Star City", "Central City"],
        answer: "Gotham"
    },
    {
        question: "Qual super-herói é conhecido como 'O Amigo da Vizinhança'?",
        options: ["Homem-Aranha", "Deadpool", "Flash", "Pantera Negra"],
        answer: "Homem-Aranha"
    },
    {
        question: "Qual é o planeta natal do Superman?",
        options: ["Krypton", "Vulcano", "Mídgard", "Tatooine"],
        answer: "Krypton"
    },
    {
        question: "Qual super-herói usa um escudo feito de vibranium?",
        options: ["Capitão América", "Thor", "Hulk", "Lanterna Verde"],
        answer: "Capitão América"
    },
    {
        question: "Qual é o nome da super-heroína conhecida por seu laço da verdade e sua tiara?",
        options: ["Mulher-Maravilha", "Viúva Negra", "Jean Grey", "Doutora Estranha"],
        answer: "Mulher-Maravilha"
    },
    {
        question: "Qual herói é conhecido por seu martelo chamado Mjolnir?",
        options: ["Thor", "Loki", "Hela", "Odin"],
        answer: "Thor"
    },
    {
        question: "Qual é o nome do super-herói que pode se transformar em um gigante verde quando está irritado?",
        options: ["Hulk", "Homem-Aranha", "Wolverine", "Pantera Negra"],
        answer: "Hulk"
    },
    {
        question: "Qual é o verdadeiro nome do Homem de Ferro?",
        options: ["Tony Stark", "Peter Parker", "Clark Kent", "Bruce Banner"],
        answer: "Tony Stark"
    },
    {
        question: "Qual é o nome da organização secreta que criou o Deadpool?",
        options: ["Arma X", "S.H.I.E.L.D.", "Hydra", "The Hand"],
        answer: "Arma X"
    },
    {
        question: "Qual super-herói tem a habilidade de correr em alta velocidade?",
        options: ["Flash", "Mercúrio", "Homem-Aranha", "Capitão Marvel"],
        answer: "Flash"
    },
    {
        question: "Quem é o alter ego da Viúva Negra?",
        options: ["Natasha Romanoff", "Wanda Maximoff", "Carol Danvers", "Peggy Carter"],
        answer: "Natasha Romanoff"
    },
    {
        question: "Qual é o super-herói que possui um anel de poder verde?",
        options: ["Lanterna Verde", "Nova", "Doutor Estranho", "Magia"],
        answer: "Lanterna Verde"
    },
    {
        question: "Qual super-herói é conhecido por seu traje metálico e por ser um gênio da engenharia?",
        options: ["Homem de Ferro", "Homem-Formiga", "Doutor Octopus", "Deadpool"],
        answer: "Homem de Ferro"
    },
    {
        question: "Qual é o nome do alter ego de Clark Kent?",
        options: ["Superman", "Batman", "Aquaman", "Wolverine"],
        answer: "Superman"
    }
];

let currentQuestionIndex = 0;
const userAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const question = questions[index];
    const shuffledOptions = shuffleArray([...question.options]);

    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<h2>${question.question}</h2>`;
    
    shuffledOptions.forEach(option => {
        questionElement.innerHTML += `
            <div class="question-option">
                <input type="radio" name="answer" value="${option}" id="${option}">
                <label for="${option}">${option}</label>
            </div>
        `;
    });

    questionContainer.appendChild(questionElement);

    document.getElementById('prev-button').disabled = index === 0;
    document.getElementById('next-button').disabled = index === questions.length - 1;
}

function navigate(direction) {
    saveAnswer();
    currentQuestionIndex += direction;
    if (currentQuestionIndex < 0) currentQuestionIndex = 0;
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }
    loadQuestion(currentQuestionIndex);
}

function saveAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestionIndex] = selectedOption.value;
    } else {
        userAnswers[currentQuestionIndex] = null; // Caso a resposta não tenha sido selecionada
    }
}

function showResult() {
    const resultContainer = document.getElementById('result-details');
    resultContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.answer;
        resultContainer.innerHTML += `
            <div>
                <h3>${question.question}</h3>
                <p>Sua resposta: ${userAnswer ? userAnswer : 'Não respondida'}</p>
                <p>Resposta correta: ${question.answer}</p>
                <p>${isCorrect ? 'Correto!' : 'Incorreto!'}</p>
            </div>
        `;
    });

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    questions.sort(() => Math.random() - 0.5); // Embaralha as perguntas
    loadQuestion(currentQuestionIndex);
});

document.getElementById('restart-button').addEventListener('click', () => {
    currentQuestionIndex = 0;
    userAnswers.length = 0; // Limpa respostas anteriores
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('start-button').textContent = 'Iniciar Novo Quiz'; // Muda o texto do botão
    document.getElementById('prev-button').disabled = true;
    document.getElementById('next-button').disabled = false;
});

// Alternar entre modo claro e escuro
const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggleButton.textContent = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
});
