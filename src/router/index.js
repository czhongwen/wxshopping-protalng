import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ProductMange from "@/page/productMange/ProductMange.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/page/productMange',
      name: "ProductMange",
      component: ProductMange,
    }
  ]
})
