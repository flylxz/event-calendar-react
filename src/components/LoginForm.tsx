import React, { FC, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { rules } from '../utils/rules'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'

export const LoginForm: FC = () => {
  const { error, isLoading } = useTypedSelector((state) => state.authReducer)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [form] = Form.useForm()

  const { login } = useActions()

  const submit = () => {
    login(username, password)
    form.resetFields()
  }

  return (
    <Form onFinish={submit} form={form}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required('Please input your username!')]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required('Please input your password!')]}
      >
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}
