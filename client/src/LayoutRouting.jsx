import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import LayoutApp from "./components/layout/LayoutApp";
import StudentsList from "./views/students/StudentsList";
import StudentsDetail from "./views/students/StudentsDetail";
import UsersList from "./views/users/UsersList";
import UsersDetail from "./views/users/UsersDetails";
import RolesList from "./views/roles/RolesList";
import RolesDetail from "./views/roles/RolesDetails";
import PermissionsList from "./views/permissions/PermissionsList";
import PermissionsDetail from "./views/permissions/PermissionsDetails";
import RolepermissionsList from "./views/rolepermissions/RolepermissionsList";
import RolepermissionsDetail from "./views/rolepermissions/RolepermissionsDetails";
import Group_usersList from "./views/group_users/Group_usersList";
import Group_usersDetail from "./views/group_users/Group_usersDetails";

import StateList from "./views/state/StateList";
import StateDetail from "./views/state/StateDetails";
const LayoutRouting = () => {
  return (
    <Routes>
      <Route element={<LayoutApp />}>
        <Route index element={<h1>DashBord</h1>} />
        <Route path="students" element={<StudentsList />} />
        <Route path="students/:id" element={<StudentsDetail />} />
        <Route path="users" element={<UsersList />} />
        <Route path="users/:id" element={<UsersDetail />} />

        <Route path="roles" element={<RolesList />} />
        <Route path="roles/:id" element={<Group_usersList />} />
        <Route path="group_users/:id" element={<Group_usersDetail />} />

        <Route path="permissions" element={<PermissionsList />} />
        <Route path="permissions/:id" element={<RolepermissionsList />} />
        <Route path="rolepermissions/:id" element={<RolepermissionsDetail />} />

        <Route path="state" element={<StateList />} />
        <Route path="state/:id" element={<StateDetail />} />

        <Route path="books" element={<h1>Books</h1>} />

        <Route path="*" element={<h1>Books</h1>} />
      </Route>
    </Routes>
  );
};

export default LayoutRouting;
