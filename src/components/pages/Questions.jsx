import { useContext, useState } from "react";
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
    color: rebeccapurple;

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
      color: #014251;;
    }
`;

const Questions = () => {

  const { questions } = useContext(QuestionsContext);
  const { loggedInUser } = useContext(UsersContext);
  const location = useLocation();

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState('descending');


  const filteredQuestions = questions.filter(question => {
    if (filter === 'answered') {
      return question.comments && question.comments.length > 0;
    } else if (filter === 'unanswered') {
      return !question.comments || question.comments.length === 0;
    }
    return true;
  });

  const sortedQuestions = filteredQuestions.sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'comments') {
      comparison = (a.comments ? a.comments.length : 0) - (b.comments ? b.comments.length : 0);
    }

    if (sortDirection === 'ascending') {
      return comparison;
    } else {
      return -comparison;
    }
  });

  return (
    <StyledSection>
      <h1>All Our Questions</h1>
      {
        loggedInUser && <p><Link to="/questions/addNew">Add New Question</Link></p>
      }
           <div className="controls">
        <div>
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('answered')}>Answered</button>
          <button onClick={() => setFilter('unanswered')}>Unanswered</button>
        </div>
        <div>
          <button onClick={() => setSortBy('comments')}>Sort by Comments</button>
          <button onClick={() => setSortDirection(prev => prev === 'ascending' ? 'descending' : 'ascending')}>
            {sortDirection === 'ascending' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>
      <div>
        {sortedQuestions.map(question => (
          <Question
            key={question.id}
            data={question}
            location={location}
          />
        ))}
      </div>
    </StyledSection>
  );
}
 
export default Questions;