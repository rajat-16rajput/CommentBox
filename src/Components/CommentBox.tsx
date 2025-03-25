import React, { useState } from "react";

interface Comment {
  name: string;
  text: string;
}

interface CommentBoxProps {
  show: boolean;
  onClose: () => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ show, onClose }) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  if (!show) return null;

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      setComments([{ name: "Rajat", text: comment }, ...comments]);
      setComment("");
    }
  };

  return (
    <div className={`comment-box ${show ? "show" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>

      <h3>Comments</h3>

      <textarea
        className="comment-input"
        placeholder="Enter your comments here"
        value={comment}
        onChange={handleCommentChange}
      />

      <button className="submit-btn" onClick={handleSubmit}>
        Post
      </button>

      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((cmt, index) => (
            <div key={index} className="comment-item">
              <strong className="comment-name">{cmt.name}</strong>
              <p className="comment-text">{cmt.text}</p>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
