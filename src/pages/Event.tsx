import { Layout, Row, Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { EventCalendar } from '../components/EventCalendar'
import { EventForm } from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEvent } from '../models/IEvent'

export const Event = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { fetchGuests, createEvent, fetchEvents } = useActions()
  const { guests, events } = useTypedSelector((state) => state.eventReducer)
  const { user } = useTypedSelector((state) => state.authReducer)

  useEffect(() => {
    fetchGuests()
    fetchEvents(user.username)
  }, [])

  const addNewEvent = (event: IEvent) => {
    createEvent(event)
    setModalVisible(false)
  }

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setModalVisible(true)}>Add Event</Button>
      </Row>
      <Modal
        title="Add Event"
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  )
}
