import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import usersReducer from '../views/users/UsersRedux'
import rolesReducer from '../views/roles/RolesRedux'
import permissionsReducer from '../views/permissions/PermissionsRedux' // import the permissions
import rolepermissionsReducer from '../views/rolepermissions/RolepermissionsRedux' // import the rolepermissions
import group_usersReducer from '../views/group_users/Group_usersRedux' // import the group_users
import stateReducer from '../views/state/StateRedux' // import the state

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    rolepermissions: rolepermissionsReducer, // add the rolepermissions here
    group_users: group_usersReducer, // add the group_users here
    state: stateReducer, // add the state here


  },
})