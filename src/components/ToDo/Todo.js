import { Checkbox, IconButton, ListItem, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import Divider from '@material-ui/core/Divider';

function Todo({ todo, toggleComplete, removeTodo }) {
  function handleCheckboxClick() {
    toggleComplete(todo.id);
  }

  function handleRemoveClick() {
    removeTodo(todo.id);
  }

  return (
    <div>
      <ListItem style={{ display: "flex" }}>
        <Checkbox checked={todo.completed} onClick={handleCheckboxClick} />
        <Typography
          variant="body1"
          style={{
            textDecoration: todo.completed ? "line-through" : null
          }}
        >
          {todo.task}
        </Typography>
        <IconButton onClick={handleRemoveClick} size="small" color="secondary">
          <CloseIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </div>
  );
}

export default Todo;
