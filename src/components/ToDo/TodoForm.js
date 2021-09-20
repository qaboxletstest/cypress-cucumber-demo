import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginBottom: 20
  },
}));

function TodoForm({ addTodo }) {
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false
  });

  function handleTaskInputChange(e) {
    // e.target.value contains new input from onChange
    // event for input elements
    setTodo({ ...todo, task: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // prevents browser refresh
    // trim() gets rid of string whitespace
    if (!todo.task.trim()) {
      alert("Error; add task!")
    }
    else {
      addTodo({ ...todo, id: uuid() });
      setTodo({ ...todo, task: "" });
    }
  }

  const classes = useStyles();

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <TextField
        label="Task"
        name="task"
        value={todo.task}
        className={classes.button}
        onChange={handleTaskInputChange}
      />
      <Button type="submit" variant="outlined" color="primary" startIcon={<SaveIcon />}>Submit</Button>
    </form>
  );
}

export default TodoForm;
