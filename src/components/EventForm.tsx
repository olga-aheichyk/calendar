import React, { FunctionComponent, useState } from "react";
import { Form, Input, Button, DatePicker, Select, DatePickerProps } from 'antd';
import { rules } from '../utils/rules';
import { IUser } from '../models/IUser';
import { IEvent } from '../models/IEvent';
//import { formatDate } from '../utils/date';
import { Dayjs } from 'dayjs';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
	guests: IUser[];
	submit: (event: IEvent) => void;
}

const EventForm: FunctionComponent<EventFormProps> = (props) => {
	const { guests, submit } = props;
	const { user } = useTypedSelector(state => state.auth)

	const [event, setEvent] = useState<IEvent>({
		author: '',
		guest: '',
		date: '',
		description: '',
	} as IEvent);

	const selectOptions = guests.map(guest => ({value: guest.username, label: guest.username}));

	const onChangeDate: DatePickerProps['onChange'] = (date: Dayjs | null, dateString: string) => {
		if (date) {
			setEvent({ ...event, date: dateString });
			return;
		}

		setEvent({ ...event, date: '' })
	};

	const handleFormSubmit = () => {
		submit({...event, author: user.username});
	}

	return (
		<Form onFinish={handleFormSubmit}>
			<Form.Item
				label="Add event description"
				name="description"
				rules={[rules.required()]}
			>
				<Input value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
			</Form.Item>

			<Form.Item
				label="Event Date"
				name="date"
				rules={[rules.required()]}
			>
				<DatePicker onChange={onChangeDate} />
			</Form.Item>

			<Form.Item>
				<Select
					defaultValue={guests[0].username}
					style={{ width: 120 }}
					onChange={(value) => setEvent({ ...event, guest: value }) }
					value={event.guest}
					options={selectOptions}
				/>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" loading={false}>
					Add Event
				</Button>
			</Form.Item>
		</Form>
	)
};

export default EventForm;
