import React, { useContext } from "react";
import { PokemonContext } from "../../../contexts/PokemonContext";

const ModalCreatePost = () => {
  const [{post},{ onclickCrearPost, setFieldPost, /* showHiddenModal */}] = 
    useContext(PokemonContext);
  return (
    <div className="container-fluid">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        /* onClick={()=>showHiddenModal()} */
      >
        Crear Post
      </button>

      <div
        class={`${post.modalPost=="block" ?'modal fade show' : 'modal fade'} `}
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        /* style={post.modalPost=="block" ? {display: "block"} : {display: "none" }} */
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Crear Post
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label class="form-label">Titulo</label>
                  <input
                    type="text"
                    class="form-control"
                    aria-describedby="titulo"
                    onChange={(e) => setFieldPost(e.target.value, "title")}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Cuerpo del post</label>
                  <textarea
                    onChange={(e) => setFieldPost(e.target.value, "body")}
                    type="text-area"
                    class="form-control"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => onclickCrearPost(e)}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreatePost;
