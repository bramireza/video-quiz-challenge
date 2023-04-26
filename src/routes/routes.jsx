import { Dashboard, PageNotFound, Quiz } from "../pages";

export const routes = [
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/quiz/:id",
    Component: Quiz,
  },
  {
    path: "404",
    Component: PageNotFound,
  },
];
