import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/views/Signin'
import Signup from '@/views/Signup'
import AuthorsView from '@/views/AuthorsView'
import BooksView from '@/views/BooksView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: BooksView
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/authors',
      name: 'AuthorsView',
      component: AuthorsView
    },
    {
      path: '/books',
      name: 'BooksView',
      component: BooksView
    }
  ]
})
