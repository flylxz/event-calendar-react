import { FC } from 'react'
import { Badge, Calendar } from 'antd'
import { IEvent } from '../models/IEvent'
import { Moment } from 'moment'
import { formatDate } from '../utils/date'

interface EventCalendarProps {
  events: IEvent[]
}

export const EventCalendar: FC<EventCalendarProps> = ({ events }) => {
  const dateCellRender = (value: Moment) => {
    const formattedDate = formatDate(value.toDate())

    const currentDayEvents = events.filter(
      (event) => event.date === formattedDate,
    )

    return (
      <div>
        {currentDayEvents.map((event, index) => (
          <div key={index}>{event.description}</div>
        ))}
      </div>
    )
  }

  return <Calendar dateCellRender={dateCellRender} />
}
