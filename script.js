document.addEventListener('DOMContentLoaded', () => {
    const perguntas = [
        
            {
                "pergunta": "Qual é o seu ambiente de combate preferido?",
                "opcoes": ["Cidade grande", "Floresta ou ambiente natural", "Espaço ou outros planetas", "Laboratório ou ambiente tecnológico"]
            },
            {
                "pergunta": "Como você prefere lidar com os desafios?",
                "opcoes": ["Usando força bruta e habilidades físicas", "Com inteligência e estratégia", "Com habilidades especiais ou poderes", "Com tecnologia e gadgets"]
            },
            {
                "pergunta": "Qual é a sua abordagem quando enfrenta um inimigo?",
                "opcoes": ["Enfrento diretamente e com coragem", "Planejo e preparo uma estratégia detalhada", "Uso meus poderes ou habilidades especiais", "Utilizo equipamentos e armas tecnológicas"]
            },
            {
                "pergunta": "Qual é a sua maior qualidade?",
                "opcoes": ["Coragem e bravura", "Inteligência e criatividade", "Determinação e velocidade sobre-humana", "Habilidade em ciência e tecnologia"]
            },
            {
                "pergunta": "Se você pudesse escolher um superpoder, qual seria?",
                "opcoes": ["Superforça", "Inteligência superior e habilidades analíticas", "Velocidade super-humana", "Controle sobre máquinas e tecnologia"]
            },
            {
                "pergunta": "Qual é a sua filosofia de vida?",
                "opcoes": ["A justiça deve prevalecer a qualquer custo.", "Conhecimento é poder, e o planejamento é fundamental.", "Com grandes poderes vêm grandes responsabilidades.", "A tecnologia pode mudar o mundo para melhor."]
            },
            {
                "pergunta": "Qual é o seu tipo de treinamento favorito?",
                "opcoes": ["Treinamento físico e combate", "Estudos e desenvolvimento intelectual", "Prática de habilidades especiais e poderes", "Aperfeiçoamento em tecnologia e engenharia"]
            },
            {
                "pergunta": "Como você se relaciona com os outros?",
                "opcoes": ["Como um líder protetor", "Como um mentor sábio", "Como um aliado poderoso e inspirador", "Como um colaborador engenhoso"]
            },
            {
                "pergunta": "Qual é o seu tipo de música favorito?",
                "opcoes": ["Rock", "Jazz", "Música Eletrônica", "Clássica"]
            },
            {
                "pergunta": "Qual é o seu animal preferido?",
                "opcoes": ["Leão", "Águia", "Lobo", "Cervo"]
            }
        ];
        
        const resultados = [
            {
                texto: "Você é Superman! Você é corajoso, tem uma forte moral e é conhecido por sua força e habilidades sobre-humanas.",
                imagem: "Untitled Project.jpg"
            },
            {
                texto: "Você é Batman! Você usa sua inteligência e planejamento para superar desafios. Com uma mente estratégica e habilidades de detetive, você enfrenta o mal com determinação e astúcia.",
                imagem: "Batman.jpg"
            },
            {
                texto: "Você é Flash! Sua velocidade é incrível, e você sabe como usar isso a seu favor. Você enfrenta desafios com rapidez e tem um grande senso de justiça.",
                imagem: "flash.png"
            },
            {
                texto: "Você é Homem de Ferro (Iron Man)! Você se destaca em tecnologia e inovação. Usando sua mente brilhante e suas invenções, você luta contra o crime e aprimora o mundo ao seu redor com suas criações tecnológicas.",
                imagem: "Homem de Ferro.jpg"
            },
            {
                texto: "Você é Capitão América! Você é destemido e está sempre pronto para lutar pelo que é certo. Seus poderes e determinação fazem de você um herói formidável.",
                imagem: "Untitled Project (1).jpg"
            },
            {
                texto: "Você é Pantera Negra! Você é um líder nato e tem um forte senso de dever e honra. Suas habilidades de combate e estratégia são incomparáveis.",
                imagem: "Untitled Project (2).jpg"
            }
        ];
        
        

    const startScreen = document.getElementById('start-screen');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    const questionContainer = document.getElementById('question-container');

    let currentQuestionIndex = 0;
    const respostas = Array(perguntas.length).fill(null);

    document.getElementById('start-btn').addEventListener('click', () => {
        startScreen.classList.add('hidden');
        showQuestion();
        questionScreen.classList.remove('hidden');
    });

    function showQuestion() {
        const pergunta = perguntas[currentQuestionIndex];
        questionContainer.innerHTML = `
            <div class="question">
                <h3>${pergunta.pergunta}</h3>
                ${pergunta.opcoes.map((opcao, i) => `
                    <label>
                        <input type="radio" name="q${currentQuestionIndex}" value="${i}" required>
                        ${opcao}
                    </label>
                `).join('')}
            </div>
        `;
        questionContainer.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', handleAnswer);
        });
    }

    function handleAnswer(event) {
        const resposta = event.target.value;
        respostas[currentQuestionIndex] = resposta;

        currentQuestionIndex++;
        if (currentQuestionIndex < perguntas.length) {
            showQuestion();
        } else {
            mostrarResultado();
        }
    }

    function mostrarResultado() {
        const contagem = [0, 0, 0, 0, 0, 0]; 
        respostas.forEach(resposta => {
            contagem[parseInt(resposta)]++;
        });
    
        const maximo = Math.max(...contagem);
        const indice = contagem.indexOf(maximo);
    
        const resultado = resultados[indice] || { texto: "Você tem uma combinação de características de vários heróis!", imagem: "url_da_imagem_default.jpg" };
        document.getElementById('result').textContent = resultado.texto;
        
        const imgElement = document.createElement('img');
        imgElement.src = resultado.imagem;
        imgElement.alt = "Resultado do quiz";
        imgElement.classList.add('resultado-imagem'); 
    
        const resultContainer = document.getElementById('result-container'); 
        resultContainer.innerHTML = '';
        resultContainer.appendChild(imgElement); 
    
        questionScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
    }
    
});
