export const wsuri = "ws://52.79.86.10:8964";

export const hostIP = 'http://localhost:6464'; // the ip address of backend server
// export const hostIP = 'http://192.168.11.127:6464'

const apiURL = "/api";


const userURL = "/user";
const endPoint = `${hostIP}${apiURL}`;
export const userEndPoint = `${endPoint}${userURL}`
export const user_register_url = `${userEndPoint}/register`;
export const user_login_url = `${userEndPoint}/login`;
export const user_logout_url = `${userEndPoint}/logout`;
export const user_validate_token_url = token => `${userEndPoint}/validatetoken/?token=${token}`;
export const user_detail_rul = id => `${userEndPoint}/${id}`;

// item 
const itemURL = "/item";
export const itemEndPoint = `${endPoint}${itemURL}` ;
export const item_add_new_image_url = `${itemEndPoint}/image` ;
export const item_get_item_by_id = (itemId) => `${itemEndPoint}/${itemId}` ;
export const item_cart_url = token => `${itemEndPoint}/cart/?token=${token}` ;

// address 
const addressURL = "/address" ;
export const addressEndPoint = `${endPoint}${addressURL}` ;
export const address_url = token => `${addressEndPoint}/?token=${token}` ;

// order 
const orderURL = "/order" ;
export const orderEndPoint = `${endPoint}${orderURL}` ;
export const order_w_token_url = token => `${orderEndPoint}/?token=${token}` ;
export const get_order_detail_url = (token,order_id) => `${orderEndPoint}/?token=${token}&order_id=${order_id}` ;

