import React from "react";
import { useContext } from "react";
import { PokemonContext } from "../../contexts/PokemonContext";
import { Comments } from "./components/Comments";

export const Items = () => {
  const [{ post }, { setpost }] = useContext(PokemonContext);
  return (
    <div className="container-fluid">
      <h1>Post</h1>
      <br />
      <br />
      {post.posts.map((post) => {
        console.log(post);
        return (
          <div key={post.id}>
            <div className="card text-white bg-dark mb-3">
              <div class="card-header">
                <h5 className="card-title">Post</h5>
              </div>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
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
            <br />
            <Comments comments={post.comentarios} />
          </div>
        );
      })}
    </div>
  );
};
