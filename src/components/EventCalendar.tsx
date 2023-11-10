import { Calendar } from 'antd';
import React, { FunctionComponent } from "react";
import { IEvent } from '../models/IEvent';
import { Dayjs } from 'dayjs';

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FunctionComponent<EventCalendarProps> = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs) => {
    
    // if (info.type === 'date') return dateCellRender(current);
    // if (info.type === 'month') return monthCellRender(current);
    // return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default EventCalendar;
