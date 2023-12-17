'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Stack, InputAdornment, Checkbox, Divider, IconButton, List, ListItem, ListItemText, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, formatDistanceToNow } from 'date-fns';
import { Database } from '@/utils/types/database.types';
import { useAuth } from '@clerk/nextjs';
import supabaseClient from '@/utils/supabaseClient';

export type TodosType = Database['public']['Tables']['todos']['Row'];

const currentTime = new Date().getTime();

const Todos = () => {
    const [todos, setTodos] = useState<TodosType[]>([]);
    const [input, setInput] = useState<string>('');
    const [isEdited, setIsEdited] = useState(false);
    const [editedId, setEditedId] = useState<number>(0);

    const { getToken, userId } = useAuth();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const getTodos = async () => {
        const accessToken = await getToken({ template: 'supabase' });
        const supabase = await supabaseClient(accessToken as string);

        if (!userId) return;

        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('id', { ascending: false })
            .eq('clerk_user_id', userId);

        if (error) {
            console.log(error.message);
        }

        setTodos(data as TodosType[]);
    };

    useEffect(() => {
        getTodos();
    }, []);

    const handleButtonClick = async () => {
        const accessToken = await getToken({ template: 'supabase' });
        const supabase = await supabaseClient(accessToken as string);
        if (!userId) return;

        if (!isEdited) {
            const { error } = await supabase
                .from('todos')
                .insert([
                    {
                        text: input,
                        completed: false,
                        clerk_user_id: userId,
                        created_at: currentTime,
                        updated_at: currentTime,
                    },
                ]);

            if (error) {
                console.log(error.message);
            }
        } else {
            const { error } = await supabase
                .from('todos')
                .update({ text: input, updated_at: currentTime })
                .eq('id', editedId);

            if (error) {
                console.log(error.message);
            }
        }

        getTodos();
        setInput('');
        setIsEdited(false);
    };

    const handleToggleComplete = async (id: number) => {
        const accessToken = await getToken({ template: 'supabase' });
        const supabase = await supabaseClient(accessToken as string);

        const todo = todos.find((todo) => todo.id === id);

        const updatedCompleted = !todo?.completed;

        const { error } = await supabase
            .from('todos')
            .update({ completed: updatedCompleted, updated_at: currentTime })
            .eq('id', id);

        if (error) {
            console.log(error.message);
        }

        getTodos();
    };

    const handleDelete = async (id: number) => {
        const accessToken = await getToken({ template: 'supabase' });
        const supabase = await supabaseClient(accessToken as string);

        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);

        if (error) {
            console.log(error.message);
        }

        getTodos();
    };

    const handleEdit = (id: number) => {
        const todoToEdit = todos.find((todo) => todo.id === id);

        if (todoToEdit) {
            setInput(todoToEdit.text);
            setEditedId(id);
            setIsEdited(true);
        }
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
                                                    <IconButton edge="end" onClick={() => { handleEdit(todo.id); }}>
                                                        <EditIcon color="secondary" />
                                                    </IconButton>
                                                    <IconButton edge="end" onClick={() => { handleDelete(todo.id); }}>
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                </>
                                            )}
                                        >
                                            <Checkbox
                                                edge="start"
                                                checked={todo.completed}
                                                tabIndex={-1}
                                                disableRipple
                                                onChange={() => { handleToggleComplete(todo.id); }}
                                            />
                                            <ListItemText
                                                primary={todo.text}
                                                secondary={`Updated ${formatDistanceToNow(new Date(todo.updated_at as number))} ago, ${format(new Date(todo.updated_at as number), 'HH.mm')}`}
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
