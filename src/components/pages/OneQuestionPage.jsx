import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";
import Comment from "../UI/Comment";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';

const StyledSection = styled.section`
  padding-top: 50px;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    border: 1px solid black;
    padding: 10px 20px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    background-color:#1d414f;
    color: white;
    
    
    > h3, > p {
      margin: 0;
      text-align: justify;
    }



    input, textarea{
      width: 100%;
    }
  }

  >form{
      padding-top: 20px;
      display: flex;
      justify-content: center;

      >div{
        display: flex;
        text-align: center;
        align-items: center;
      }
      
      
}
.button{
    padding: 5px 10px;
    border: none;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
    background-color: #014251;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    }
    button:hover{
      background-color:#128eaa;
      color: #014251;
    }


`;

const OneQuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedInUser, users } = useContext(UsersContext);
  const { questions, setQuestions } = useContext(QuestionsContext);
  const question = questions.find(q => q.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(question?.title);
  const [editedDescription, setEditedDescription] = useState(question?.description);

  const formik = useFormik({
    initialValues: { text: '' },
    validationSchema: Yup.object({
      text: Yup.string()
        .min(10, 'Comment must be at least 10 symbols length')
        .max(500, "Comment can't be longer than 500 symbols")
        .required('This field must be filled')
        .trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      const newComment = {
        text: values.text,
        id: uuid(),
        authorId: loggedInUser.id,
        questionId: id,
      };
      setQuestions({
        type: QuestionsActionTypes.addComment,
        comment: newComment,
        questionId: id,
      });
      resetForm();
    },
  });

  const handleEditSave = () => {
    if (editedTitle !== question?.title || editedDescription !== question?.description) {
      setQuestions({
        type: QuestionsActionTypes.editQuestion,
        questionId: id,
        payload: { title: editedTitle, description: editedDescription, editedBy: loggedInUser.userName },
      });
    }
    setIsEditing(false);
  };

  return (
    <StyledSection>
      {question && (
        <>
          <div>
            {isEditing ? (
              <>
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <button onClick={handleEditSave}>Save</button>
              </>
            ) : (
              <>
                <h3>{question.title}</h3>
                <p>{question.description}</p>
                {
                  question.editedBy &&
                  <p>Edited by <b>{question.editedBy}</b></p>
                }
                {loggedInUser.id === question.userId && (<>
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                <button
                  onClick={() => {
                    setQuestions({
                      type: QuestionsActionTypes.delete,
                      id: question.id,
                    });
                    navigate(-1);
                  }}
                >
                  Delete
                </button>
              </>
            )}
            </>
            )}
          </div>
          <div>
            {question.comments?.map(comment => (
              <Comment key={comment.id} comment={comment} questionId={id} />
            ))}
          </div>
          {loggedInUser && (
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="text">Comment:</label>
                <textarea
                  id="text"
                  name="text"
                  placeholder="Write your comment..."
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.text && formik.errors.text && <p>{formik.errors.text}</p>}
              </div>
              <button className="button" type="submit">Comment</button>
            </form>
          )}
        </>
      )}
    </StyledSection>
  );
};

export default OneQuestionPage;