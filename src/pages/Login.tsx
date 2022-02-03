import { Layout, Row, Card } from 'antd'
import { LoginForm } from '../components/LoginForm'

export const Login = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <Card>
          <LoginForm />
        </Card>
      </Row>
    </Layout>
  )
}
