
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AllProductsPage from './Components/AllproductsPage';
import ProductDetailsPage from './Components/ProductDetailsPage';

function App() {
  return (
    <Router>
        <Route path="/" AllProductsPage={AllProductsPage} />
        <Route path="/product/:productId" ProductDetailsPage={ProductDetailsPage} />
    </Router>
  );
}

export default App;
