import './App.css';
import Todolist from './components/todolist';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { TodosContext } from './contexts/todosContext';
import { createTheme , ThemeProvider } from '@mui/material/styles';
import  MySnackBar from './components/MySnackBar';
import { ToastContext } from './contexts/ToastContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3d05a6', // Blue color
    },
    secondary: {
      main: '#dc004e', // Pink color
    },
  },
})
const initialtodos = [
  {
    id : uuidv4(),
    Task_Title : "First Task",
    details : "This is the first task",
    iscomplited : false
  },
  {
    id : uuidv4(),
    Task_Title : "Second Task",
    details : "This is the second task",
    iscomplited : false
  },
  {
    id : uuidv4(),
    Task_Title : "Third Task",
    details : "This is the third task",
    iscomplited : false
  }
]


function App() {
  const [todos, setTodos] = useState(initialtodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");


  function showHideToast(message){
    setMessage(message); 
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    } , 2000 )
  }
  return (
    <>
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{ showHideToast }}>
      <div
        className="App"
        style={{
          backgroundColor: 'lightgray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <Todolist />
        </TodosContext.Provider>
      </div>
      </ToastContext.Provider>
    </ThemeProvider>
    <MySnackBar open={open} message={message}/>
    </>
  );
}

export default App;