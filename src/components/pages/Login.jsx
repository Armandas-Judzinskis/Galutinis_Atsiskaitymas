import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;

  > h1{
    font-size: 3rem;
  }

  > form{
    display: flex;
    flex-direction: column;
    gap: 5px;

    > div {
      display: grid;
      grid-template-columns: 1fr 2fr;

      > p{
        grid-column: span 3;
        color: red;
        text-align: center;
      }
    }
    +p{
      color: red;
    }
  }

  .button{
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
    .button:hover{
      background-color:#128eaa;
      color: #1d414f;
    }
`;

const Login = () => {

  const navigate = useNavigate();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const { users, setLoggedInUser } = useContext(UsersContext);

  const formik = useFormik({
    initialValues:{
      userName: "",
      password: ""
    },
    onSubmit: (values) => {
      const loggedInUser = users.find(user => user.userName === values.userName && bcrypt.compareSync(values.password, user.password));

      if(loggedInUser === undefined){
        setWrongCredentials(true);
      } else {
        setLoggedInUser(loggedInUser);
        navigate('/');
      }
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required('This fields must be filled')
        .trim(),
      password: Yup.string()
      .required('This fields must be filled')
      .trim()
    })
  });

  return (
    <StyledSection>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userName">User name:</label>
          <input
            type="text"
            name="userName" id="userName"
            placeholder="Enter your user name..."
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.userName && formik.errors.userName &&
            <p>{formik.errors.userName}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password" id="password"
            placeholder="Enter your password..."
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.password && formik.errors.password &&
            <p>{formik.errors.password}</p>
          }
        </div>
        <input className="button" type="submit" value="LogIn" />
      </form>
      {
        wrongCredentials && <p>No user with such username or password combination</p>
      }
    </StyledSection>
  );
}
 
export default Login;