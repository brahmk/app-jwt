import React from "react";
import { Button, Form, Input } from "antd";

import bcrypt from "bcryptjs";

const salt = "$2b$10$WwhgVbFf9AJm5WWwpKVMYu";

export default function Login({ setToken }) {
  const handleLogin = ({ email, password }) => {
    console.log(email, password);
    const hash = bcrypt.hashSync(password, salt);
    console.log(hash);
    fetch("http://localhost:5050/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password: hash }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        setToken(data.token);
        console.log(data.token);
        localStorage.setItem("token", data.token);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Login</h1>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={handleLogin}
      >
        <Form.Item name="email" label="email">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="password">
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 10, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
