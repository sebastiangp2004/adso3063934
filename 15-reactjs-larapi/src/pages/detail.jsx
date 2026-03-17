import { useParams } from "react-router-dom";
import BtnBack from "../components/BtnBack";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";

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

  const detailPet = async () => {
    try {
      const token = localStorage.getItem("authToken");
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
        title: "Error",
        text: error.response?.data?.message || "Pet not found",
        icon: "error",
        timer: 2500,

      }).then(() => {;
        navigate("/dashboard");
      });
    }
  };


  useEffect(() => {
    detailPet();
  }, []);

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
          <p>Loading pet details...</p>
        )}
      </div>
    </main>
  )
}

export default Detail;