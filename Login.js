function toggleForm(TypeForm){
    const profile = document.getElementById('ProfView');
    const dropDown = document.querySelector('.Dropdown');

    if (TypeForm === 'profile'){;
        profile.style.display = 'block';
        dropDown.classList.toggle('open', false); 
    }
    else if(TypeForm === 'exit'){;
        profile.style.display = 'none';
    }
}

const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDown = document.querySelector('.Dropdown')

toggleBtn.onclick =  function(){
    dropDown.classList.toggle('open');
}
