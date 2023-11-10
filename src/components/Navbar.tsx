import React, { FunctionComponent, useEffect, useState } from "react";
import { Layout, Menu, MenuProps, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { RouteNames } from '../routes';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const Navbar: FunctionComponent = (props) => {
	const navigate = useNavigate();
	const isAuthorised = useTypedSelector(state => state.auth.isAuthorised);
	const { logout } = useActions();

	const notAuthorisedItems = [
		{
			label: 'Login',
			key: RouteNames.LOGIN,
		},
	];

	const authorisedItems = [
		{
			label: 'username',
			key: 'name',
			selectable: 'false',
		},
		{
			label: 'Sign out',
			key: 'logout',
		},
	];

	const [items, setItems] = useState(isAuthorised ? authorisedItems : notAuthorisedItems);

	useEffect(() => {
		setItems(isAuthorised ? authorisedItems : notAuthorisedItems);
	}, [isAuthorised]);

	const menuItemHandler: MenuProps['onClick'] = (e) => {
		if (e.key === 'logout') {
			logout();
			return;
		};

		navigate(e.key);
	}

	return (
		<Layout>
			<Header>
				<Menu
					style={{justifyContent: 'end'}}
					onClick={menuItemHandler}
					theme='dark'
					items={items}
					mode={'horizontal'} />
			</Header>
		</Layout>
	)
};

export default Navbar;
