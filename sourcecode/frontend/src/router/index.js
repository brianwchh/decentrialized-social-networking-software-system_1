import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../containers/Home'
import Register from '../containers/Register'
import Login from '../containers/Login'
import Logout from '../containers/Logout'
import Profile from '../containers/Profile'
import AddNewDog from '../containers/AddNewDog'
import Blog from '../containers/Blog'
import ContactUs from '../containers/Contactus'
import Chat from '../containers/Chat'
import Shop from '../containers/Shop'
import PhotoAlbum from '../containers/PhotoAlbum'
import Following from '../containers/Following'
import Github from '../containers/Github'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
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
    path: '/addnewdog',
    name: 'AddNewDog',
    component: AddNewDog
  },

  {
    path: '/blog',
    name: 'blog',
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
    path: '/shop',
    name: 'Your Shop',
    component: Shop
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
