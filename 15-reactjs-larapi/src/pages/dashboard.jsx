import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Dashboard() {

  const styles = {
    list: {
      display: "flex",
      gap: "0.4rem",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },

    row: {
      backgroundColor: "#7b7b7b",
      borderRadius: "5px",
      display: "flex",
      gap: "0.4rem",
      padding: "0.2rem",
      height: "34px",
      width: "226px"
    },

    rowEven: {
      backgroundColor: "#E0E0E0"
    },

    img: {
      width: "40px"
    },

    data: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      width: "190px"
    },

    name: {
      fontSize: "12px",
      fontWeight: 500,
      margin: 0
    },

    kind: {
      fontSize: "10px",
      fontWeight: 400,
      margin: 0
    },

    actions: {
      paddingTop: 0,
      display: "flex",
      gap: "0.5rem"
    },

    button: {
      height: "26px",
      width: "26px"
    },

    btnShow: {
      filter:
        "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(103%) contrast(103%)"
    },

    btnEdit: {
      filter:
        "brightness(0) saturate(100%) invert(71%) sepia(77%) saturate(381%) hue-rotate(135deg) brightness(103%) contrast(102%)"
    },

    btnDelete: {
      filter:
        "brightness(0) saturate(100%) invert(13%) sepia(100%) saturate(7485%) hue-rotate(0deg) brightness(103%) contrast(119%)"
    }
  };

  const [pets, setPets] = useState([]);
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

  const listPets = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        "http://127.0.0.1:8000/api/pets/list",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setPets(res.data.pets);
    } catch (error) {
      Swal.fire({
        title: "Error loading pets",
        text: "Please try again later.",
        icon: "error",
        timer: 2000,

    }). then(() => {
        localStorage.removeItem("authToken");
        navigate("/");
      });
    }
  };

  useEffect(() => {
    listPets();
  }, []);

  const deletePet = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("authToken");

        await axios.delete(
          `http://127.0.0.1:8000/api/pets/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        Swal.fire({
          icon: "success",
          title: "Pet deleted successfully",
          timer: 1500,
          showConfirmButton: false
        });

        listPets();

      } catch (error) {
        console.error("Error deleting pet:", error);

        Swal.fire({
          icon: "error",
          title: "Error deleting pet"
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <main id="Dashboard" className="dashboard">
      <header>
        <img className="title" src="/imgs/squares-four.svg" alt="Dashboard Icon" />
        <h1 className="title">Dashboard</h1>
      </header>

      <nav>
        <Link to="/add">
          <button type="button" className="btnAdd">
            <img src="imgs/plus-circle.svg" alt="Add Icon" />
          </button>
        </Link>

        <Link to="/">
          <button type="button" className="btnLogout" onClick={handleLogout}>
            <img className="icon" src="/imgs/sign-out.svg" alt="Logout Icon" />
          </button>
        </Link>
      </nav>

      <h2>Pet List</h2>

      <div style={styles.list}>
        {pets.map((pet, index) => (
          <div
            key={pet.id}
            style={{
              ...styles.row,
              ...(index % 2 === 0 ? styles.rowEven : {})
            }}
          >
            <img src={"images/" + pet.image} style={styles.img} alt={pet.name} />

            <div style={styles.data}>
              <h3 style={styles.name}>{pet.name}</h3>
              <h4 style={styles.kind}>{pet.kind}</h4>
            </div>

            <nav style={styles.actions}>
              <Link to={`/detail/${pet.id}`}>
                <button type="button">
                  <img src="/imgs/eye.svg" style={{ ...styles.button, ...styles.btnShow }} alt="show" />
                </button>
              </Link>

              <Link to={`/edit/${pet.id}`}>
                <button type="button" >
                  <img src="/imgs/pencil.svg" style={{ ...styles.button, ...styles.btnEdit }} alt="edit" />
                </button>
              </Link>
              <button type="button" onClick={() => deletePet(pet.id)}>
                <img src="/imgs/trash.svg" style={{ ...styles.button, ...styles.btnDelete }} alt="delete" />
              </button>
            </nav>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;