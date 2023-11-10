import React, { FunctionComponent } from "react";
import { Card, Layout, Row } from 'antd';
import LoginForm from '../components/LoginForm';

const Login: FunctionComponent = (props) => {
	return (
		<Layout>
			<Row justify='center' align='middle' className='h100'>
				<Card>
					<LoginForm />
				</Card>
			</Row>
		</Layout>
	)
};

export default Login;
