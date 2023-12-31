import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
const NotFound = lazy(
  () => import("../app/shared/components/not-found/not-found.component"),
);
const UsersList = lazy(() => import("../app/users-list/users-list.component"));
const UserPostsList = lazy(
  () => import("../app/user-posts/user-posts-list.component"),
);
const UsersTasks = lazy(
  () => import("../app/users-tasks/users-tasks.component"),
);

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" Component={UsersList} />
          <Route path="/user/:id" Component={UserPostsList} />
          <Route path="/tasks" Component={UsersTasks} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
