import React from "react";
import { useContext } from "react";
import { PokemonContext } from "../../contexts/PokemonContext";
import { Comments } from "./components/Comments";

export const Items = () => {
  const [{ post }, { setpost }] = useContext(PokemonContext);
  return (
    <div className="container-fluid pt-3">
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
            
            <br />
            <Comments comments={post.comentarios} />
          </div>
        );
      })}
    </div>
  );
};
