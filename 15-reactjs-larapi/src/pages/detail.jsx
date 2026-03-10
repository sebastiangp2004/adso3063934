import { useParams } from "react-router-dom";
import BtnBack from "../components/BtnBack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Detail() {
  const { id } = useParams();


  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPets = async () => {
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
          throw new Error("Error fetching pets");
        }

        const data = await res.json();
        setPet(data.pet);

      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [id]);


  return (
    <main id="Detail" class="">
      <BtnBack />
      <div class="data">
        {pet ? (
          <div class="card">
            <img src={"/images/" + pet.image} alt={pet.name} />
            <h2>{pet.name}</h2>
            <p>Kind: {pet.kind}</p>
            <p>Weight: {pet.weight} KG</p>
            <p>Age: {pet.age}</p>
            <p>Breed: {pet.breed}</p>
            <p>Location: {pet.location}</p>
            <p>Description: {pet.description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  )
}

export default Detail;