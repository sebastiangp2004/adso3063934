import BtnBack from "../components/BtnBack";
import { useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {

      Swal.fire({
        icon: "error",
        title: "Invalid token",
        text: "Your session is not valid. Please login again.",
        confirmButtonText: "Go to login"
      }).then(() => {
        localStorage.removeItem("authToken");
        navigate("/");
      });

    }

    const searchPet = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/pets/show/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setPet(res.data.pet);
      } catch (error) {
        Swal.fire({
        title: "Error loading pets",
        text: "Please try again later.",
        icon: "error",
        timer: 2000,

      }).then(() => {
        navigate("/dashboard");
      })
      }
    };

    searchPet();
  }, [id, navigate]);

  const updatePet = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put(
        `http://127.0.0.1:8000/api/pets/edit/${id}`,
        pet,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      Swal.fire("Success", "Pet updated successfully!", "success");
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        title: "Error loading pets",
        text: "Please try again later.",
        icon: "error",
        timer: 2000,

      }).then(() => {
        localStorage.removeItem("authToken");
        navigate("/");
      });
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