const Card_Option = document.getElementById('card-option')
const CardPayment = document.querySelector('.CardPayment')

Card_Option.addEventListener('change', () =>{
    if(Card_Option.checked){
        CardPayment.style.display ='block';
    }
    else {
        CardPayment.style.display ='none';
    }
});

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
        alert("cash on delivery. Items will be delivered to your location soon");
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
    alert('Successfully charged your account.');
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