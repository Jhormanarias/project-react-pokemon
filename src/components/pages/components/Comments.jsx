import React, { useContext } from "react";

export const Comments = ({ comments }) => {
  console.log(comments);
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <div class="card text-white bg-secondary mb-3">
              <div class="card-header"><h5 class="card-title">Comentario</h5></div>
              <div class="card-body">
                <p class="card-text">{comment.comment}</p>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Aquí va tu comentario :) "
                aria-label="Aquí va tu comentario :) "
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
              >
                Comentar
              </button>
            </div>
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
