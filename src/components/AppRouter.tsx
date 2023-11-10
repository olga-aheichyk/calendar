import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteNames, privateRoutes, publicRoutes } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppRouter = () => {
	const { isAuthorised } = useTypedSelector(state => state.auth);

	return (
		<Routes>
			{isAuthorised ? privateRoutes.map(
				({ path, component }) => <Route path={path} Component={component} key={path} />
			) : publicRoutes.map(
				({ path, component }) => <Route path={path} Component={component} key={path} />
			)}
			<Route path="*" element={<Navigate to={isAuthorised ? RouteNames.EVENT : RouteNames.LOGIN} replace />} />
		</Routes>
	)
};

export default AppRouter;
