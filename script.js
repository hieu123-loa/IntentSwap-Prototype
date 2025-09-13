document.addEventListener('DOMContentLoaded', () => {

// Get the necessary elements from the DOM
const connectButton = document.getElementById('connectButton');
const walletInfo = document.getElementById('walletInfo');
const walletAddressEl = document.getElementById('walletAddress');
const walletBalanceEl = document.getElementById('walletBalance');
const intentInput = document.getElementById('intentInput');
const executeButton = document.getElementById('executeButton');
const resultDisplay = document.getElementById('resultDisplay');
const historyList = document.getElementById('historyList');

// Mock blockchain data
const mockWallet = {
address: '0x1234...abcd',
balance: '10.5 ETH'
};

// Mock exchange rates and token data
const rates = {
'ETH_USDC': 2500,
'USDC_ETH': 1 / 2500,
'SHIB_USDC': 1 / 100,
'USDC_SHIB': 100,
'SHIB_ETH': 1 / 250000,
'ETH_SHIB': 250000
};

// Array to store transaction history
const transactionHistory = [];

// Function to connect the wallet (mock)
function connectWallet() {
console.log("Attempting to connect to wallet...");
connectButton.disabled = true;
connectButton.textContent = 'Connecting...';

setTimeout(() => {
// Simulate a successful connection
const shortAddress = mockWallet.address.substring(0, 6) + '...' + mockWallet.address.substring(mockWallet.address.length - 4);
walletAddressEl.textContent = shortAddress;
walletBalanceEl.textContent = mockWallet.balance;

walletInfo.style.display = 'block';
connectButton.style.display = 'none';
executeButton.style.display = 'block';

console.log("Wallet connected successfully!");
}, 1500);
}

// Function to execute the intent
function executeIntent() {
const userIntent = intentInput.value.trim();
const lowerCaseIntent = userIntent.toLowerCase();

// Clear the input field
intentInput.value = '';

if (lowerCaseIntent === "") {
resultDisplay.innerHTML = '<p class="error">Please enter your intent.</p>';
return;
}

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

let finalTokenFrom = tokenFrom;
let finalTokenTo = tokenTo;
let finalAmount = amount;

if (action === 'buy') {
finalTokenFrom = tokenTo;
finalTokenTo = tokenFrom;
}

const rate = rates[`${finalTokenFrom}_${finalTokenTo}`];

if (rate) {
const receivedAmount = finalAmount * rate;
solutionFound = true;
resultMessage = `
<div class="success">
<p><strong>✅ Intent successfully resolved!</strong></p>
<p><strong>Your Intent:</strong> "${userIntent}"</p>
<p><strong>Proposed Solution:</strong> Swap ${finalAmount.toFixed(4)} ${finalTokenFrom} to receive ${receivedAmount.toFixed(4)} ${finalTokenTo}.</p>
<p>Rate: 1 ${finalTokenFrom} = ${rate} ${finalTokenTo}.</p>
</div>
`;
// Add to transaction history
transactionHistory.push({
id: transactionHistory.length + 1,
type: 'swap',
intent: userIntent,
solution: `Swapped ${finalAmount.toFixed(4)} ${finalTokenFrom} for ${receivedAmount.toFixed(4)} ${finalTokenTo}`,
status: 'Success',
timestamp: new Date().toLocaleTimeString()
});
}
}

if (!solutionFound) {
resultMessage = `<div class="error"><p>No suitable solution found for your intent. Please try again with the format: "buy [amount] [tokenA] with [tokenB]".</p></div>`;
transactionHistory.push({
id: transactionHistory.length + 1,
type: 'intent',
intent: userIntent,
solution: 'No solution found',
status: 'Failed',
timestamp: new Date().toLocaleTimeString()
});
}

resultDisplay.innerHTML = resultMessage;
updateTransactionHistoryDisplay();

}, 2000);
}

// Function to update the transaction history display
function updateTransactionHistoryDisplay() {
historyList.innerHTML = '';
if (transactionHistory.length === 0) {
historyList.innerHTML = '<p style="text-align:center; color:#999;">No transactions yet.</p>';
return;
}
transactionHistory.forEach(tx => {
const li = document.createElement('li');
li.className = 'history-item';
li.innerHTML = `
<p><strong>Intent:</strong> ${tx.intent}</p>
<p><strong>Solution:</strong> ${tx.solution}</p>
<p><strong>Status:</strong> ${tx.status}</p>
<small><em>${tx.timestamp}</em></small>
`;
historyList.prepend(li);
});
}

// Event Listeners
connectButton.addEventListener('click', connectWallet);
executeButton.addEventListener('click', executeIntent);

intentInput.addEventListener('keydown', (event) => {
if (event.key === 'Enter') {
executeIntent();
}
});

});








