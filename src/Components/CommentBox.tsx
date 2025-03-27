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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  if (!show) return null;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      setComments([{ name: "Rajat", text: comment }, ...comments]);
      setComment("");
    }
  };

  const handleDelete = (index: number) => {
    const updated = comments.filter((_, i) => i !== index);
    setComments(updated);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedText(comments[index].text);
  };

  const handleSaveEdit = (index: number) => {
    const updated = [...comments];
    updated[index].text = editedText;
    setComments(updated);
    setEditingIndex(null);
    setEditedText("");
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong className="comment-name">{cmt.name}</strong>
                <div className="comment-actions">
                  <button
                    className="action-btn edit"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingIndex === index ? (
                <>
                  <textarea
                    className="comment-input"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button
                    className="submit-btn"
                    onClick={() => handleSaveEdit(index)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <p className="comment-text">{cmt.text}</p>
              )}
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
