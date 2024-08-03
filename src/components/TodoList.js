import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Container, List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTodos } from './TodoContext';

const TodoList = () => {
  const { todos, setTodos, editTodoId, setEditTodoId, editTodoText, setEditTodoText } = useTodos();
  const todosCollectionRef = collection(db, 'todos');

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await getDocs(todosCollectionRef);
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    getTodos();
  }, [todosCollectionRef, setTodos]);

  const createTodo = async (todo) => {
    try {
      await addDoc(todosCollectionRef, todo);
      setTodos((prevTodos) => [...prevTodos, todo]); // Update state optimistically
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await updateDoc(todoDoc, updatedTodo);
      setTodos((prevTodos) => prevTodos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo)); // Update state optimistically
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const todoDoc = doc(db, 'todos', id);
      await deleteDoc(todoDoc);
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id)); // Update state optimistically
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    createTodo({ text: newTodo });
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
