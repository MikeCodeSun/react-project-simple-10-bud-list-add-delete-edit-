import { useState } from "react";
import Alert from "./Alert";
import List from "./List";

const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "plz type someThing!", "danger");
      console.log(alert);
    } else if (name && isEditing) {
      // edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(";");
      showAlert(true, "item edited successfully", "success");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      showAlert(true, "add one new item", "success");
      setName("");
      console.log(list);
    }
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setName(specificItem.title);
    setEditId(id);
    showAlert(true, "edit item", "danger");
  };

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "delete one item", "danger");
  };

  const cleatItems = () => {
    setList([]);
    showAlert(true, "remove all items", "danger");
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  localStorage.setItem("list", JSON.stringify(list));

  return (
    <main>
      <section className="section-center">
        {alert.show && <Alert alert={alert} showAlert={showAlert} />}
        <form onSubmit={handleSubmit} className="form">
          <h3>bud</h3>
          <div className="form-control">
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="submit-btn btn" type="submit">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        <div className="list-container">
          {list.length > 0 && (
            <div className="list">
              <List list={list} deleteItem={deleteItem} editItem={editItem} />
            </div>
          )}
          <button className="btn btn-clear" onClick={() => cleatItems()}>
            clear all
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
