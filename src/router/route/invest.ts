import type {RouteRecordRaw} from 'vue-router';

export default <RouteRecordRaw[]>[
  {
    name: 'invest',
    path: '/invest',
    redirect: '/invest/history',
    meta: {needLogin: true},
    children: [
      {
        name: 'investHistory',
        path: 'history',
        meta: {needLogin: true},
      },
      {
        name: 'investGroup',
        path: 'group',
        meta: {needLogin: true},
      },
      {
        name: 'investItem',
        path: 'item',
        meta: {needLogin: true},
      },
      {
        name: 'investUnit',
        path: 'unit',
        meta: {needLogin: true},
      },
    ],
  },
];
