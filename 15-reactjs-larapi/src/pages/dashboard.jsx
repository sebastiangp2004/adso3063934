import { Link } from "react-router-dom";



function dashboard() {
  return (
    <main id="Dashboard" class="">
      <header>
        <img class="tittle" src="/imgs/squares-four.svg" alt="Dashboard Icon" />
        <h1 class="tittle">Dashboard</h1>
      </header>
      <nav>
        <Link to="/add">
          <button type="button" className="btnAdd">
            <img src="imgs/plus-circle.svg" alt="Add Icon" />
          </button>
        </Link>


        <Link to="/">
          <button type="button" class="btnLogout">
            <img class="icon" src="/imgs/sign-out.svg" alt="Logout Icon" />
          </button>
        </Link>

      </nav>
      <h2>Pet List</h2>
      <section class="list">

      </section>
    </main>
  )
}
export default dashboard;