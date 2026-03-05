import { Link } from "react-router-dom";

function BtnBack() {
    const url = window.location.pathname;

    return (
        <>
            {url === "/edit" && (
                <header>


                    <Link to="/dashboard">
                        <button type="button" className="btnBack">
                            <img src="imgs/arrow-line-left.svg" alt="Back Icon" />
                        </button>
                    </Link>
                    <img src="imgs/pencil.svg" alt="Edit Icon" />
                    <h1>Edit Pet</h1>
                </header>
            )}
            {url === "/detail" && (
                <header>
                    <Link to="/dashboard">
                        <button type="button" className="btnBack">
                            <img src="imgs/arrow-line-left.svg" alt="Back Icon" />
                        </button>
                    </Link>
                    <img src="imgs/eye.svg" alt="" />
                    <h1>Detail Pet</h1>
                </header >
            )
            }
            {
                url === "/add" && (
                    <header>
                        <Link to="/dashboard">
                            <button type="button" className="btnBack">
                                <img src="imgs/arrow-line-left.svg" alt="Back Icon" />
                            </button>
                        </Link>
                        <img src="imgs/plus-circle.svg" alt="Add Icon" />
                        <h1>Add Pet</h1>
                    </header>
                )
            }
        </>
    );
}

export default BtnBack;