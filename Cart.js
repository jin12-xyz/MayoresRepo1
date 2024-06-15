let carts = document.querySelectorAll('.add-cart');
/*Local Storage */
let products = [
{
    Name: "Adjapas",
    tag:"shoe5A",
    price: 70,
    inCart:0
},
{
    Name: "Geng-geng",
    tag:"shoe6A",
    price: 50,
    inCart:0
},
{
    Name: "SPARTA",
    tag:"shoe7A",
    price: 90,
    inCart:0
},
{
    Name: "Sheesh",
    tag:"shoe8A",
    price: 85,
    inCart:0
},
{
    Name: "Nikee",
    tag:"shoe1",
    price: 99,
    inCart:0
},
{
    Name: "xxx nike",
    tag:"shoe2",
    price: 45,
    inCart:0
},
{
    Name: "villabong",
    tag:"shoe3",
    price: 65,
    inCart:0
},
{
    Name: "Nikee Immortal",
    tag:"shoe4",
    price: 45,
    inCart:0
},
{
    Name: "Hana Shoe",
    tag:"Wshoe1A",
    price: 70,
    inCart:0
},
{
    Name: "Rainbow",
    tag:"Wshoe2A",
    price: 50,
    inCart:0
},
{
    Name: "Athena",
    tag:"Wshoe3A",
    price: 85,
    inCart:0
},
{
    Name: "Roses Sprint",
    tag:"Wshoe4A",
    price: 75,
    inCart:0
},
{
    Name: "Lilly",
    tag:"Wshoe5A",
    price: 35,
    inCart:0
},
{
    Name: "Sky hype",
    tag:"Wshoe6A",
    price: 60,
    inCart:0
},
{
    Name: "Crazy Shoe",
    tag:"Wshoe6A",
    price: 65,
    inCart:0
},
{
    Name: "Ms Slider",
    tag:"Wshoe6A",
    price: 69,
    inCart:0
},

];
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        let productIndex;
        if(window.location.pathname.includes("Women.html")) {
            productIndex = 8 + i; 
        } else {
            productIndex = i; 
        }
        cartNumbers(products[productIndex]);
    })
}

function CartLoad(){
    let NumberOfProducts = localStorage.getItem('cartNumbers');

    if(NumberOfProducts){
        document.querySelector('.Cart span').textContent = NumberOfProducts;
    }
}
function cartNumbers(product){
  
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    

    if (cartItems && cartItems[product.Name]) {
        alert('This item is already in your cart.');
    } else {
        productNumbers = productNumbers ? productNumbers + 1 : 1;
        localStorage.setItem('cartNumbers', productNumbers);
        document.querySelector('.Cart span').textContent = productNumbers;
        setItems(product);
        totalCost(product);
        parent.location.reload();
    }
    refreshIframe();
    
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    
    if(cartItems != null){

        if(cartItems[product.Name] == undefined){
            cartItems = {
                ...cartItems,
                [product.Name]: product
            }
        }
        cartItems[product.Name].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.Name]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
    
}

function totalCost(product){
    let cartCost = localStorage.getItem("totalCost");

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else{
        localStorage.setItem("totalCost", product.price);
    }
  
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
  
    if(cartItems && productContainer ){
        productContainer.innerHTML ='';
        Object.values(cartItems).map((item, index) => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon class="removeItem" name="close-circle-outline" data-id="${index}"></ion-icon>
            <img src="./shopping/${item.tag}.png">
            <span>${item.Name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity"> 
                <ion-icon class="decreaseQuantity" name="caret-back-outline" data-id="${index}"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increaseQuantity" name="caret-forward-outline" data-id="${index}"></ion-icon>
            </div>
            <div class="total">
            $${item.inCart * item.price}
            </div>
            `;
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total </h4>
        <h4 class="basketTotal">
        $${cartCost},00
        </h4>
        </div>`;
        setupEventListeners();
    }
    
}
function setupEventListeners() {
    let removeButtons = document.querySelectorAll('.removeItem');
    let decreaseButtons = document.querySelectorAll('.decreaseQuantity');
    let increaseButtons = document.querySelectorAll('.increaseQuantity');

    removeButtons.forEach(button => {
        button.addEventListener('click', removeItem);
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
}

function removeItem(event) {
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let cartNumber = parseInt(localStorage.getItem("cartNumbers"));
    let totalCost = parseInt(localStorage.getItem("totalCost"));
    let productIndex = event.target.dataset.id;
    let productName = Object.keys(cartItems)[productIndex];
    let productRemoved = cartItems[productName];

  
    if (cartNumber > 0 && totalCost >= productRemoved.price * productRemoved.inCart) {
        cartNumber -= productRemoved.inCart;
        totalCost -= productRemoved.price * productRemoved.inCart;
    }
    productRemoved.inCart = 0;
    delete cartItems[productName];

    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    localStorage.setItem("cartNumbers", cartNumber.toString());
    localStorage.setItem("totalCost", totalCost.toString());

    parent.postMessage({ type: 'updateCartCount', cartCount: cartNumber }, "*");
    
    displayCart();
    CartLoad();
    refreshIframe();
}
function decreaseQuantity(event) {
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let cartNumber = parseInt(localStorage.getItem("cartNumbers"));
    let totalCost = parseInt(localStorage.getItem("totalCost"));
    let productIndex = event.target.dataset.id;
    let productName = Object.keys(cartItems)[productIndex];
    let product = cartItems[productName];

    if (product.inCart > 1) {
        product.inCart -= 1;
        cartNumber -= 1;
        totalCost -= product.price;
    }

  
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    localStorage.setItem("cartNumbers", cartNumber.toString());
    localStorage.setItem("totalCost", totalCost.toString());

   
    document.querySelector('.Cart span').textContent = cartNumber;
    displayCart();
}

function increaseQuantity(event) {
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let cartNumber = parseInt(localStorage.getItem("cartNumbers"));
    let totalCost = parseInt(localStorage.getItem("totalCost"));
    let productIndex = event.target.dataset.id;
    let productName = Object.keys(cartItems)[productIndex];
    let product = cartItems[productName];

    if (product.inCart >= 1) {
        product.inCart += 1;
        cartNumber += 1;
        totalCost += product.price;
    }

    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    localStorage.setItem("cartNumbers", cartNumber.toString());
    localStorage.setItem("totalCost", totalCost.toString());

    
    document.querySelector('.Cart span').textContent = cartNumber;
    displayCart();
}

displayCart();
CartLoad();
refreshIframe();
if (document.querySelector('.Cart span')) {
    window.addEventListener('message', function(event) {
        
        if (event.data.type === 'updateCartCount') {
            document.querySelector('.Cart span').textContent = event.data.cartCount;
        }
    }, false);
}
/* Cart Span Value */
if (document.querySelector('.Cart span')) {
    window.addEventListener('storage', function(event) {
        if (event.key === 'cartNumbers') {
            document.querySelector('.Cart span').textContent = event.newValue;
        }
    }, false);
}
/*toggle for side panel */
document.querySelector(".side-panel-toggle").addEventListener("click", () => {
    document.querySelector(".MainBody").classList.toggle("side-panel-open");
  });

function refreshIframe() {
    let iframe = document.querySelector(".cart-frame");
    iframe.contentWindow.location.reload();
}
