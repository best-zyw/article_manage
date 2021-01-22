import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/categories'
import Articles from '../views/articles'
import Settings from '../views/settings'
import Users from '../views/users'
import AddCategory from '../components/categories/addCategory'
import Edit from '../components/categories/edit'
import AddArticle from '../components/articles/addArticle'
import articleEdit from '../components/articles/edit'
import Addusers from '../components/users/add'
import usersEdit from '../components/users/edit'
import Detail from '../components/categories/detail'
import Recycle from '../components/recycle/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/addcategory',
    name: 'AddCategory',
    component: AddCategory
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/addarticle',
    name: 'AddArticle',
    component: AddArticle
  },
  {
    path: '/articleEdit/:id',
    name: 'articleEdit',
    component: articleEdit
  },
  {
    path: '/addusers',
    name: 'Addusers',
    component: Addusers
  },
  {
    path: '/usersEdit/:id',
    name: 'usersEdit',
    component: usersEdit
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/recycle',
    name: 'Recycle',
    component: Recycle
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
