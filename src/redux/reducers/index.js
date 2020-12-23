import {combineReducers} from 'redux';

import auth from './auth';
import allProduct from './allProduct';
import NewProduct from './newProduct';
import popularProduct from './popularProduct';
import profile from './profile';
import cart from './cart';
import detailproduct from './detailProduct';
import categoryProduct from './categoryProduct';
import address from './address';
import orders from './orders';
import checkout from './checkout';

export default combineReducers({
  auth,
  allProduct,
  NewProduct,
  popularProduct,
  profile,
  cart,
  detailproduct,
  categoryProduct,
  address,
  orders,
  checkout,
});


// const rootReducer = (state, action) => {
//   console.log(action);
//   if (action.type === 'LOGOUT_USER') {
//     // console.log('true');
//     state = undefined;
//     // return appReducer(undefined, action);
//   }
//   // console.log(state);
//   return appReducer(state, action);
// };

// export default rootReducer;
