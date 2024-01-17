import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/index.tsx';
import { AppSpinner } from './components';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} fallbackElement={<AppSpinner />} />
)

