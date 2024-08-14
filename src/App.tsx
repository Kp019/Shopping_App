// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPortal from './Pages/adminPortal';
import ProductList from './Pages/ProductList';
import Login from './Components/Login';
import Cart from './Pages/Cart';
import ShowProfile from './Pages/ShowProfile';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ProductDetails from './Components/ProductDetails';
import ProductAnalytics from './Components/ProductAnalitics';
// import Test from './Pages/Test';


const App = () => {

  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);
  // console.log(products)

  // useEffect(() => {

  //   dispatch(fetchProducts());

  // }, [dispatch]);

  console.log(products);
  


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/profile" element={<ShowProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/dashboard' element={<ProductAnalytics/>} />
        {/* <Route path='/test' element={<Test/>}/> */}
      </Routes>
    </Router>
  );
};

export default App;