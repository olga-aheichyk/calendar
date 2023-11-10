import React, { FunctionComponent, useEffect, useState } from "react";
import EventCalendar from '../components/EventCalendar';
import Layout from 'antd/es/layout/layout';
import { Button, Modal, Row } from 'antd';
import EventForm from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FunctionComponent = (props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { fetchUsers, fetchEvents, createEvent } = useActions();
	const { guests, events } = useTypedSelector(state => state.event);
	const { user } = useTypedSelector(state => state.auth)

	useEffect(() => {
		fetchUsers();
		fetchEvents(user.username);
	}, []);

	const handleEventFormSubmit = (event: IEvent) => {
		createEvent(event);
		setIsModalVisible(false);
	}

	console.log(events);

	return (
		<Layout>
			<EventCalendar events={events} />
			<Row justify={'center'}>
				<Button onClick={() => setIsModalVisible(true)}>Add Event</Button>
			</Row>
			<Modal title={'Add Event'} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
				<EventForm submit={handleEventFormSubmit} guests={guests} />
			</Modal>
		</Layout>
	)
};

export default Event;
