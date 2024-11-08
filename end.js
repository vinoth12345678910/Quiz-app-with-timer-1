// DOM Elements
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScoreElement = document.getElementById('finalScore');

// Retrieve the most recent score from localStorage
const mostRecentScore = localStorage.getItem('mostRecentScore') || 0;

// Update the final score display
finalScoreElement.innerText = mostRecentScore;

// Retrieve high scores from localStorage or create an empty array if none exist
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Maximum number of high scores to display
const MAX_HIGH_SCORES = 5;

// Enable the save button only when the user enters a name
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value.trim(); // Disable if the input is empty
});

// Save the score to localStorage when the "Save Score" button is clicked
saveScoreBtn.addEventListener('click', saveHighScore);

function saveHighScore() {
    const score = {
        score: mostRecentScore,
        name: username.value.trim()
    };

    // Add the new score to the high scores array
    highScores.push(score);

    // Sort high scores in descending order (highest score first)
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top MAX_HIGH_SCORES
    highScores.splice(MAX_HIGH_SCORES);

    // Save updated high scores to localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Redirect to the high scores page after saving
    window.location.assign('/highscores.html');
}
