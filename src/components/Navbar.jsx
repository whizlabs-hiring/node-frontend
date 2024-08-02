import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAuth } from '../auth/auth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Whizlabs
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            {
              isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/protected">
                      Profile
                    </Link>
                  </li>
                </>
              )
            }
          </ul>
          <form className="form">
            {!isAuthenticated ? (
              <>
                <Link to="/registration" className="btn btn-outline-primary me-2">
                  Registration
                </Link>
                <Link to="/login" className="btn btn-outline-success">
                  Login
                </Link>
              </>
            ) : (
              <button onClick={logout} className="btn btn-outline-danger">
                Logout
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
