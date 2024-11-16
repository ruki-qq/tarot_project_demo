import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert, Card } from "antd";
import { useNavigate, Link } from "react-router-dom";

import { useStore } from "../store";

const { Title } = Typography;

export const Register = () => {
  const store = useStore();

  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async ({ login, password }) => {
    console.log("onSubmit", { login, password });
    store.signUp({ login, password }).then(() => navigate("/"));
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
        Новый аккаунт
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
            Создать
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Link to={`/signin`} style={{ fontSize: "12px" }}>
            Есть аккаунт
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};
