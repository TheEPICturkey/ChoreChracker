import { Link } from 'react-router-dom';

function Navbar() {
    return (
<nav style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
            <Link to="/sign-up" style={{ margin: '0 10px' }}>Sign Up</Link>
            <Link to="/sign-in" style={{ margin: '0 10px' }}>Sign In</Link>
        </nav>
    );
}

export default Navbar;