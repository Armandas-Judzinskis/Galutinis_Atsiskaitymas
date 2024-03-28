import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  justify-items: center;
  flex-direction:column;
  
  align-items: center;

  >h1{
    text-align:center;
    color: #152f39;
  }

  >img{
    width: 500px;
  }

  >ul{
    list-style-type: none;
    
    >li{
      >a {
        text-decoration: none;
        color:white;
      }
      a:hover{
        color: #1d414f;
      }
      
    }
    

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
    text-decoration: none;
    }
    .navButton:hover{
      background-color:#128eaa;
      
    }

  
  
`;

const Home = () => {
  return (
    <StyledSection>
      <h1>Many programmers ask questions, <br /> and help each other by answering them.</h1>
      <img
        src="https://i.postimg.cc/D04GFP51/Untitled-design-1.png"
        alt="friendly programers"
      />
      <h1>If you want to help others,<br /> or maybe you need help. Register and let's go.</h1>
            <ul>
            <li className='navButton'>
              <NavLink to='/user/register' >Register</NavLink>
            </li>
            </ul>
    </StyledSection>
  );
}
 
export default Home;