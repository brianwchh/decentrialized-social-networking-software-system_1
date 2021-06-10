const deploy = true ;

export const wsuri = deploy === true ?    "wss://decensormedia.org/websocket" : "ws://localhost:6464" ;
export const my_wsuri = deploy === true ? "wss://decensormedia.org/websocket" : "ws://localhost:6464" ;
// export const wsuri = "ws://localhost:6464";

export const hostDomain = (deploy === true) ? 'https://decensormedia.org' : 'http://localhost' ;
export const hostIP = (deploy === true ) ? '96.45.184.199' : 'localhost' ;
export const hostPort = (deploy === true ) ? '6464' : '6464' ;


export const cloudServer = deploy === true ? 'https://decensormedia.org' : 'http://localhost' ;
export const cloudServerPort = deploy === true ? '6464' : '6464' ;

const apiURL = "/api";


const userURL = "/user";
const endPoint = (deploy === true) ? `${hostDomain}${apiURL}` : `${hostDomain}:${hostPort}${apiURL}`;
// const endPoint = `${hostDomain}:${hostPort}${apiURL}`;
export const userEndPoint = `${endPoint}${userURL}`
// export const user_register_url = `${userEndPoint}/register/?action=registration`;
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

// food 
const foodURL = "/food" ;
export const foodEndPoint = `${endPoint}${foodURL}` ;
export const food_add_new_category = (token) => `${foodEndPoint}/addnewcategory/?token=${token}` ;
export const food_insert_new_food = (token) => `${foodEndPoint}/insertnewfood/?token=${token}` ;
export const food_get_category_list = `${foodEndPoint}/getcategorylist` ;
export const food_add_new_image_url = `${foodEndPoint}/image` ;

// blog 
const blogURL = "/blog"
export const blogEndPoint = `${endPoint}${blogURL}` ;
export const blog_newBlog_url = `${endPoint}${blogURL}`;

// Contact 
const contactURL = "/contact"
export const contactEndPoint = `${endPoint}${contactURL}` ;

// ChatRoom
const ChatRoomURL = "/chatroom"
export const chatRoomEndPoint = `${endPoint}${ChatRoomURL}` ;

const MessageURL = "/message"
export const messageEndPoint = `${endPoint}${MessageURL}`


// subscription
const SubscriptionURL = "/subscription"
export const subscriptionENdPoint = `${endPoint}${SubscriptionURL}`




