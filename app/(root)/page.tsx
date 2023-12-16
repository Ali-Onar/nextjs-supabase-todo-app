'use client';

import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Stack, InputAdornment, Checkbox, Divider, IconButton, List, ListItem, ListItemText, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, formatDistanceToNow } from 'date-fns';

type TodoItem = {
    text: string,
    completed: boolean,
    id: number,
};

const Todos = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [input, setInput] = useState<string>('');
    const [isEdited, setIsEdited] = useState(false);
    const [editedId, setEditedId] = useState<number>(0);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleButtonClick = () => {
        if (!isEdited) {
            setTodos([...todos, { text: input, completed: false, id: new Date().getTime() }]);
            setInput('');
            setIsEdited(false);
        } else {
            setTodos([...todos, { text: input, completed: false, id: editedId }]);
        }

        setInput('');
        setIsEdited(false);
    };

    const handleToggleComplete = (id: number) => {
        const updated = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }

            return todo;
        });
        setTodos(updated);
    };

    const handleDelete = (id: number) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const handleEdit = (id: number) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        const editValue = todos.find((todo) => todo.id === id);
        if (editValue) {
            setInput(editValue.text);
        }

        setTodos(newTodos);
        setEditedId(id);
        setIsEdited(true);
    };

    return (
        <Grid container spacing={2} sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <Grid item md={6}>
                <Card sx={{ minWidth: 275, boxShadow: '0 0 5px 1px' }}>
                    <CardContent>
                        <Stack spacing={4}>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                TODO CRUD APP
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item md={12} display="flex">
                                    <TextField
                                        size="small"
                                        sx={{ width: '70%', mr: 2 }}
                                        id="outlined-basic"
                                        label="Create Todo"
                                        variant="outlined"
                                        placeholder="Enter task"
                                        value={input}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AddIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button variant="contained" onClick={handleButtonClick} disabled={!input}>
                                        {isEdited ? 'Edit Todo' : 'Add Todo'}
                                    </Button>
                                </Grid>
                            </Grid>
                            <List>
                                {todos.map((todo) => (
                                    <div key={todo.id}>
                                        <ListItem
                                            secondaryAction={(
                                                <>
                                                    <IconButton edge="end" onClick={() => handleEdit(todo.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton edge="end" onClick={() => handleDelete(todo.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            )}
                                        >
                                            <Checkbox
                                                edge="start"
                                                checked={todo.completed}
                                                tabIndex={-1}
                                                disableRipple
                                                onChange={() => handleToggleComplete(todo.id)}
                                            />
                                            <ListItemText
                                                primary={todo.text}
                                                secondary={`Updated ${formatDistanceToNow(new Date(todo.id))} ago, ${format(new Date(todo.id), 'HH.mm')}`}
                                                sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))}
                            </List>

                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Todos;
