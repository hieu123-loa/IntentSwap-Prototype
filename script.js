// Đợi cho đến khi toàn bộ nội dung HTML được tải xong
document.addEventListener('DOMContentLoaded', () => {

// Lấy các phần tử cần thiết từ DOM
const intentInput = document.getElementById('intentInput');
const executeButton = document.getElementById('executeButton');
const resultDisplay = document.getElementById('resultDisplay');

// Mảng mô phỏng các kết quả có thể có
const possibleResults = [
"Hoán đổi ETH lấy USDC với giá tốt nhất, sử dụng nhiều DEX để tối ưu.",
"Dùng USDC để mua NFT X trên OpenSea sau khi hoán đổi.",
"Chuyển ETH từ chuỗi Ethereum sang Polygon và hoán đổi nó lấy MATIC.",
"Không thể thực hiện ý định này. Vui lòng thử lại."
];

// Xử lý sự kiện khi nút "Execute Intent" được click
executeButton.addEventListener('click', () => {
const userIntent = intentInput.value.trim();

// Kiểm tra nếu ô input rỗng
if (userIntent === "") {
resultDisplay.innerHTML = '<p class="error">Vui lòng nhập ý định của bạn.</p>';
return;
}

// Tạo hiệu ứng loading
resultDisplay.innerHTML = '<p class="loading">Đang tìm kiếm giải pháp...</p>';

// Mô phỏng quá trình xử lý intent (có thể mất vài giây)
setTimeout(() => {
// Chọn một kết quả ngẫu nhiên để mô phỏng sự đa dạng của mạng lưới solvers
const randomIndex = Math.floor(Math.random() * possibleResults.length);
const chosenResult = possibleResults[randomIndex];

// Hiển thị kết quả cho người dùng
if (chosenResult.includes("Không thể")) {
resultDisplay.innerHTML = `<p class="error">${chosenResult}</p>`;
} else {
resultDisplay.innerHTML = `
<p class="success"><strong>✅ Ý định đã được thực hiện!</strong></p>
<p><strong>Ý định của bạn:</strong> "${userIntent}"</p>
<p><strong>Giải pháp được tìm thấy:</strong> ${chosenResult}</p>
`;
}

}, 2000); // Giả lập thời gian xử lý 2 giây
});
});
