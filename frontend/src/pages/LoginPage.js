import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert, Card } from "antd";
import { useNavigate } from "react-router-dom";

import { useStore } from "../store";

const { Title } = Typography;

export const Login = () => {
  const store = useStore();

  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async ({ login, password }) => {
    console.log("onSubmit", { login, password });
    store.signIn({ login, password }).then(() => navigate("/"));
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
        Login
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
          label="Login"
          name="login"
          rules={[{ required: true, message: "Please enter your login" }]}
        >
          <Input placeholder="Enter your login" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ marginTop: "10px" }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
