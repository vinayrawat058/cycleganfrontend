import { Link, useNavigate } from 'react-router-dom';


function Header(){


    return (
        <div className="header-top">
        <nav className="navbar">
            <div className="brand">
                    <h1 className="brand-name">ArtistStyle</h1>
            </div>

            {/* <div className="link">
                        <p>Signin</p>
                        <p>Login</p>
            </div> */}
        </nav>
    </div>
    );
}

export default Header;
