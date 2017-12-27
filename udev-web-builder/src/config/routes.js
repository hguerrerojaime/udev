module.exports =  [
  {
    path: '/',
    component: {
      template: '<router-view />'
    },
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: require('../components/home'),
        meta: {
          breadcrumb: "Home"
        }
      },
      {
        path: 'region',
        redirect: '/region/list',
        component: {
          template: '<router-view />'
        },
        meta: {
          breadcrumb: "Region"
        },
        children: [
          {
            path: 'list',
            component: require('../components/region/list'),
            meta: {
              breadcrumb: "List"
            }
          },
          {
            path: 'new',
            component: require('../components/region/new'),
            meta: {
              breadcrumb: "New"
            }
          }
        ]
      }
    ],
  }

];
