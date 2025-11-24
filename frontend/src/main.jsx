import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Container, Typography, AppBar, Toolbar } from '@mui/material';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PowerFolio</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to PowerFolio
        </Typography>
        <Button variant="contained" color="primary">
          Submit Project
        </Button>
      </Container>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
