import React, { useContext } from "react";

export const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            {comment.comment}
            <ol>
              {comment.comentarios.length > 0 && (
                <ol>
                  <Comments comments={comment.comentarios} />
                </ol>
              )}
            </ol>
          </div>
        );
      })}
    </div>
  );
};
