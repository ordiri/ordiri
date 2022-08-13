import Router from './router';
import './App.css';
import { DefaultLayout } from './layouts';
import theme from './theme';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material';
import { mainListItems, secondaryListItems } from './components/menu-items';
import { Route, Routes } from 'react-router-dom';
import GenericResource from './pages/generic-resource';
import CoreIcon from '@mui/icons-material/Hub';
import ComputeIcon from '@mui/icons-material/Computer';
import NetworkIcon from '@mui/icons-material/CloudQueue';
import StorageIcon from '@mui/icons-material/Storage';
import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolume, ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus, ComputeOrdiriComV1alpha1Api, Configuration, CoreOrdiriComV1alpha1Api, NetworkOrdiriComV1alpha1Api, StorageOrdiriComV1alpha1Api } from '@ordiri/client-typescript';
import CoreResourcesPage from './pages/core';
import ordiriConfig from './ordiri-config';

function App() {
  const types: Record<string, any> = {
    "Core": {
      component: CoreResourcesPage,
      icon: <CoreIcon />,
    },
    "Compute": {
      client: new ComputeOrdiriComV1alpha1Api(ordiriConfig),
      icon: <ComputeIcon />,
      columns: [{
        label: "Name",
        selector: "metadata.name",
      }, {
          label: "Networks",
          selector: "spec.networkInterfaces",
          formatter: (res: Array<{ mac: string, network: string, subnet: string }>) => {
            if (!Array.isArray(res)) {
              return ""
            }

            return res.map(it => {
              return <div>{it.network}/{it.subnet}@{it.mac}</div>
            })
          }
        }, {
          label: "Volumes",
          selector: "spec.volumes",
        formatter: (res: Array<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolume>) => {
            if (!Array.isArray(res)) {
              return ""
            }

            return res.map(it => {
              return <div>{it.name}/{it.device}/{it.hostLocal?.size}</div>
            })
          }
        }]
    },
    "Network": {
      client: new NetworkOrdiriComV1alpha1Api(ordiriConfig),
      icon: <NetworkIcon />,
      columns: [{
          label: "Name",
          selector: "metadata.name",
        }, {
          label: "CIDR",
          selector: "spec.cidr",
        }]
    },
    "Storage": {
      client: new StorageOrdiriComV1alpha1Api(ordiriConfig),
      icon: <StorageIcon />,
      columns: [{
          label: "Name",
          selector: "metadata.name",
        }, {
          label: "Size",
          selector: "spec.size",
        }]
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
            {Object.entries(types).map(([key, obj]) => {
              return <ListItemButton key={key} href={key.toLowerCase()}>
                <ListItemIcon>
                  {obj.icon}
                </ListItemIcon>
                <ListItemText primary={key} />
              </ListItemButton>
            })}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </Layout.Sidebar>
          <Layout.Content>
            <Routes>
              {Object.entries(types).map(([key, obj]) => {
                const ComponentElement: typeof GenericResource = (() => {
                  if (obj.component) {
                    return obj.component
                  }
                  
                   return  GenericResource
                })()
                
              return <Route key={key} path={key.toLowerCase()} element={<ComponentElement columns={obj.columns} title={key} api={obj.client} />} />
              })}
            </Routes>
          </Layout.Content>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
