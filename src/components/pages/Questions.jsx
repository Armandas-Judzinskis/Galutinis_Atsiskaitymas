import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import QuestionsContext from "../../contexts/QuestionsContext";
import Question from "../UI/Question";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";

const StyledSection = styled.section`
  
  > h1{
    text-align: center;
    color: #014251;
  }
  > p {
    text-align: center;

  }
  > div{
    margin: 0 auto;
    width: 80%;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  }

  a{
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
    a:hover{
      background-color:#128eaa;
      color: #ffffff;
    }
`;

const Questions = () => {

  const { questions } = useContext(QuestionsContext);
  const { loggedInUser } = useContext(UsersContext);
  const location = useLocation();

  return (
    <StyledSection>
      <h1>All Our Questions</h1>
      {
        loggedInUser && <p><Link to="/questions/addNew">Add New Question</Link></p>
      }
      <div>
        {
          questions.map(question => 
            <Question
              key={question.id}
              data={question}
              location={location}
            />
          )
        }
      </div>
    </StyledSection>
  );
}
 
export default Questions;