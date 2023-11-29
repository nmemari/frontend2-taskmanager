import { useState } from "react";

import Item from "./components/item";
import ItemForm from "./components/itemForm";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { blue, pink } from "@mui/material/colors";

import { ItemContext } from "./data/ItemContext";

import "./styles.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const addItem = (item) => {
    setItems([...items, item]);
    setEditing(null);
  };

  const updateItem = (item) => {
    setItems(
      items.map((i) => {
        if (i.id === item.id) {
          return item;
        } else {
          return i;
        }
      }),
    );
    setEditing(null);
  };

  const deleteItem = (id) => {
    setItems(
      items.filter((i) => {
        return i.id !== id;
      }),
    );
  };

  return (
    <div className="App">
      <ItemContext.Provider
        value={{
          items,
          addItem,
          deleteItem,
          updateItem,
          editing,
          setEditing,
        }}
      >
        <Toolbar
          sx={{
            fontSize: 40,
            backgroundColor: blue[500],
            fontWeight: 700,
            color: "#fff",
          }}
          style={{
            margin: 20,
          }}
        >
          Task Manager
        </Toolbar>
        {!editing ? (
          <>
            {items.map((item) => {
              return <Item key={item.id} item={item} />;
            })}
            <Button variant="contained" onClick={() => setEditing("new")}>
              Add Task
            </Button>
          </>
        ) : (
          <ItemForm />
        )}
      </ItemContext.Provider>
    </div>
  );
}
