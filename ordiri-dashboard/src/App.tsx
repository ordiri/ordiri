import React from 'react';
import Router from './router';
import './App.css';
import { DefaultLayout } from './layouts';
import theme from './theme';
import {Config} from './lib/client';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material';
import { mainListItems, secondaryListItems } from './components/menu-items';
import { Route, Routes } from 'react-router-dom';
import GenericResource from './pages/generic-resource';
import { PromiseComputeOrdiriComV1alpha1Api, PromiseCoreOrdiriComV1alpha1Api, PromiseNetworkOrdiriComV1alpha1Api, PromiseStorageOrdiriComV1alpha1Api } from './gen/types/PromiseAPI';
import CoreIcon from '@mui/icons-material/Hub';
import ComputeIcon from '@mui/icons-material/Computer';
import NetworkIcon from '@mui/icons-material/CloudQueue';
import StorageIcon from '@mui/icons-material/Storage';



function App() {

  const types: Record<string, any> = {
    "Core": {
      client: new PromiseCoreOrdiriComV1alpha1Api(Config),
      icon: <CoreIcon />
    },
    "Compute": {
      client: new PromiseComputeOrdiriComV1alpha1Api(Config),
      icon: <ComputeIcon />
    },
    "Network": {
      client: new PromiseNetworkOrdiriComV1alpha1Api(Config),
      icon: <NetworkIcon />
    },
    "Storage": {
      client: new PromiseStorageOrdiriComV1alpha1Api(Config),
      icon: <StorageIcon />
    }
  }
  const Layout = DefaultLayout
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Layout.Sidebar>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {Object.keys(types).map((key) => {
              return <ListItemButton key={key} href={key.toLowerCase()}>
                <ListItemIcon>
                  {types[key].icon}
                </ListItemIcon>
                <ListItemText primary={key} />
              </ListItemButton>
            })}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </Layout.Sidebar>
          <Layout.Content>
            <Routes>
              {Object.keys(types).map(key => {
                return <Route key={key} path={key.toLowerCase()} element={<GenericResource title={key} api={types[key].client} />} />
              })}
            </Routes>
          </Layout.Content>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
