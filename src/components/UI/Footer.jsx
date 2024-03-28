import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: 10px;
  height: 150px;
  border-top: 3px solid #014251;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p{
    color: #014251;
  }

  ul:nth-child(2){
    display: flex;
    >li:first-child{
      padding-right: 10px;
      color: #014251;
      }
  }

  i{
    color: #014251;
  }
  i:hover{
    color:#128eaa;
  }

  a {
    color: #014251;
    }
  a:hover{
    color:#128eaa;
  }

  > ul{
    list-style-type: none;
    color: #014251;


    
    > li:first-child{
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 10px;
     
    }
    > li{
      margin-bottom: 5px;
      > a{
        text-decoration: none;
        > i{
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }
  }
  
`;

const Footer = () => {
  return (
    <StyledFooter>

      <ul>
        <li>Legal</li>
        <li><Link>Terms & Conditions</Link></li>
        <li><Link>Privacy Policy</Link></li>
        <li><Link>Terms of use</Link></li>
      </ul>
      <ul>
        <li>Socials</li>
        <li>
          <Link><i className="bi bi-facebook"></i></Link>
          <Link><i className="bi bi-instagram"></i></Link>
        </li>
        <li>
          <Link><i className="bi bi-twitter-x"></i></Link>
          <Link><i className="bi bi-linkedin"></i></Link>
        </li>
      </ul>
      <div>
          <p>Copyrights &copy; 2024 by Armandas</p>
      </div>

    </StyledFooter>
  );
}
 
export default Footer;