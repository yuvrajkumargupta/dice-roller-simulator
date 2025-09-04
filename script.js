const rollBtn = document.querySelector('.fancy-btn');
const diceEle = document.getElementById('dice');
const historyList = document.getElementById('roll-history');

// All dice faces
const diceFaces = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;'];
let rollCount = 0;

// Function to roll the dice
function rollDice() {
    const randomIndex = Math.floor(Math.random() * 6);
    const diceFace = diceFaces[randomIndex];
    return {
        face: diceFace,
        value: randomIndex + 1
    };
}

// Function to update history
function updateHistory(result) {
    rollCount++;
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `Roll ${rollCount}: <span>${result.face}</span>`;
    historyList.prepend(historyItem);
    
    // Keep only last 5 rolls in history
    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Roll button click handler
rollBtn.addEventListener("click", () => {
    // Disable button during animation
    rollBtn.disabled = true;
    
    // Add animation class
    diceEle.classList.add('roll-animation');
    
    // After animation completes
    setTimeout(() => {
        diceEle.classList.remove('roll-animation');
        const result = rollDice();
        diceEle.innerHTML = result.face;
        updateHistory(result);
        rollBtn.disabled = false;
    }, 1000);
});

// Also allow dice to be clicked
diceEle.addEventListener("click", () => {
    if (!rollBtn.disabled) {
        rollBtn.click();
    }
});

// Initialize with empty history message
const emptyMsg = document.createElement('div');
emptyMsg.className = 'empty-history';
emptyMsg.textContent = 'No rolls yet. Click the button to start!';
historyList.appendChild(emptyMsg);

// Remove empty message when first roll happens
historyList.addEventListener('DOMNodeInserted', (e) => {
    if (e.target === historyList && historyList.children.length > 1) {
        const emptyMsg = document.querySelector('.empty-history');
        if (emptyMsg) {
            historyList.removeChild(emptyMsg);
        }
    }
});