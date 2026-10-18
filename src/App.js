import './App.css';
import Todolist from './components/todolist';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { TodosContext } from './contexts/todosContext';
import { createTheme , ThemeProvider } from '@mui/material/styles';

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

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;