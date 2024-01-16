import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";

import { AccountsPage } from "../pages/Accounts";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<AccountsPage />}
		/>
	)
);
