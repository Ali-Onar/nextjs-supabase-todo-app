import React from 'react';
import { Typography, List, ListItem, ListItemText, Grid, Container } from '@mui/material';

const technologies = [
    { name: 'Next.js 14 App Router', description: 'Modern front-end routing.' },
    { name: 'Supabase for DB', description: 'Fast and reliable database management with PostgreSQL.' },
    { name: 'RLS in Supabase', description: 'Row-level security for data protection.' },
    { name: 'Clerk for Auth', description: 'User authentication and management.' },
    { name: 'Material UI', description: 'Visual and user-friendly interface components.' },
    { name: 'CRUD Operations', description: 'Create, Read, Update, Delete operations.' },
    { name: 'TypeScript', description: 'JavaScript development with strong type checking.' },
    { name: '@dnd-kit/core', description: 'Comprehensive tools for drag and drop functionality.' },
    { name: 'Sentry for Error Tracking', description: 'Real-time error tracking and monitoring.' },
];

const HomePage = () => (
    <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Technologies Used in Our Project
                </Typography>
                <List>
                    {technologies.map((tech) => (
                        <ListItem key={tech.name}>
                            <ListItemText primary={tech.name} secondary={tech.description} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        </Grid>
    </Container>
);

export default HomePage;
