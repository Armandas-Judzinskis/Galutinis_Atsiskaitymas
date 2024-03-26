import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import QuestionsContext from "../../contexts/QuestionsContext";
import Question from "../UI/Question";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";

const StyledSection = styled.section`
  
  > h1{
    text-align: center;
  }
  > p {
    text-align: center;

    > a{
      text-decoration: none;
      padding: 5px 12px;
      border: 1px solid black;
      border-radius: 10px 5px;
      transition: 0.3s;
    }
    > a:hover{
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
  }
  > div{
    margin: 0 auto;
    width: 80%;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
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