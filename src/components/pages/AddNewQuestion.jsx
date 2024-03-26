import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import styled from "styled-components";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";

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

      > textarea{
        height: 5lh;
      }
      > p{
        grid-column: span 3;
        color: red;
        text-align: center;
      }
    }
  }
`;

const AddNewQuestion = () => {

  const navigate = useNavigate();
  const { loggedInUser } = useContext(UsersContext);
  const { setQuestions } = useContext(QuestionsContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    }, 
    onSubmit: values => {
      const newQuestion = {
        id: uuid(),
        userId: loggedInUser.id,
        ...values
      }
      // console.log(newQuestion);
      setQuestions({
        type: QuestionsActionTypes.addNew,
        data: newQuestion
      });
      navigate(-1);
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Title must be at least 5 symbols length')
        .max(50, "Title can't be longer than 50 symbols")
        .required('This field must be filled')
        .trim(),
      description: Yup.string()
        .min(5, 'Description must be at least 5 symbols length')
        .max(500, "Description can't be longer than 500 symbols")
        .required('This field must be filled')
        .trim()
    })
  });

  return (
    <StyledSection>
      <h1>Add New Question</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title" id="title"
            placeholder="Write question title..."
            value={formik.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.title && formik.errors.title &&
            <p>{formik.errors.title}</p>
          }
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description" id="description"
            placeholder="Write question description..."
            value={formik.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {
            formik.touched.description && formik.errors.description &&
            <p>{formik.errors.description}</p>
          }
        </div>
        <input type="submit" value="Add New Question" />
      </form>
    </StyledSection>
  );
}
 
export default AddNewQuestion;