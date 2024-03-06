import React from 'react';
import { Typography, List, ListItem, ListItemText, Grid, Container } from '@mui/material';

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

const pagesDescription = [
    { title: 'Basic Todos', description: 'Client Side Rendered. Route Handler is used for CRUD operations.' },
    { title: 'D&D Todos', description: 'Client Side Rendered. The createClerkSupabaseClient function is used for CRUD operations.' },
    { title: 'Server Side Test', description: 'Server Side Rendered. getSupabaseServer function is used.' },
];

const HomePage = () => (
    <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                    About Pages:
                </Typography>
                <List>
                    {pagesDescription.map((tech, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={tech.title} secondary={tech.description} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={12} md={6}>
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
