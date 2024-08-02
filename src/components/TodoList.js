import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Container, List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const todosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      await addDoc(collection(db, 'todos'), { text: newTodo });
      setNewTodo('');
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const todosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const handleUpdateTodo = async () => {
    if (editTodoText.trim() !== '') {
      await updateDoc(doc(db, 'todos', editTodoId), { text: editTodoText });
      setEditTodoId(null);
      setEditTodoText('');
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const todosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    }
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
