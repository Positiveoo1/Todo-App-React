import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; 
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { Container, List, ListItem, ListItemText, IconButton, TextField, Button, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddTaskIcon from '@mui/icons-material/AddTask';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const todosCollectionRef = collection(db, 'todos');

  useEffect(() => {
    const getTodos = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(todosCollectionRef, where('uid', '==', user.uid)); // Filter todos by the current user's uid
        const data = await getDocs(q);
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };

    getTodos();
  }, [todosCollectionRef]);

  const createTodo = async (text) => {
    const user = auth.currentUser;
    if (user) {
      await addDoc(todosCollectionRef, { 
        text, 
        completed: false, 
        uid: user.uid // Store the user's uid
      });
      setSnackbarMessage('Task added successfully');
      setSnackbarOpen(true);
    }
  };

  const updateTodo = async (id, updatedFields) => {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, updatedFields);
    setSnackbarMessage('Task updated successfully');
    setSnackbarOpen(true);
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
    setSnackbarMessage('Task deleted successfully');
    setSnackbarOpen(true);
  };

  const handleAddTodo = () => {
    createTodo(newTodo);
    setNewTodo('');
  };

  const handleEditTodo = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const handleUpdateTodo = () => {
    updateTodo(editTodoId, { text: editTodoText });
    setEditTodoId(null);
    setEditTodoText('');
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const toggleCompleteTodo = (todo) => {
    const newStatus = !todo.completed;
    updateTodo(todo.id, { completed: newStatus });

    // Show a notification when the task status is changed
    setSnackbarMessage(newStatus ? 'Task marked as completed' : 'Task marked as not completed');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <TextField
        label="Add New Todo"
        fullWidth
        margin="normal"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add Todo
      </Button>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'green' : 'red',
            }}
          >
            <ListItemText primary={todo.text} />
            <IconButton edge="end" onClick={() => toggleCompleteTodo(todo)}>
              {todo.completed ? <RemoveCircleOutlineIcon /> : <AddTaskIcon />}
            </IconButton>
            <IconButton edge="end" onClick={() => handleEditTodo(todo.id, todo.text)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {editTodoId && (
        <div>
          <TextField
            label="Edit Todo"
            fullWidth
            margin="normal"
            value={editTodoText}
            onChange={(e) => setEditTodoText(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleUpdateTodo}>
            Update Todo
          </Button>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TodoList;
