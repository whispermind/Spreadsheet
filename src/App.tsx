import { useState, useCallback } from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import { store } from "./store";
import { router } from "./router";
import { ITableContext, TableContext, defaultTableContextValue } from "./components/AppTable/TableContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"

export const App = () => {
	const [tableContext, setTableContext] = useState(defaultTableContextValue);

	const setDefault = useCallback(() => setTableContext(defaultTableContextValue), []);
	const setContext = useCallback((context: ITableContext) => setTableContext(context), []); 

	return (
		<Provider store={store}>
			<TableContext.Provider value={{ ...tableContext, setContext, setDefault}}>
				<RouterProvider router={router} />
				<Outlet />
			</TableContext.Provider>
		</Provider>
	);
};
