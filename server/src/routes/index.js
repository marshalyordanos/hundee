const express = require('express');
const authRoute = require('./auth/auth.router');
const userRoute = require('./users/userRouter');
const roleRoute = require('./roles/roleRouter');
const permissionRoute = require('./permissions/permissionRouter');
const rolepermissionRoute = require('./rolepermissions/rolepermissionRouter');
const group_userRoute = require('./group_users/group_userRouter');
const statRoute = require('./state/statRouter');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/permissions',
    route: permissionRoute,
  },
  {
    path: '/rolepermissions',
    route: rolepermissionRoute,
  },
  {
    path: '/group_users',
    route: group_userRoute,
  },
  {
    path: '/state',
    route: statRoute,
  },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

module.exports = router;
