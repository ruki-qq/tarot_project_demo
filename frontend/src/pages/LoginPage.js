import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert, Card } from "antd";
import { useNavigate, Link } from "react-router-dom";

import { useStore } from "../store";

const { Title } = Typography;

export const Login = () => {
  const store = useStore();

  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async ({ login, password }) => {
    console.log("onSubmit", { login, password });

    await store
      .signIn({ login, password })
      .catch((error) => setError(error))
      .then(() => navigate("/"));
  };

  return (
    <Card
      style={{
        maxWidth: 400,
        margin: "auto",
        marginTop: "100px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Войти в систему
      </Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: "20px" }}
        />
      )}

      <Form
        name="login"
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Логин"
          name="login"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input placeholder="Введите логин" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>

        <Form.Item style={{ marginBottom: "5px" }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Войти
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Link to={`/signup`} style={{ fontSize: "12px" }}>
            Нет аккаунта
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
