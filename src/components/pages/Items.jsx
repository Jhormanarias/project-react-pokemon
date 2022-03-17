import React from "react";
import { useContext } from "react";
import { PokemonContext } from "../../contexts/PokemonContext";
import { Comments } from "./components/Comments";

export const Items = () => {
  const [{ post }, { setpost }] = useContext(PokemonContext);
  return (
    <div>
      <h1>Items</h1>
      <br />
      <br />
      {post.posts.map((post) => {
          console.log(post);
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <br />
            <br />
            <p>{post.body}</p>
            <br />
            <Comments comments={post.comentarios}/>
          </div>
        );
      })}
    </div>
  );
};
