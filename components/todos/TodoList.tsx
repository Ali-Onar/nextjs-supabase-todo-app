import { AlertColor, Checkbox, Divider, IconButton, List, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, formatDistanceToNow } from 'date-fns';
import { Database } from '@/utils/types/database.types';
import React from 'react';

const currentTime = new Date().getTime();

const apiHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export type TodosType = Database['public']['Tables']['todos']['Row'];

type TodoListProps = {
    todos: TodosType[];
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setEditedId: React.Dispatch<React.SetStateAction<number>>;
    setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
    getTodos: () => Promise<void>;
    setMessageObject: React.Dispatch<React.SetStateAction<{ message: string, type: AlertColor | undefined } | undefined>>;
};

const TodoList = (props: TodoListProps) => {
    const {
        todos, setInput, setEditedId, setIsEdited, getTodos = () => {}, setMessageObject,
    } = props;

    const handleToggleComplete = async (id: number) => {
        const selectedTodo = todos.find((todo) => todo.id === id);

        const updatedCompleted = !selectedTodo?.completed;

        const updatedTodoResponse = await fetch(`/api/todos?id=${id}`, {
            method: 'PUT',
            headers: apiHeaders,
            body: JSON.stringify({ updatedData: { completed: updatedCompleted, updated_at: currentTime } }),
        });

        if (updatedTodoResponse.ok) setMessageObject({ message: 'Todo has been successfully updated.', type: 'success' });

        getTodos();
    };

    const handleDelete = async (id: number) => {
        const deletedTodoResponse = await fetch(`/api/todos?id=${id}`, {
            method: 'DELETE',
            headers: apiHeaders,
            body: JSON.stringify({ id }),
        });

        if (deletedTodoResponse.ok) setMessageObject({ message: 'Todo has been successfully deleted.', type: 'error' });

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
        <List>
            {todos.map((todo) => (
                <div key={todo.id}>
                    <ListItem
                        secondaryAction={(
                            <>
                                <IconButton edge="end" onClick={() => { handleEdit(todo.id); }}>
                                    <EditIcon color="success" />
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
    );
};

export default TodoList;
