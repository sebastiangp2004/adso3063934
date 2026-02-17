const views = document.querySelectorAll("main");
//Current view
if(localStorage.getItem('currentView') != null){

} else{
    localStorage.setItem('currentView', 0)
}

// buttons & anchors
// const btnLogin = document.querySelector(".btnLogin");
// const btnAdd = document.querySelector(".btnAdd");
const btnLogout = document.querySelector(".btnLogout");
// const btnShow = document.querySelectorAll(".btnShow");
// const btnEdit = document.querySelectorAll(".btnEdit");
// const btnBack = document.querySelectorAll(".btnBack")
// const btnCancel = document.querySelectorAll(".btnCancel");

//LoginForm(POST)
const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault()
    try {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json()
        if (response.ok) {
            swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: data.message,
                showConfirmButton: false,
                timer: 500
            });
            localStorage.setItem('auth-token', data.token)
            localStorage.setItem('currentView', 1)
            currentView = 1
            showView();
        } else {
            swal.fire({
                icon: 'error',
                title: 'whatch out!',
                text: data.message,
                showConfirmButton: false,
                timer: 500
            });
            localStorage.setItem('auth-token', data.token)
            localStorage.setItem('currentView', 0)
            currentView = 0
            showView();
        }
    } catch (error) {
        console.error("Error:", error)
    }
})
// btnCancel.forEach(btn => {
//     btn.addEventListener("click", () => {
//         currentView = 1;
//         showView();
//     })
// })

// btnBack.forEach(btn => {
//     btn.addEventListener("click", () => {
//         currentView = 1;
//         showView();
//     })
// })

// btnAdd.addEventListener("click", () => {
//     currentView = 2;
//     showView();
// })

btnLogout.addEventListener("click", () => {
    localStorage.removeItem('auth-token'),
    localStorage.setItem('currentView', 0) 
    showView();
})

// btnShow.forEach(btn => {
//     btn.addEventListener("click", () => {
//         currentView = 4;
//         showView();
//     })
// })

// btnEdit.forEach(btn => {
//     btn.addEventListener("click", () => {
//         currentView = 3;
//         showView();
//     })
// })

// btnLogin.addEventListener("click", () => {
//     currentView = 1;
//     showView();
// })

// function showView(){
//     views.forEach(element => {
//         element.style.display = "none";
//     })
//     views[currentView].style.display = "block";
// }

 function showView(){
   views.forEach(element => {
         element.classList.remove = ('animateView')
         element.style.display = 'none'
     });
    views[localStorage.getItem('currentView')].classList.add('animateView')
    views[localStorage.getItem('currentView')].style.display = 'block' 
}
showView();