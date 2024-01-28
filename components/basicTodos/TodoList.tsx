import { Checkbox, Divider, IconButton, List, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, formatDistanceToNow } from 'date-fns';
import React from 'react';
import { TodosType } from '@/utils/types/helper.types';
import toast from 'react-hot-toast';

const apiHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

type TodoListProps = {
    todos: TodosType[];
    setInput: React.Dispatch<React.SetStateAction<string>>;
    setEditedId: React.Dispatch<React.SetStateAction<number>>;
    setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
    getTodos: () => Promise<void>;
};

const TodoList = (props: TodoListProps) => {
    const {
        todos, setInput, setEditedId, setIsEdited, getTodos = () => {},
    } = props;

    const handleToggleComplete = async (id: number) => {
        const currentTime = new Date().getTime();
        const selectedTodo = todos.find((todo) => todo.id === id);

        const updatedCompleted = !selectedTodo?.completed;

        const updatedTodoResponse = await fetch(`/api/todos?id=${id}`, {
            method: 'PUT',
            headers: apiHeaders,
            body: JSON.stringify({ updatedData: { completed: updatedCompleted, updated_at: currentTime } }),
        });

        if (updatedTodoResponse.ok) toast.success('Todo updated successfully.');

        getTodos();
    };

    const handleDelete = async (id: number) => {
        const deletedTodoResponse = await fetch(`/api/todos?id=${id}`, {
            method: 'DELETE',
            headers: apiHeaders,
        });

        if (deletedTodoResponse.ok) toast.success('Todo deleted successfully.');

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
            {todos?.map((todo) => (
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
                            secondary={`Updated ${formatDistanceToNow(new Date(todo.updated_at))} ago, ${format(new Date(todo.updated_at), 'HH.mm')}`}
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
