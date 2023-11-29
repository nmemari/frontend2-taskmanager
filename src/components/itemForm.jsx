import { useContext, useState } from "react";
import { nanoid } from "nanoid";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { ItemContext } from "../data/ItemContext";

export default function ItemForm() {
  const { addItem, setEditing, updateItem, editing, items } =
    useContext(ItemContext);

  const date = new Date();

  let initialData = {
    todoItem: "",
    done: false,
    timeDone: "",
  };

  if (editing !== "new") {
    initialData = items.find((i) => {
      return i.id === editing;
    });
  }

  const [item, setItem] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const time =
      (date.getHours() % 12) +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      " " +
      (date.getHours() > 11 ? "PM" : "AM");

    if (editing === "new") {
      addItem({
        ...item,
        id: nanoid(),
        timeAdded: time,
      });
    } else {
      updateItem(item);
    }
  };

  const handleInput = (e, field) => {
    setItem({ ...item, [field]: e.target.value });
  };

  return (
    <div className="form__container">
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Enter your task..."
          variant="outlined"
          value={item.todoItem}
          onChange={(e) => handleInput(e, "todoItem")}
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
