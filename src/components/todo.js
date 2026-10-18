import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext , useState} from 'react';
import { TodosContext } from '../contexts/todosContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



export default function Todo({todo}) {
  const [showDeleteAleart, setShowDeleteAlert] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);
  const [showUpdateAleart, setShowUpdateAlert] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({title : todo.Task_Title , details : todo.details});

  
  function  handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.iscomplited = !t.iscomplited;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleCheckDeleteClick() {
    setShowDeleteAlert(true);
  }

  function handleDeleteDialogClase() {
    setShowDeleteAlert(false);
  }

  function handleUpdateDialogClase() {
    setShowUpdateAlert(false);
  }

  function handleDelete() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteAlert(false);
  }

  function handleUpdate(){
    const updatedTodos = todos.map((t) => {
      if(t.id === todo.id){
        return {...t , Task_Title : updateTodo.title , details : updateTodo.details};
      }else{
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateAlert(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateClick() {
    setShowUpdateAlert(true);
  }

  return (
    <>
    <Dialog
        open={showDeleteAleart}
        onClose={handleDeleteDialogClase}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deletion cannot be undone once completed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClase}>Close </Button>
          <Button onClick={handleDelete}>Yes, delete it.</Button>
        </DialogActions>
      </Dialog>

    <Dialog
        open={showUpdateAleart}
        onClose={handleDeleteDialogClase}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit Task"}
        </DialogTitle>
        <DialogContent>

          <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Task Title"
              type="email"
              fullWidth
              variant="standard"
              value={updateTodo.title}
              onChange={(e) => {
                setUpdateTodo({ ...updateTodo, title: e.target.value });
              }}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="details"
              type="email"
              fullWidth
              variant="standard"
              value={updateTodo.details}
              onChange={(e) => {
                setUpdateTodo({ ...updateTodo, details: e.target.value });
              }}
            />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClase}>Close </Button>
          <Button onClick={handleUpdate}>Yes, do it.</Button>
        </DialogActions>
      </Dialog>


      <Card className="todoCard" sx={{ minWidth: 275, backgroundColor: "#283593", marginTop: "12px" }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Grid container spacing={1} style={{ color: "white" }}>
            <Grid size={{ xs: 6, md: 4 }} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

              <IconButton
                size="small"
                color="secondary"
                style={{ color: "red", backgroundColor: "white", border: "solid red 2px" }}
                aria-label="delete"
                className='iconButton'
                onClick={handleCheckDeleteClick}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>

              <IconButton
              onClick={handleUpdateClick}
                size="small"
                color="secondary"
                style={{ color: "#1799c8", backgroundColor: "white", border: "solid #1799c8 2px" }}
                aria-label="edit"
                className='iconButton'
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                color="secondary"
                style={{ 
                  color: todo.iscomplited ? "white" : "#8bc34a", 
                  backgroundColor: todo.iscomplited ? "#8bc34a" : "white", 
                  border: "solid  #8bc34a 2px" }}
                aria-label="complete"
                className='iconButton'
                onClick={() => {
                  handleCheckClick(todo.id);
                }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>

            </Grid>
            <Grid size={{ xs: 6, md: 8 }}>
              <Typography variant="h6" align="center"
              sx={{textDecoration: todo.iscomplited ? "line-through" : "none"}}>
                {todo.Task_Title}
              </Typography>
              <Typography variant="body2" align="center">
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}