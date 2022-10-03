import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { client } from './setupApollo';
import { ErrorPage } from './components/Misc/Error';
import { AdminPage } from './components/Admin/AdminPage';
import { PlayerManager } from './components/Admin/PlayerManager';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/> ,
    errorElement: <ErrorPage/>
  },
  {
    path: '/admin',
    element: <AdminPage/>,
    errorElement: <ErrorPage/>
    ,children: [
      {
        path: "players",
        element: <PlayerManager/>
      }
    ]
  }
])

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router ={router}/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
