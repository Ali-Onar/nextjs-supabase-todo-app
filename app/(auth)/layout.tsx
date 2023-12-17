import Box from '@mui/material/Box';

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
    >
        {children}
    </Box>
);

export default AuthLayout;
