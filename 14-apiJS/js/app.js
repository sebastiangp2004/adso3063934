const views = document.querySelectorAll("main");
//Current view
if (localStorage.getItem('currentView') != null) {

} else {
    localStorage.setItem('currentView', 0)
}

// buttons & anchors

const btnAdd = document.querySelector(".btnAdd");
const btnLogout = document.querySelector(".btnLogout");
const btnEdit = document.querySelectorAll(".btnEdit");
const btnBack = document.querySelectorAll(".btnBack")
const btnCancel = document.querySelectorAll(".btnCancel");

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
                timer: 1500
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

// Contenedor donde se cargarán las mascotas
// http://127.0.0.1:8000/api/pets/list
const listContainer = document.querySelector(".list");

async function listPets() {
    const token = localStorage.getItem("auth-token");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/pets/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}` // Importante: Enviamos el token
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Limpiamos el contenedor antes de agregar las nuevas
            listContainer.innerHTML = "";

            // Recorremos el arreglo de mascotas que viene en data.pets (según tu captura de pantalla)
            data.pets.forEach(pet => {
                listContainer.innerHTML += ` 
                    <div class="row">
                        <img class="img" src="images/${pet.image}" alt="${pet.name}">
                        <div class="data">
                            <h3>${pet.name}</h3>
                            <h4>${pet.kind}</h4>
                        </div>
                        <nav class="actions">
                        <button type="button" class="btnShow" data-id="${pet.id}">
                        <img src="imgs/eye.svg" alt="">
                    </button>
                    <button type="button" class="btnEdit" data-id="${pet.id}">
                        <img src="imgs/pencil.svg" alt="">
                    </button>
                    <button type="button" class="btnDelete" data-id="${pet.id}">
                        <img src="imgs/trash.svg" alt="">
                    </button>
                        </nav>
                    </div>
                `;
            });
        } else {
            console.error("Error al obtener mascotas:", data.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}


// View (Show Pet)
const petDetailContainer = document.querySelector("#Detail .data");

async function showPetDetail(id) {
    const token = localStorage.getItem("auth-token");

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            const pet = data.pet; // Suponiendo que la API devuelve { "pet": {...} }

            // Inyectamos los datos en el HTML de la vista show_pet
            petDetailContainer.innerHTML = `
                 <h2 id="nameDetail">${pet.name}</h2>
            <div class="imageContainer">
                <img src="images/${pet.image}" alt="${pet.name}">
            </div>
            <div class="info">
                
                <p><strong>Kind:</strong> <span id="kindDetail">${pet.kind}</span></p>
                <p><strong>Weight:</strong> <span id="weightDetail">${pet.weight}</span> KG</p>
                <p><strong>Age:</strong> <span id="ageDetail">${pet.age}</span> Y/O</p>
                <p><strong>Breed:</strong> <span id="breedDetail">${pet.breed}</span></p>
                <p><strong>Location:</strong> <span id="locationDetail">${pet.location}</span></p>
                <p><strong>Description:</strong> <span id="descriptionDetail">${pet.description}</span></p>
            </div> 
            `;
        }
    } catch (error) {
        console.error("Error al cargar detalle:", error);
    }
}

// View (Edit Pet)
const btnSaveEdit = document.querySelector(".btnEdit");
const editPetForm = document.querySelector("#Edit form");
async function loadPetDataToEdit(id) {
    const token = localStorage.getItem("auth-token");
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
        });
        const data = await response.json();
        if (response.ok) {
            const pet = data.pet;
            // Llenamos cada campo del formulario de edición
            editPetForm.name.value = pet.name;
            editPetForm.kind.value = pet.kind;
            editPetForm.weight.value = pet.weight;
            editPetForm.age.value = pet.age;
            editPetForm.breed.value = pet.breed;
            editPetForm.location.value = pet.location;
            editPetForm.description.value = pet.description;
        }
    } catch (error) {
        console.error("Error loading pet data:", error);
    }
}

btnSaveEdit.addEventListener("click", async () => {
    const token = localStorage.getItem("auth-token");
    const id = localStorage.getItem("editPetId"); // Recuperamos el ID que guardamos antes

    const formData = new FormData(editPetForm);
    const dataToSend = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            Swal.fire({
                title: "Updated!",
                text: "The pet information has been updated.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            localStorage.setItem('currentView', 1); // Regresamos a la lista
            showView();
        } else {
            const result = await response.json();
            Swal.fire("Error", result.message || "Update failed", "error");
        }
    } catch (error) {
        console.error("Connection error:", error);
        Swal.fire("Error", "Server connection failed", "error");
    }
});

// View (Delete Pet)
async function deletePet(id) {
    const token = localStorage.getItem("auth-token");

    // Preguntar al usuario antes de borrar
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/pets/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                Swal.fire("Deleted!", "The pet has been removed.", "success");
                listPets(); // Recargamos la lista para que desaparezca la fila
            } else {
                Swal.fire("Error", "Could not delete the pet", "error");
            }
        } catch (error) {
            console.error("Connection error:", error);
            Swal.fire("Error", "Server connection failed", "error");
        }
    }
}

// View (Add Pet)
const btnSaveAdd = document.querySelector(".Add");
const addPetForm = document.querySelector("#Add form");
btnSaveAdd.addEventListener("click", async () => {
    const token = localStorage.getItem("auth-token");

    // 1. Capturamos los datos del formulario
    const formData = new FormData(addPetForm);
    // Convertimos los datos a un objeto simple { name: "valor", kind: "valor"... }
    const dataToSend = Object.fromEntries(formData.entries());

    // Validación simple: verificar que el nombre no esté vacío
    if (!dataToSend.name) {
        Swal.fire("Error", "Please enter at least the pet's name", "error");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/pets/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataToSend)
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                title: "Success!",
                text: "Pet added correctly",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            addPetForm.reset(); // Limpia los campos del formulario
            localStorage.setItem('currentView', 1); // Indicamos que vamos a la lista
            showView(); // Cambiamos la vista
        } else {
            Swal.fire("Error", result.message || "Could not save the pet", "error");
        }
    } catch (error) {
        console.error("Connection error:", error);
        Swal.fire("Error", "Server connection failed", "error");
    }
});


// IMPORTANTE: Verifica que listContainer exista antes de ponerle el listener
if (listContainer) {
    listContainer.addEventListener("click", (e) => {
        // Buscamos si el click fue en un botón usando 'closest' por si haces click en un icono dentro del link
        const btnDelete = e.target.closest(".btnDelete");
        const btnEdit = e.target.closest(".btnEdit");
        const btnShow = e.target.closest(".btnShow");

        if (btnDelete) {
            const id = btnDelete.getAttribute("data-id");
            deletePet(id);
        }

        if (btnEdit) {
            const id = btnEdit.getAttribute("data-id");
            // Guardamos el ID en localStorage para saber a quién estamos editando luego
            localStorage.setItem('editPetId', id);

            // Llamamos a una función para llenar el formulario
            loadPetDataToEdit(id);

            localStorage.setItem('currentView', 3);
            showView();
        }
        if (btnShow) {
            const id = btnShow.getAttribute("data-id");

            // 1. Cargamos los datos primero
            // Guardamos el id de la última mascota vista para recargar después
            localStorage.setItem('lastPetId', id);
            showPetDetail(id);

            // 2. Luego cambiamos de vista
            localStorage.setItem('currentView', 4);
            showView();
        }

    });
}

btnCancel.forEach(btn => {
    btn.addEventListener('click', () => {
        localStorage.setItem('currentView', 1)
        showView()

    })
})
btnLogout.addEventListener("click", () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('lastPetId');
    localStorage.removeItem('editPetId');
    localStorage.setItem('currentView', 0);
    showView();
})

btnBack.forEach(btn => {
    btn.addEventListener('click', () => {
        localStorage.setItem('currentView', 1)
        showView()

    })
})

btnAdd.addEventListener("click", () => {
    localStorage.setItem('currentView', 2);
    showView();
})


function showView() {
    const current = localStorage.getItem('currentView');
    views.forEach(element => {
        element.classList.remove('animateView')
        element.style.display = 'none'
    });
    // Si la vista actual es la 1 (Pet List), cargamos los datos de la API
    if (current == 1) {
        listPets();
    }

    // Si la vista actual es la 3 (Editar), intentar cargar los datos de la mascota que se estaba editando
    if (current == 3) {
        const editId = localStorage.getItem('editPetId');
        if (editId) {
            loadPetDataToEdit(editId);
        }
    }

    // Si la vista actual es la 4 (Detalle), intentar cargar la última mascota seleccionada
    if (current == 4) {
        const lastId = localStorage.getItem('lastPetId');
        if (lastId) {
            showPetDetail(lastId);
        }
    }


    views[current].classList.add('animateView')
    views[current].style.display = "block";
}
showView();