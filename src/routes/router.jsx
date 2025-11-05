import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Private from "../private/Private";
import MyProducts from "../pages/MyProducts";
import Bids from "../pages/Bids";
import CreateProducts from "../pages/CreateProducts";
import Loader from "../components/loader/Loader";
import Details from "../pages/Details";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
                loader: ()=> fetch('http://localhost:3000/latest-products'),
                hydrateFallbackElement: <Loader></Loader>
            },
            {
                path: 'all-products',
                Component: AllProducts,
                loader: ()=> fetch('http://localhost:3000/products'),
                hydrateFallbackElement: <Loader></Loader>
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'my-products',
                element: <Private><MyProducts></MyProducts></Private>
            },
            {
                path: 'my-bids',
                element: <Private><Bids></Bids></Private>
            },
            {
                path: 'create-products',
                element: <Private><CreateProducts></CreateProducts></Private>
            },
            {
                path: 'product-details/:id',
                loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
                element: <Private><Details></Details></Private>,
            }
        ]
    }
]);

export default router;