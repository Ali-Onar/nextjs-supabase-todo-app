'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Stack, InputAdornment, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Database } from '@/utils/types/database.types';
import { useAuth } from '@clerk/nextjs';
import TodoList from '@/components/todos/TodoList';

export type TodosType = Database['public']['Tables']['todos']['Row'];

const currentTime = new Date().getTime();

const apiHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const Todos = () => {
    const [todos, setTodos] = useState<TodosType[]>([]);
    const [input, setInput] = useState<string>('');
    const [isEdited, setIsEdited] = useState(false);
    const [editedId, setEditedId] = useState<number>(0);

    const { userId } = useAuth();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const getTodos = async () => {
        const fetchingTodos = await fetch('/api/todos', {
            method: 'GET',
            headers: apiHeaders,
        });

        const apiData = await fetchingTodos.json();
        setTodos(apiData as TodosType[]);
    };

    useEffect(() => {
        getTodos();
    }, []);

    const handleButtonClick = async () => {
        if (!isEdited) {
            const createdTodoResponse = await fetch('/api/todos', {
                method: 'POST',
                headers: apiHeaders,
                body: JSON.stringify({
                    insertData: {
                        text: input, completed: false, created_at: currentTime, updated_at: currentTime, clerk_user_id: userId,
                    },
                }),
            });
            if (createdTodoResponse.ok) console.log('Created todo.');
        } else {
            const updatedTodoResponse = await fetch(`/api/todos?id=${editedId}`, {
                method: 'PUT',
                headers: apiHeaders,
                body: JSON.stringify({ updatedData: { text: input, updated_at: currentTime } }),
            });
            if (updatedTodoResponse.ok) console.log('Updated todo.');
        }

        getTodos();
        setInput('');
        setIsEdited(false);
    };

    return (
        <Grid container spacing={2} sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <Grid item md={6}>
                <Card sx={{ minWidth: 275, boxShadow: '0 0 5px 1px' }}>
                    <CardContent>
                        <Stack spacing={4}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
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
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleButtonClick();
                                            }
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AddIcon color="success" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button variant="contained" onClick={() => { handleButtonClick(); }} disabled={!input}>
                                        {isEdited ? 'Edit Todo' : 'Add Todo'}
                                    </Button>
                                </Grid>
                            </Grid>

                            <TodoList
                                todos={todos}
                                setInput={setInput}
                                setEditedId={setEditedId}
                                setIsEdited={setIsEdited}
                                getTodos={getTodos}
                            />

                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Todos;
