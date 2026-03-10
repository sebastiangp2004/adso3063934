import BtnBack from "../components/BtnBack";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Edit() {
  const { id } = useParams();

  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("Error fetching pet");
        }

        const data = await res.json();
        setPet(data.pet);

      } catch (error) {
        console.error("Error fetching pet:", error);
      }
    };

    fetchPet();
  }, [id]);

  const updatePet = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch(`http://127.0.0.1:8000/api/pets/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pet)
      });

      if (!res.ok) {
        throw new Error("Error updating pet");
      }

      const data = await res.json();

      console.log("Pet updated:", data);

      // Swal.fire({
      //   title: "¡Éxito!",
      //   text: data.message,
      //   icon: "success",
      //   showConfirmButton: false,
      //   timer: 1500
      // });

      navigate("/dashboard");

    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return (
    <main id="Edit" className="">
      <BtnBack />
      <form action="">
        {pet ? (
          <div className="card">
            <label for="Name">Name
              <input type="text" name="name" id="name" placeholder="Firulais" value={pet.name} onChange={(e) => setPet({ ...pet, name: e.target.value })} />
            </label>
            <label for="kind"> Kind
              <input type="text" name="kind" id="kind" placeholder="Dog" value={pet.kind} onChange={(e) => setPet({ ...pet, kind: e.target.value })} />
            </label>
            <label for="weight"> Weight
              <input type="number" name="weight" id="weight" placeholder="10 kg" value={pet.weight} onChange={(e) => setPet({ ...pet, weight: e.target.value })} />
            </label>
            <label for="age"> Age
              <input type="number" name="age" id="age" placeholder="2 years" value={pet.age} onChange={(e) => setPet({ ...pet, age: e.target.value })} />
            </label>
            <label for="breed"> Breed
              <input type="text" name="breed" id="breed" placeholder="Golden Retriever" value={pet.breed} onChange={(e) => setPet({ ...pet, breed: e.target.value })} />
            </label>
            <label for="location"> Location
              <input type="text" name="location" id="location" placeholder="Manizales" value={pet.location} onChange={(e) => setPet({ ...pet, location: e.target.value })} />
            </label>
            <label for="description"> Description
              <textarea name="description" id="description" placeholder="It is a friendly and loyal dog." value={pet.description} onChange={(e) => setPet({ ...pet, description: e.target.value })}></textarea>
            </label>
            <div className="action" style={{ padding: "1rem" }}>
              <button type="button" className="btnEdit" onClick={updatePet}>
                Edit
              </button>

              <button
                type="button"
                className="btnCancel"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </form>
    </main>
  )
}

export default Edit;