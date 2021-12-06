import React from "react";

export default function List({ list, deleteItem, editItem }) {
  return (
    <div>
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article key={id}>
            <p>{title}</p>
            <div className="btn-container">
              <button className="btn btn-edit" onClick={() => editItem(id)}>
                edit
              </button>
              <button className="btn btn-delete" onClick={() => deleteItem(id)}>
                delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
