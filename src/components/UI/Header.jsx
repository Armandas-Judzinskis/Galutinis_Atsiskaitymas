import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";

const StyledHeader = styled.header`
  padding: 0 20px;
  border-bottom: 3px solid #152f39;
  height: 80px;

  display: flex;
  justify-content: space-around;
  align-items: center;
  
  > div:nth-child(1){
    height: 80%;
    > a{
      > img{
        height: 100%;
      }
    }
  }

  > nav{
    > ul{
      margin: 0;
      padding: 0;
      list-style-type: none;
      display: flex;
      gap: 10px;
      > li{
        > a{
          text-decoration: none;
          font-size: 1.5rem;
          color: #ffffff;
          font-weight: bold;
        }
        > a.active{
          color: #c8ee87;

        }
        > a:hover{
          color: #1d414f;
        }
      }
    }
  }

  .button{
    padding: 10px 20px;
    border: none;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #014251;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    }
    button:hover{
      background-color:#128eaa;
      color: #ffffff;
    }

  .navButton{
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #014251;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    }
    .navButton:hover{
      background-color:#128eaa;
      color: #ffffff;
    }

    .nameStyle{
      font-size: 20px;


      
      >a{
        text-decoration: none;
        color:#014251;
      }
    }

    .rowStyle{
      display: flex;
      flex-direction:row;
      gap: 10px;
      
      

      }
`;

const Header = () => {

  const navigate = useNavigate();
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);

  return (
    <StyledHeader>
      <div>
        <Link to='/'>
        <img
            src="https://code.google.com/images/developers.png"
            alt="logo png"
          />
        </Link>
      </div>
      
      {
        loggedInUser ?
        <>
        <nav>
          <ul>
          <li className="navButton">
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className="navButton">
            <NavLink to='/questions'>Questions</NavLink>
          </li>
          </ul>
        </nav>
        <div className="rowStyle">
          <p className="nameStyle">
            <Link to={`/user/${loggedInUser.userName}`}>{loggedInUser.userName}</Link>
          </p>
          <button className="button"
            onClick={() => {
              setLoggedInUser(false);
              navigate('/');
            }}
          >Log Out</button>
        </div></> : 
        <nav>
          <ul>
          <li className="navButton">
            <NavLink to='/'>Home</NavLink>
          </li>
          <li className="navButton">
            <NavLink to='/questions'>Questions</NavLink>
          </li>
            <li className='navButton'>
              <NavLink to='/user/register' >Register</NavLink>
            </li>
            <li className='navButton'>
              <NavLink to='/user/login'>Login</NavLink>
            </li>
          </ul>
        </nav>
      }
    </StyledHeader>
  );
}
 
export default Header;