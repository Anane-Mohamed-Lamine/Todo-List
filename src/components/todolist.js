import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Todo from './todo';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { useState , useContext , useEffect } from 'react';
import { TodosContext } from '../contexts/todosContext';

export default function Todolist() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const completedTodos = todos.filter((t) => {return t.iscomplited});
  const notcompletedTodos = todos.filter((t) => {return !t.iscomplited});
  const [displayTodosType, setDisplayTodosType] = useState("All");
  let todosToBeDisplayed = todos;
  if(displayTodosType === "Completed"){
    todosToBeDisplayed = completedTodos;
  }else if(displayTodosType === "Pending"){
    todosToBeDisplayed = notcompletedTodos;
  }else{
    todosToBeDisplayed = todos;
  }
  const todosJsx = todosToBeDisplayed.map((t) => {
    return (
      <Todo key={t.id} todo={t} />
    );
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
      if (storageTodos) {
        setTodos(storageTodos);
      }
  }, []);

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
  }

  function changDisplayedType(e) {
    setDisplayTodosType(e.target.value);
  }
  //const storageTodos = JSON.parse(localStorage.getItem("todos"));

    return (
    <>
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
                disabled={titleInput.length == 0}
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