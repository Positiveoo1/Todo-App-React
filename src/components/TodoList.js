
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust the import path as needed
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Container, List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  const todosCollectionRef = collection(db, 'todos');

  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(todosCollectionRef);
      setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTodos();
  }, [todosCollectionRef]);

  const createTodo = async (text) => {
    await addDoc(todosCollectionRef, { text });
  };

  const updateTodo = async (id, text) => {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, { text });
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
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
    updateTodo(editTodoId, editTodoText);
    setEditTodoId(null);
    setEditTodoText('');
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
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
          <ListItem key={todo.id}>
            <ListItemText primary={todo.text} />
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
    </Container>
  );
};

export default TodoList;