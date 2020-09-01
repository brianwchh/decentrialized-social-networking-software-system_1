import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../containers/Home'
import Register from '../containers/Register'
import Login from '../containers/Login'
import Logout from '../containers/Logout'
import Profile from '../containers/Profile'
import Blog from '../containers/Blog'
import ContactUs from '../containers/Contactus'
import Chat from '../containers/Chat'
import PhotoAlbum from '../containers/PhotoAlbum'
import Following from '../containers/Following'
import Github from '../containers/Github'
import AddNewItem from '../containers/addNewItem'
import addNewImg2Item from '../containers/addNewImg2Item'
import itemList from '../containers/itemList'
import itemDetail from '../containers/itemDetail'
import cartItemList from '../containers/cartItemList'
import  orderDetail     from '../containers/orderDetail'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },

  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },

  {
    path: '/item/addnewitem',
    name: 'AddNewItem',
    component: AddNewItem
  },

  {
    path: '/item/:itemId/addnewimage',
    name: 'addNewImg2Item',
    component: addNewImg2Item
  },

  {
    path: '/item',
    name: 'itemList',
    component: itemList
  },

  {
    path: '/item/:itemId',
    name: 'itemDetail',
    component: itemDetail
  },

  {
    path: '/order/:orderId',
    name: 'orderDetail',
    component: orderDetail
  },

  {
    path: '/cartitems',
    name: 'cartItemList',
    component: cartItemList
  },

  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },

  {
    path: '/contactus',
    name: 'ContactUs',
    component: ContactUs
  },

  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },

  {
    path: '/photoalbum',
    name: 'Photo album',
    component: PhotoAlbum
  },

  {
    path: '/following',
    name: 'Following',
    component: Following
  },

  {
    path: '/github',
    name: 'Github',
    component: Github
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
