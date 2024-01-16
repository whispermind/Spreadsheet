import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import { store } from "./store";
import { router } from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"

export const App = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
			<Outlet />
		</Provider>
	);
};
