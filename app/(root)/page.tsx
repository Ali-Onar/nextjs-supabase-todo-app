import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, List, ListItem, ListItemText, Grid, Container } from '@mui/material';
import Link from 'next/link';

const technologies = [
    { name: 'Next.js 14 App Router', description: 'Modern front-end routing.' },
    { name: 'Supabase for DB', description: 'Fast and reliable database management with PostgreSQL.' },
    { name: 'Clerk for Auth', description: 'User authentication and management.' },
    { name: 'Next.js Route Handler', description: 'Effective routing for server-side and API path operations.' },
    { name: 'Material UI', description: 'Visual and user-friendly interface components.' },
    { name: 'CRUD Operations', description: 'Create, Read, Update, Delete operations.' },
    { name: 'TypeScript', description: 'JavaScript development with strong type checking.' },
    { name: '@dnd-kit/core', description: 'Comprehensive tools for drag and drop functionality.' },
];

const HomePage = () => (
    <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Basic Todos
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Traditional todo list management. Simple and practical.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href="/basic-todos" passHref>
                            <Button size="small">Explore</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Drag & Drop Todos
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Manage your todos by dragging and dropping. More interactive and fun.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href="/dnd-todos" passHref>
                            <Button size="small">Explore</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Technologies Used in Our Project
                </Typography>
                <List>
                    {technologies.map((tech, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={tech.name} secondary={tech.description} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    </Container>
);

export default HomePage;
