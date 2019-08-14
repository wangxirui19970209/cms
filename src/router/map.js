export default [
  {
    path: '/login',
    component: (resolve) => {
      require(['../views/login'], resolve)
    },
  },
  {
    path: '/',
    component: (resolve) => {
      require(['../views/Index'], resolve)
    },
    children: [{
      path: 'offers',
      component: (resolve) => {
        require(['../views/listManagement/offers'], resolve)
      }
    },{
      path: 'offers/detail',
      component: (resolve) => {
        require(['../views/listManagement/offers/detail'], resolve)
      }
    },{
      path: 'orders',
      component: (resolve) => {
        require(['../views/listManagement/orders'], resolve)
      }
    },{
      path: 'users',
      component: (resolve) => {
        require(['../views/listManagement/users'], resolve)
      }
    }]
  }
]