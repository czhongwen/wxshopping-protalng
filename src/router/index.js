import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ProductMange from '@/page/productMange/ProductMange.vue'
import ProductDetail from '@/page/productMange/ProductDetail.vue'
import ProductTypeMange from '@/page/productType/ProductTypeMange.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/page/productMange/ProductMange',
      name: 'ProductMange',
      component: ProductMange
    },
    {
      path: '/page/productMange/productDetail',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: "/page/productType/ProductTypeMange",
      name: "ProductTypeMange",
      component: ProductTypeMange
    }
  ]
})
