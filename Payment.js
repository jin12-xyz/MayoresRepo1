const Card_Option = document.getElementById('card-option');
const CardPayment = document.querySelector('.CardPayment');
const Cash_Option = document.getElementById('cash-option');

function updateCardPaymentDisplay() {
    if (Card_Option.checked) {
        CardPayment.style.display = 'block';
    } else {
        CardPayment.style.display = 'none';
    }
}

Card_Option.addEventListener('change', updateCardPaymentDisplay);
Cash_Option.addEventListener('change', updateCardPaymentDisplay);

function validateCardNumber() {
    const cardNumberInput = document.getElementById('card_no');
    const cardNumber = cardNumberInput.value.trim(); 

  
    const pattern = /^\d{3}-\d{3}-\d{3}$/;

    if (pattern.test(cardNumber)) {
        const isValidCardNumber = true;
        updatePayNowButton(isValidCardNumber);
        
    } else {
        alert('Invalid card number. Please enter a valid 12-digit number in the format "000-000-000".');
    }
}

function validateCardExpiration() {
    const cardExpirationInput = document.getElementById('card_xp');
    const cardExpiration = cardExpirationInput.value.trim();

    const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!pattern.test(cardExpiration)) {
        alert('Invalid card expiration. Please enter a valid month/year (e.g., 05/23).');
    }
    else{
        const isValidExpiration = true;
        updatePayNowButton(isValidExpiration);
    }
}
function updatePayNowButton(isValid) {
    const payNowButton = document.getElementById('payNowButton');
    payNowButton.disabled = !isValid;
}


function CashOpt(){
    const CashOption = document.getElementById('cash-option');
    if(CashOption.checked){
        alert("cash on delivery successfull!\n Please prepare exact amount upon delivery. \n Thank you!");
        localStorage.removeItem("productsInCart");
        localStorage.removeItem("cartNumbers");
        localStorage.removeItem("totalCost");
        window.parent.location.href = "DashboardMen.html";
    }
    else{
        alert('invalid payment option');
        
    }
}

function handlePayment() {
    alert('Transaction Completed. \n Thank your for purchasing!');
    localStorage.removeItem("productsInCart");
    localStorage.removeItem("cartNumbers");
    localStorage.removeItem("totalCost");
    window.parent.location.href = "DashboardMen.html";
}
function TotalAmount(){
    let mytotal = localStorage.getItem("totalCost")
    document.getElementById('topay').innerHTML = mytotal;
}

function Close(){
    window.parent.location.href = "DashboardMen.html";
}
TotalAmount()