import { createContext, useContext, useState } from "react";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const deleteComment = (_id) => {
    setComments((prev) => prev.filter((c) => c._id !== _id));
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments ,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => useContext(CommentContext);

