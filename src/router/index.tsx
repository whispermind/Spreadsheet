import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";

import { ProfilesPage, AccountsPage, CampaignsPage } from "../pages";
import { App } from "../App";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<App />}
		>
			<Route path="" element={<AccountsPage />} /> 
			<Route path="profiles/:accountId" element={<ProfilesPage />} />
			<Route path="campaigns/:profileId" element={<CampaignsPage />} />
		</Route>
	)
);
