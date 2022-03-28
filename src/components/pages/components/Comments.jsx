import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";
export const Comments = ({ comments }) => {
  const [{ post }, { setpost, postComment}] = useContext(PokemonContext);

  const enterComment = async (e,comment_id,post_id) => {

    if (e.key === 'Enter') {
      let comment = await postComment({
        comment: e.target.value,
        comment_id: comment_id,
        post_id: post_id
      }
      );
      if(comment){
        alert('Comentario Subido :) ');
        e.target.value = "";
        setpost({...post,
                  status: "Noloaded"});
      }

    }
    
  };
  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <div class="card text-white bg-secondary mb-3">
              <div class="card-body">
                <p class="card-text">{comment.comment}</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="button" class="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Aquí va tu comentario :) "
                aria-label="Aquí va tu comentario :) "
                onKeyPress={e=>enterComment(e,comment.id,comment.post_id)}
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
