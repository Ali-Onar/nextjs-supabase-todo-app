import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import useSupabase from '@/hooks/SupabaseContext';

type EditTodoProps = {
    open: boolean;
    todoId: number;
    handleClose: () => void;
    refreshTodos: () => Promise<void>;
};

const EditTodoModal = (props: EditTodoProps) => {
    const {
        open, todoId, handleClose, refreshTodos,
    } = props;

    const [input, setInput] = useState<string>('');

    const { userId } = useAuth();
    const supabase = useSupabase();

    const getTodo = async () => {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .eq('id', todoId)
            .single();

        if (error) {
            console.log(error.message);
        }

        if (data) {
            setInput(data.text);
        }
    };

    useEffect(() => {
        getTodo();
    }, [todoId]);

    const UpdatedTodo = async () => {
        const currentTime = new Date().getTime();
        const { error } = await supabase
            .from('todos')
            .update({ text: input, updated_at: currentTime })
            .eq('id', todoId)
            .eq('clerk_user_id', userId);

        if (error) {
            console.log(error.message);
        }

        toast.success('Todo updated successfully.');
        handleClose();
        refreshTodos();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
        >
            <DialogTitle>Edit Card</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <TextField
                    size="small"
                    fullWidth
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    value={input}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setInput(event.target.value); }}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
                <Button variant="outlined" onClick={() => { UpdatedTodo(); }}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTodoModal;
