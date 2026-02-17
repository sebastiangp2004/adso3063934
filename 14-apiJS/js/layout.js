const views = document.querySelectorAll("main");
let currentView = 0; //[0-4]

// buttons & anchors
const btnLogin = document.querySelector(".btnLogin");
const btnAdd = document.querySelector(".btnAdd");
const btnLogout = document.querySelector(".btnLogout");
const btnShow = document.querySelectorAll(".btnShow");
const btnEdit = document.querySelectorAll(".btnEdit");
const btnBack = document.querySelectorAll(".btnBack")
const btnCancel = document.querySelectorAll(".btnCancel");

btnCancel.forEach(btn => {
    btn.addEventListener("click", () => {
        currentView = 1;
        showView();
    })
})

btnBack.forEach(btn => {
    btn.addEventListener("click", () => {
        currentView = 1;
        showView();
    })
})

btnAdd.addEventListener("click", () => {
    currentView = 2;
    showView();
})

btnLogout.addEventListener("click", () => {
    currentView = 0;
    showView();
})

btnShow.forEach(btn => {
    btn.addEventListener("click", () => {
        currentView = 4;
        showView();
    })
})

btnEdit.forEach(btn => {
    btn.addEventListener("click", () => {
        currentView = 3;
        showView();
    })
})

btnLogin.addEventListener("click", () => {
    currentView = 1;
    showView();
})

function showView(){
    views.forEach(element => {
        element.style.display = "none";
    })
    views[currentView].style.display = "block";
}

function showView(){
    views.forEach(element => {
        element.classList.remove = ('animateView')
        element.style.display = 'none'
    });
    views[currentView].classList.add = ('animateView')
    views[currentView].style.display = 'block' 
}
showView();