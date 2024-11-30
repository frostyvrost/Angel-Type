const personalityDimensions = {
    EI: { name: "Energy", left: "Extroversion", right: "Introversion" },
    SN: { name: "Information", left: "Sensing", right: "Intuition" },
    FT: { name: "Decisions", left: "Feeling", right: "Thinking" },
    JP: { name: "Lifestyle", left: "Judging", right: "Perceiving" }
};

const questions = [
    {
        scenario: "You got isekai'd and ended up in a celestial realm, 71 angels are having discussions and you are included...",
        question: "How do you imagine yourself participating in this divine assembly?",
        dimension: "EI",
        choices: [
            {
                text: "Engaging actively with multiple angels, sharing experiences and building connections with many celestial beings",
                score: "E"
            },
            {
                text: "Observing thoughtfully from a quiet corner, having deep one-on-one conversations with a few selected angels",
                score: "I"
            }
        ]
    },
];

const angelTypes = {
    INTJ: {
        name: "Raziel - The Angel of Mysteries",
        description: "As keeper of divine mysteries and author of the Book of Raziel, they show the INTJ's drive to master complex systems and hidden knowledge."
    },
    INTP: {
        name: "Azrael - The Angel of Death",
        description: "Jophiel, the angel of beauty and creativity, matches the ENFP's enthusiastic and innovative spirit. They inspire joy, artistic expression, and help others see the beauty in possibilities."
    },
};

let currentQuestionIndex = 0;
let scores = {
    E: 0, I: 0,
    S: 0, N: 0,
    F: 0, T: 0,
    J: 0, P: 0
};

function initializeTest() {
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, F: 0, T: 0, J: 0, P: 0 };
    showQuestion();
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    // Update progress and labels
    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('question-counter').textContent = 
        `Question ${currentQuestionIndex + 1}/${questions.length}`;
    document.getElementById('dimension-indicator').textContent = 
        `Exploring Your ${personalityDimensions[question.dimension].name}`;
    
    // Update question content
    document.getElementById('scenario').textContent = question.scenario;
    document.getElementById('current-question').textContent = question.question;
    
    // Update choices
    document.getElementById('choice1').textContent = question.choices[0].text;
    document.getElementById('choice2').textContent = question.choices[1].text;
    
    // Update click handlers
    document.getElementById('choice1').onclick = () => handleChoice(question.choices[0].score);
    document.getElementById('choice2').onclick = () => handleChoice(question.choices[1].score);
}

function handleChoice(score) {
    scores[score]++;
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function calculateType() {
    const type = [
        scores.E > scores.I ? 'E' : 'I',
        scores.S > scores.N ? 'S' : 'N',
        scores.F > scores.T ? 'F' : 'T',
        scores.J > scores.P ? 'J' : 'P'
    ].join('');
    
    return type;
}

function calculateDimensionStrength(dim1, dim2) {
    const total = scores[dim1] + scores[dim2];
    return Math.round((scores[dim1] / total) * 100);
}

function showResult() {
    const type = calculateType();
    const result = angelTypes[type];
    
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    // Display type and angel
    document.getElementById('type-result').textContent = type;
    document.getElementById('angel-name').textContent = result.name;
    document.getElementById('angel-description').textContent = result.description;
    
    // Display dimension breakdowns
    document.getElementById('ei-result').textContent = 
        `${calculateDimensionStrength('E', 'I')}% E - ${calculateDimensionStrength('I', 'E')}% I`;
    document.getElementById('sn-result').textContent = 
        `${calculateDimensionStrength('S', 'N')}% S - ${calculateDimensionStrength('N', 'S')}% N`;
    document.getElementById('ft-result').textContent = 
        `${calculateDimensionStrength('F', 'T')}% F - ${calculateDimensionStrength('T', 'F')}% T`;
    document.getElementById('jp-result').textContent = 
        `${calculateDimensionStrength('J', 'P')}% J - ${calculateDimensionStrength('P', 'J')}% P`;
}

// Initialize restart button
document.getElementById('restart-btn').addEventListener('click', initializeTest);

// Start the test when page loads
document.addEventListener('DOMContentLoaded', initializeTest);