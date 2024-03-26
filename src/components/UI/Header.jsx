import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";

const StyledHeader = styled.header`
`;

const Header = () => {

  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);

  return (
    <StyledHeader>
      <div>
        <Link to='/'>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
        </ul>
      </nav>
      {
        loggedInUser ?
        <div>
          <p>
            <Link to={`/user/${loggedInUser.userName}`}>{loggedInUser.userName}</Link>
          </p>
          <button
            onClick={() => {
              setLoggedInUser(false);
              navigate('/');
            }}
          >Log Out</button>
        </div> : 
        <nav>
          <ul>
            <li>
              <NavLink to='/user/register'>Register</NavLink>
            </li>
            <li>
              <NavLink to='/user/login'>Login</NavLink>
            </li>
          </ul>
        </nav>
      }
    </StyledHeader>
  );
}
 
export default Header;