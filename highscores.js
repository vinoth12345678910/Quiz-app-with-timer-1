// DOM Element
const highScoresList = document.getElementById('highScoresList');

// Retrieve high scores from localStorage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Display the high scores
highScoresList.innerHTML = highScores
    .map(score => {
        return `<li>${score.name} - ${score.score}</li>`;
    })
    .join('');
