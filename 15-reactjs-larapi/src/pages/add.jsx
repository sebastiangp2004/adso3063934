import BtnBack from "../components/BtnBack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AddPet() {

  const navigate = useNavigate();

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
  }, [navigate]);



  const [pet, setPet] = useState({
    name: "",
    kind: "",
    weight: "",
    age: "",
    breed: "",
    location: "",
    description: ""
  });

  const addPet = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      await axios.post(
        "http://127.0.0.1:8000/api/pets/store",
        pet,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire({
        icon: "success",
        title: "Pet added successfully"
      });

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
      <main id="Add" className="">
        <BtnBack />

        <form onSubmit={addPet}>
          <div className="card">

            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                placeholder="Enter pet's name"
                value={pet.name}
                onChange={(e) => setPet({ ...pet, name: e.target.value })}
              />
            </label>

            <label htmlFor="kind">
              Kind
              <input
                type="text"
                id="kind"
                placeholder="Enter pet's kind"
                value={pet.kind}
                onChange={(e) => setPet({ ...pet, kind: e.target.value })}
              />
            </label>

            <label htmlFor="weight">
              Weight
              <input
                type="number"
                id="weight"
                placeholder="Enter pet's weight"
                value={pet.weight}
                onChange={(e) => setPet({ ...pet, weight: e.target.value })}
              />
            </label>

            <label htmlFor="age">
              Age
              <input
                type="number"
                id="age"
                placeholder="Enter pet's age"
                value={pet.age}
                onChange={(e) => setPet({ ...pet, age: e.target.value })}
              />
            </label>

            <label htmlFor="breed">
              Breed
              <input
                type="text"
                id="breed"
                placeholder="Enter pet's breed"
                value={pet.breed}
                onChange={(e) => setPet({ ...pet, breed: e.target.value })}
              />
            </label>

            <label htmlFor="location">
              Location
              <input
                type="text"
                id="location"
                placeholder="Enter pet's location"
                value={pet.location}
                onChange={(e) => setPet({ ...pet, location: e.target.value })}
              />
            </label>

            <label htmlFor="description">
              Description
              <textarea
                id="description"
                placeholder="Enter pet's description"
                value={pet.description}
                onChange={(e) =>
                  setPet({ ...pet, description: e.target.value })
                }
              ></textarea>
            </label>

            <div className="action" style={{ padding: "1rem" }}>
              <button type="submit" className="Add">
                Add
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
        </form>
      </main>
    );
  }

  export default AddPet;