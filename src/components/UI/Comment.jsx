import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import QuestionsContext from "../../contexts/QuestionsContext";
import { QuestionsActionTypes } from "../../contexts/QuestionsContext";

const Comment = ({ comment, questionId }) => {

  const { loggedInUser, users } = useContext(UsersContext);
  const { setQuestions } = useContext(QuestionsContext);
  const [editedText, setEditedText] = useState(comment.text);
  const [isEditing, setIsEditing] = useState(false);
  const author = users.find(user => user.id === comment.authorId);
  const editor = users.find(user => user.id === comment.editedBy);

  const handleSaveEdit = () => {
    if (editedText.trim() && editedText !== comment.text) {
      setQuestions({
        type: QuestionsActionTypes.editComment,
        questionId,
        commentId: comment.id,
        newText: editedText,
        userId: loggedInUser.id,
      });
    }
    setIsEditing(false);
  };

  return (
    <>
      {
        users.length &&
        <div>
          <p>Comment by: {author.userName}</p>
          {
            editor &&
            <p>Edited by <b>{editor.userName}</b> on <b>{comment.editedAt}</b></p>
          }
          {
            isEditing ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              <p>{comment.text}</p>
            )
          }
          {
            loggedInUser.id === comment.authorId &&
            <>
              <button
                onClick={() => setQuestions({
                  type: QuestionsActionTypes.deleteComment,
                  commentId: comment.id,
                  questionId: questionId
                })}
              >Delete</button>
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSaveEdit();
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                {isEditing ? "Save" : "Update"}
              </button>
            </>
          }
        </div>
      }
    </>
  );
}

export default Comment;