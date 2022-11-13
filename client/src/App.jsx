import { Routes, Route, Navigate } from "react-router-dom";

import "./style.scss";

import Layout from "./components/Layout";
// import Public from "./components/Public";
import Login from "./pages/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import PageNotFound from "./pages/PageNotFound";
import { Suspense } from "react";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import RequestList from "./pages/request/RequestList";
import ViewRequestItem from "./pages/request/ViewRequestItem";
import NewRequest from "./pages/request/NewRequest";

function App() {
  useTitle("VTAAPP | UCC-Congress");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route
          index
          element={
            <Suspense fallback={<>...</>}>
              <Navigate to="/login" replace />;
            </Suspense>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="app" element={<DashLayout />}>
                <Route index element={<Home />} />
                {/* For Students/Alumni */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Student, ROLES.Alumni]} />
                  }
                >
                  <Route path="request">
                    <Route index element={<RequestList />} />
                    <Route path=":id" element={<ViewRequestItem />} />
                    <Route path="new" element={<NewRequest />} />
                  </Route>
                </Route>

                {/* For admin */}
                <Route
                  element={
                    <RequireAuth
                      allowedRoles={[
                        ROLES.Manager,
                        ROLES.Admin,
                        ROLES.SuperAdmin,
                      ]}
                    />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                  <Route path="requests-to-manage">
                    <Route index element={<RequestList />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
