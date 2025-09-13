document.addEventListener('DOMContentLoaded', () => {

// Get the necessary elements from the DOM
const intentInput = document.getElementById('intentInput');
const executeButton = document.getElementById('executeButton');
const resultDisplay = document.getElementById('resultDisplay');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');

// Array to store interaction history
const history = [];

// Mock exchange rates and token data
const rates = {
'ETH_USDC': 2500,
'USDC_ETH': 1 / 2500,
'SHIB_USDC': 1 / 100,
'USDC_SHIB': 100,
'SHIB_ETH': 1 / 250000,
'ETH_SHIB': 250000
};

// Function to handle the intent execution logic
function executeIntent() {
const userIntent = intentInput.value.trim();
const lowerCaseIntent = userIntent.toLowerCase();

// Clear the input field after getting the value
intentInput.value = '';

// Check if the input field is empty
if (lowerCaseIntent === "") {
resultDisplay.innerHTML = '<p class="error">Please enter your intent.</p>';
return;
}

// Create a loading effect and simulate the intent processing
resultDisplay.innerHTML = '<p class="loading">Searching for a suitable solution for your intent...</p>';

setTimeout(() => {
let resultMessage = '';
let solutionFound = false;

// Simple intent parsing logic
const match = lowerCaseIntent.match(/(buy|sell|swap|trade)\s+([\d.]+)\s*(\w+)\s*(for|using|with)\s*(\w+)/);

if (match) {
const action = match[1];
const amount = parseFloat(match[2]);
const tokenFrom = match[5].toUpperCase();
const tokenTo = match[3].toUpperCase();

// Construct the rate key
const rateKey = `${tokenFrom}_${tokenTo}`;

let finalTokenFrom = tokenFrom;
let finalTokenTo = tokenTo;
let finalAmount = amount;

// Adjust for 'buy' intent to match rate key format
if (action === 'buy') {
finalTokenFrom = tokenTo;
finalTokenTo = tokenFrom;
}

const rate = rates[`${finalTokenFrom}_${finalTokenTo}`];

if (rate) {
const receivedAmount = finalAmount * rate;
solutionFound = true;
resultMessage = `
<p class="success"><strong>✅ Intent successfully resolved!</strong></p>
<p><strong>Your Intent:</strong> "${userIntent}"</p>
<p><strong>Proposed Solution:</strong> Swap ${finalAmount.toFixed(4)} ${finalTokenFrom} to receive ${receivedAmount.toFixed(4)} ${finalTokenTo}.</p>
<p>Rate: 1 ${finalTokenFrom} = ${rate} ${finalTokenTo}.</p>
`;
}
}

// Fallback for general or unrecognized intents
if (!solutionFound) {
if (lowerCaseIntent.includes('shrimp') || lowerCaseIntent.includes('shrimpers')) {
resultMessage = `<p class="error">Sorry, we do not support Shrimp NFT swaps. Please try again with popular tokens like ETH, USDC, or SHIB.</p>`;
} else {
resultMessage = `<p class="error">No suitable solution found for your intent. Please try again with the format: "buy [amount] [tokenA] with [tokenB]".</p>`;
}
}

// Display the result on the page
resultDisplay.innerHTML = resultMessage;

// Add the new interaction to the history array and update the display
history.push({
intent: userIntent,
result: resultMessage,
timestamp: new Date().toLocaleString('en-US')
});
updateHistoryDisplay();

}, 2000); // Simulate a 2-second processing time
}

// Function to update the history display on the page
function updateHistoryDisplay() {
historyList.innerHTML = ''; // Clear the current list
if (history.length === 0) {
historyList.innerHTML = '<li class="no-history">No transactions have been executed yet.</li>';
return;
}

history.forEach(item => {
const historyItem = document.createElement('li');
historyItem.classList.add('history-item');
historyItem.innerHTML = `
<div class="history-item-header">
<span class="history-timestamp">${item.timestamp}</span>
</div>
<p class="history-intent"><strong>Intent:</strong> "${item.intent}"</p>
<div class="history-result-content">${item.result}</div>
`;
historyList.prepend(historyItem); // Add new items to the top
});
}

// Event Listeners
executeButton.addEventListener('click', executeIntent);

intentInput.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
executeIntent();
}
});

clearHistoryButton.addEventListener('click', () => {
history.length = 0; // Clear the history array
updateHistoryDisplay(); // Update the display
});
});








