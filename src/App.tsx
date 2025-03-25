import { useState } from "react";
import "./App.css";
import CommentBox from "./Components/CommentBox";

const App: React.FC = () => {
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);

  const handleClick = (): void => {
    setShowCommentBox((prev) => !prev);
  };

  return (
    <>
      <div className="wrapper">
        <div className="Header">Comment Box</div>
        <div className="Main">
          <button
            className={`button ${showCommentBox ? "move-left" : ""}`}
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M2 2h20v16H6l-4 4V2zm2 2v15.172L6.828 16H20V4H4zm4 5h8v2H8v-2zm0-4h10v2H8V5z" />
            </svg>
          </button>
          <CommentBox show={showCommentBox} />
        </div>
      </div>
    </>
  );
};

export default App;
