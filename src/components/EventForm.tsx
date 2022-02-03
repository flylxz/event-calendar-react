import { FC, useState } from 'react'
import { Button, DatePicker, Form, Input, Row, Select } from 'antd'
import { rules } from '../utils/rules'
import { IUser } from '../models/IUser'
import { IEvent } from '../models/IEvent'
import { Moment } from 'moment'
import { formatDate } from '../utils/date'

interface EventFormProps {
  guests: IUser[]
  submit: (event: IEvent) => void
}

export const EventForm: FC<EventFormProps> = ({ guests, submit }) => {
  const [event, setEvent] = useState<IEvent>({
    author: localStorage.getItem('username'),
    date: '',
    description: '',
    guest: '',
  } as IEvent)

  const [form] = Form.useForm()

  const selectDate = (date: Moment) => {
    if (!!date) {
      setEvent({ ...event, date: formatDate(date.toDate()) })
    }
  }

  const submitForm = () => {
    submit(event)
    form.resetFields()
  }

  return (
    <Form onFinish={submitForm} form={form}>
      <Form.Item
        label="Event label"
        name="description"
        rules={[rules.required('Please input something')]}
      >
        <Input
          value={event.description}
          onChange={(e) =>
            setEvent({
              ...event,
              description: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item
        label="Event date"
        name="date"
        rules={[
          rules.required('Please input date'),
          rules.isDateAfter('Select date from future please'),
        ]}
      >
        <DatePicker onChange={(date) => selectDate(date!)} />
      </Form.Item>
      <Form.Item
        label="Choose guest"
        name="guest"
        rules={[rules.required('Please choose a guest')]}
      >
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Row>
      </Form.Item>
    </Form>
  )
}
