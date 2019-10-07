import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Authors from '@/components/Authors'
import Books from '@/components/Books'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/authors',
      name: 'Authors',
      component: Authors
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    }
  ]
})
