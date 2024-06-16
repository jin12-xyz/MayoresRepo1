
function login(username, password) {
   
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
}

// ToggleForm function
function toggleForm(TypeForm){
    const logForm = document.getElementById('Log_form');
    const regForm = document.getElementById('Reg_form');
    const profile = document.getElementById('ProfView');
    const dropDown = document.querySelector('.Dropdown');

    if(TypeForm === 'login'){
        logForm.style.display = 'block';
        regForm.style.display = 'none';
        profile.style.display = 'none';
        dropDown.classList.toggle('open', false); 
    }
    else if(TypeForm === 'register'){
        regForm.style.display ='block';
        logForm.style.display = 'none';
        profile.style.display = 'none';
        dropDown.classList.toggle('open', false); 
    }
    else if (TypeForm === 'profile'){
        regForm.style.display ='none';
        logForm.style.display = 'none';
        profile.style.display = 'block';
        dropDown.classList.toggle('open', false); 
    }
    else if(TypeForm === 'exit'){
        logForm.style.display = 'none';
        regForm.style.display = 'none';
        profile.style.display = 'none';
    }
}

// Add event listener to toggle button
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDown = document.querySelector('.Dropdown');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        dropDown.classList.toggle('open');
    })
}

// Add event listener to registration form
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Reg_form").addEventListener("submit", (e) => {
        e.preventDefault();
        const Fname = document.getElementById("regName").value;
        const address = document.getElementById("regAddress").value;
        const username = document.getElementById("regUname").value;
        const password = document.getElementById("regPass").value;

        // Validate input fields
        if (Fname === "" || address === "" || username === "" || password === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Store user data in local storage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("name", Fname);
        localStorage.setItem("address", address);

        // Log in user
        login(username, password);
        
        // Notify the user of successful registration
        alert("Registration successful!");
    });
});

// Add event listener to login form
document.addEventListener('DOMContentLoaded', function() {
document.getElementById("Log_form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("logUsername").value;
    const password = document.getElementById("logPword").value;

    // Check if username and password match stored data
    if (localStorage.getItem("username") === username && localStorage.getItem("password") === password) {
        // Log in user
        login(username, password);
        
        // Notify the user of successful log in
        alert("Login successful!");
        
        // Redirect the user to Home3.html
        window.parent.location.href = "DashboardMen.html";
    } else {
        alert("Invalid username or password.");
    }
});

});

function displayProfile() {
    // Retrieve user data from local storage
    const name = localStorage.getItem("name");
    const username = localStorage.getItem("username");
    const address = localStorage.getItem("address");

    // Get the HTML elements by their IDs
    let UserFname = document.getElementById('name');
    let UserUsername = document.getElementById('username');
    let UserAddress = document.getElementById('Address');

    // Set the innerHTML of the elements to the retrieved values
    UserFname.innerHTML = "NAME: " + name;
    UserUsername.innerHTML = "USERNAME: " + username;
    UserAddress.innerHTML = "ADDRESS: " + address;
}
document.addEventListener('DOMContentLoaded', displayProfile);

//logout button
function logoutFunction() {
    alert("Logout successful!");
    window.parent.location.href = "index.html";
}

//hide logout button
window.addEventListener('DOMContentLoaded', (event) => {
    if(window.parent.location.href.includes('index.html')) {
        document.getElementById('logoutBTN').style.display = 'none';
    }
});