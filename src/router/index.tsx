import { createRoutesFromElements, createBrowserRouter, Route } from "react-router-dom";

import { ProfilesPage, AccountsPage, CampaignsPage } from "../pages";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
		>
			<Route path="" element={<AccountsPage />} /> 
			<Route path="profiles/:accountId" element={<ProfilesPage />} />
			<Route path="campaigns/:profileId" element={<CampaignsPage />} />
		</Route>
	)
);
