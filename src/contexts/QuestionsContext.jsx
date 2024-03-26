import { createContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

export const QuestionsActionTypes = {
  getAll: 'fetches all data on initial load',
  addNew: 'adds new question to the data',
  delete: 'delete one specific question',
  addComment: 'add new comment to a specific question',
  deleteComment: 'delete one specific comment from a question',
  editComment: 'edits existing comment',
  editQuestion: 'edits existing question'
}

const reducer = (state, action) => {
  switch(action.type){
    case QuestionsActionTypes.getAll:
      return action.data;
    case QuestionsActionTypes.addNew:
      fetch(`http://localhost:8080/questions`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case QuestionsActionTypes.delete:
      fetch(`http://localhost:8080/questions/${action.id}`,{ method: "DELETE" });
      return state.filter(el => el.id !== action.id);
    case QuestionsActionTypes.addComment:
      const questionToAddComment = state.find(el => el.id === action.questionId);
      const commentedQuestion = {
        ...questionToAddComment,
        comments: questionToAddComment.comments ? [...questionToAddComment.comments, action.comment] : [action.comment]
      };
      fetch(`http://localhost:8080/questions/${action.questionId}`,{
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(commentedQuestion)
      });
      return state.map(el => {
        if(el.id === action.questionId){
          return commentedQuestion;
        } else {
          return el;
        }
      });
    case QuestionsActionTypes.deleteComment:
      const questionToChange = state.find(el => el.id === action.questionId);
      const changedQuestion = {
        ...questionToChange,
        comments: questionToChange.comments.filter(comment => comment.id !== action.commentId)
      };
      fetch(`http://localhost:8080/questions/${action.questionId}`,{
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(changedQuestion)
      });
      return state.map(el => {
        if(el.id === action.questionId){
          return changedQuestion;
        } else {
          return el;
        }
      });
      case QuestionsActionTypes.editComment:
      const questionIndex = state.findIndex(question => question.id === action.questionId);
      if (questionIndex > -1) {
        const question = state[questionIndex];
        const commentIndex = question.comments.findIndex(comment => comment.id === action.commentId);
        if (commentIndex > -1) {
          const updatedComments = [...question.comments];
          const updatedComment = {
            ...updatedComments[commentIndex],
            text: action.newText,
            editedBy: action.userId,
            editedAt: new Date().toISOString(),
          };
          updatedComments[commentIndex] = updatedComment;

          const updatedQuestion = { ...question, comments: updatedComments };

          fetch(`http://localhost:8080/questions/${action.questionId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedQuestion)
          }).then(response => {
            if (!response.ok) {
              throw new Error('Failed to update comment');
            }
          }).catch(error => console.error('Error updating comment:', error));

          const newState = [...state];
          newState[questionIndex] = updatedQuestion;
          return newState;
        }
      }
      return state;
      case QuestionsActionTypes.editQuestion:
      const index = state.findIndex((question) => question.id === action.questionId);
      if (index > -1) {
        const updatedQuestion = {
          ...state[index],
          ...action.payload,
        };

        fetch(`http://localhost:8080/questions/${action.questionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedQuestion)
        })
        .then(response => response.ok ? response.json() : Promise.reject('Failed to update question'))
        .then(data => {
          console.log('Question updated successfully:', data);
        })
        .catch(error => console.error('Error updating question:', error));
        const newState = [...state];
        newState[index] = updatedQuestion;
        return newState;
      }
      return state;
      
    default:
      console.error(`No such reducer actions: ${action.type}`);
      return state;
  }
}

const QuestionsProvider = ({ children }) => {

  const [questions, setQuestions] = useReducer(reducer, []);

  useEffect(()=>{
    fetch(`http://localhost:8080/questions`)
      .then(res => res.json())
      .then(data => setQuestions({
        type: QuestionsActionTypes.getAll,
        data: data
      }));
  },[]);

  return(
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions
      }}
    >
      { children }
    </QuestionsContext.Provider>
  )
}

export { QuestionsProvider };
export default QuestionsContext;