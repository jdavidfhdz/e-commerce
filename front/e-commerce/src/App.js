import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Welcome from './pages/Welcome';
import Provider from './pages/Provider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/providers",
    element: <Provider />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
