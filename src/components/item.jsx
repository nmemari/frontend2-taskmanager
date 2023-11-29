import { useContext, useState } from "react";
import { ItemContext } from "../data/ItemContext";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { blue, pink } from "@mui/material/colors";

import "../styles.css";

export default function Item({ item }) {
  const { deleteItem, setEditing, updateItem } = useContext(ItemContext);
  const [checked, setChecked] = useState(false);

  const date = new Date();

  const handleCheckBox = () => {
    setChecked(!checked);

    const time =
      (date.getHours() % 12) +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      " " +
      (date.getHours() > 11 ? "PM" : "AM");

    updateItem({
      ...item,
      done: !item.done,
      timeDone: time,
    });
  };
  return (
    <div className="item__container">
      <div className="item__details">
        <p className="item">
          <Checkbox checked={item.done} onChange={handleCheckBox} />
          {item.done === true ? <del>{item.todoItem}</del> : item.todoItem}
        </p>
        <div className="item__times">
          <p className="item__time">Started at: {item.timeAdded}</p>
          {checked ? (
            <p className="item__time">Started at: {item.timeDone}</p>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="btns">
        <EditIcon
          onClick={() => setEditing(item.id)}
          sx={{ color: blue[500] }}
          fontSize="large"
        />
        <DeleteIcon
          onClick={() => deleteItem(item.id)}
          sx={{ color: pink[500] }}
          fontSize="large"
        />
      </div>
    </div>
  );
}
