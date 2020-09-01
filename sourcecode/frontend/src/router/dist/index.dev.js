"use strict";

var _interopRequireDefault = require("/media/kimsong/u2/project/p2pChat/frontend/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../containers/Home"));

var _Register = _interopRequireDefault(require("../containers/Register"));

var _Login = _interopRequireDefault(require("../containers/Login"));

var _Logout = _interopRequireDefault(require("../containers/Logout"));

var _Profile = _interopRequireDefault(require("../containers/Profile"));

var _Blog = _interopRequireDefault(require("../containers/Blog"));

var _Contactus = _interopRequireDefault(require("../containers/Contactus"));

var _Chat = _interopRequireDefault(require("../containers/Chat"));

var _PhotoAlbum = _interopRequireDefault(require("../containers/PhotoAlbum"));

var _Following = _interopRequireDefault(require("../containers/Following"));

var _Github = _interopRequireDefault(require("../containers/Github"));

var _addNewItem = _interopRequireDefault(require("../containers/addNewItem"));

var _addNewImg2Item = _interopRequireDefault(require("../containers/addNewImg2Item"));

var _itemList = _interopRequireDefault(require("../containers/itemList"));

var _itemDetail = _interopRequireDefault(require("../containers/itemDetail"));

_vue.default.use(_vueRouter.default);

var routes = [{
  path: '/',
  name: 'Home',
  component: _Home.default
}, {
  path: '/register',
  name: 'Register',
  component: _Register.default
}, {
  path: '/login',
  name: 'Login',
  component: _Login.default
}, {
  path: '/logout',
  name: 'Logout',
  component: _Logout.default
}, {
  path: '/profile',
  name: 'Profile',
  component: _Profile.default
}, {
  path: '/item/addnewitem',
  name: 'AddNewItem',
  component: _addNewItem.default
}, {
  path: '/item/:itemId/addnewimage',
  name: 'addNewImg2Item',
  component: _addNewImg2Item.default
}, {
  path: '/item',
  name: 'itemList',
  component: _itemList.default
}, {
  path: '/item/:itemId',
  name: 'itemDetail',
  component: _itemDetail.default
}, {
  path: '/blog',
  name: 'Blog',
  component: _Blog.default
}, {
  path: '/contactus',
  name: 'ContactUs',
  component: _Contactus.default
}, {
  path: '/chat',
  name: 'Chat',
  component: _Chat.default
}, {
  path: '/photoalbum',
  name: 'Photo album',
  component: _PhotoAlbum.default
}, {
  path: '/following',
  name: 'Following',
  component: _Following.default
}, {
  path: '/github',
  name: 'Github',
  component: _Github.default
}];
var router = new _vueRouter.default({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports.default = _default;