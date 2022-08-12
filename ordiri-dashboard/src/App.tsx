import React from 'react';
import Router from './router';
import './App.css';
import { DefaultLayout } from './layouts';
import theme from './theme';
import { Divider, Grid, Paper, ThemeProvider } from '@mui/material';
import { mainListItems, secondaryListItems } from './components/menu-items';



function App() {
  const Layout = DefaultLayout
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Layout.Sidebar>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </Layout.Sidebar>
          <Layout.Content>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  Chart Here
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  Deposits Hree
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  orders here
                </Paper>
              </Grid>
            </Grid>
          </Layout.Content>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
