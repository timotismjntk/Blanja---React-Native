/* eslint-disable prettier/prettier */
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
