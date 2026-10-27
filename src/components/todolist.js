import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Todo from './todo';
import { v4 as uuidv4 } from 'uuid';
import { useState, useContext, useEffect, useMemo } from 'react';
import { TodosContext } from '../contexts/todosContext';
import { ToastContext } from '../contexts/ToastContext';

export default function Todolist() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayTodosType, setDisplayTodosType] = useState("All");

  // state تاع الـ Dialog
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({ title: "", details: "" });

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.iscomplited;
    });
  }, [todos]);

  const notcompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.iscomplited;
    });
  }, [todos]);

  const { showHideToast } = useContext(ToastContext)

  let todosToBeDisplayed = todos;
  if (displayTodosType === "Completed") {
    todosToBeDisplayed = completedTodos;
  } else if (displayTodosType === "Pending") {
    todosToBeDisplayed = notcompletedTodos;
  } else {
    todosToBeDisplayed = todos;
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, [setTodos]);

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      Task_Title: titleInput,
      details: "",
      iscomplited: false
    };
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    setTitleInput("");
    showHideToast("Task added successfully");
  }

  function changDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }

  // ===== الإكمال =====
  function handleCheckClick(id) {
    const updatedTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, iscomplited: !t.iscomplited };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("Task status updated");
  }

  // ===== الحذف =====
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteAlert(true);
  }

  function closeDeleteDialog() {
    setShowDeleteAlert(false);
  }

  function handleDelete() {
    const updatedTodos = todos.filter((t) => t.id !== dialogTodo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteAlert(false);
    showHideToast("Task deleted successfully");
  }

  // ===== التعديل =====
  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setUpdateTodo({ title: todo.Task_Title, details: todo.details });
    setShowUpdateAlert(true);
  }

  function closeUpdateDialog() {
    setShowUpdateAlert(false);
  }

  function handleUpdate() {
    const updatedTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return { ...t, Task_Title: updateTodo.title, details: updateTodo.details };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowUpdateAlert(false);
    showHideToast("Task updated successfully");
  }

  const todosJsx = todosToBeDisplayed.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        onCheck={handleCheckClick}
        onDelete={openDeleteDialog}
        onUpdate={openUpdateDialog}
      />
    );
  });

  return (
    <>
      {/* Dialog الحذف */}
      <Dialog
        open={showDeleteAlert}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="delete-dialog-title">
          {"Are you sure you want to delete the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Deletion cannot be undone once completed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Close</Button>
          <Button onClick={handleDelete}>Yes, delete it.</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog التعديل */}
      <Dialog
        open={showUpdateAlert}
        onClose={closeUpdateDialog}
        aria-labelledby="update-dialog-title"
        role="alertdialog"
      >
        <DialogTitle id="update-dialog-title">
          {"Edit Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />

          <TextField
            required
            margin="dense"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUpdateDialog}>Close</Button>
          <Button onClick={handleUpdate}>Yes, do it.</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="xs" sx={{ mt: 2 }}>
        <Card sx={{ minWidth: 275 }} style={{
          maxHeight: "80vh",
          overflowY: "scroll",
        }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="h4" align="center">
              Todo List
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />

            <ToggleButtonGroup
              size="small"
              style={{ marginTop: '12px', display: 'flex', justifyContent: 'center' }}
              value={displayTodosType}
              exclusive
              onChange={changDisplayedType}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="All" aria-label="left aligned">
                All
              </ToggleButton>
              <ToggleButton value="Pending" aria-label="centered">
                Pending
              </ToggleButton>
              <ToggleButton value="Completed" aria-label="right aligned">
                Completed
              </ToggleButton>
            </ToggleButtonGroup>

            {todosJsx}

            <Grid container spacing={1} style={{ marginTop: '12px' }}>
              <Grid size={{ md: 4 }} style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Button
                  variant="contained"
                  size="small"
                  style={{ width: "100%", height: "100%", fontSize: "14px" }}
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.length === 0}
                >
                  Add
                </Button>
              </Grid>
              <Grid size={{ md: 8 }}>
                <TextField
                  id="outlined-basic"
                  label="Task Title"
                  variant="outlined"
                  size="small"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}