import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen.jsx';
import CartScreen from './Screens/CartScreen';
import { Provider } from 'react-redux';
import store from './store';
import { HelmetProvider } from 'react-helmet-async';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PrivateRoute from './Components/PrivateRoute';
import AdminRoute from './Components/AdminRoute';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
import OrderListScreen from './Screens/Admin/OrderListScreen';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />

      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        {/* <Route path='/admin/productlist' element={<ProductListScreen />} /> */}
        {/* <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} /> */}
      </Route>

    </Route>
  ))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>

      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);


