import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
  border: 1px solid black;
  padding: 10px 20px;

  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  background-color: #014251;
  color: white;

  > a{
    text-decoration:none;
    color: #f5906f;
  }
  
  > h3{
    margin: 0;
    color: #c8ee87;
  }
  > p{
    margin: 0;
    text-align: justify;
  }
`;

const Question = ({ data, location }) => {

  const { setQuestions } = useContext(QuestionsContext);
  const { loggedInUser } = useContext(UsersContext);

  return (
    <StyledDiv>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <Link to={`/questions/${data.id}`}>More info...</Link>
      {
        location.pathname !== "/questions/allQuestions" &&
        loggedInUser.id === data.userId && 
        <button
          onClick={() => {
            setQuestions({
              type: QuestionsActionTypes.delete,
              id: data.id
            })
          }}
        >Delete</button>
      }
    </StyledDiv>
  );
}
 
export default Question;