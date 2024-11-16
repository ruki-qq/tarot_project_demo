import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Layout,
  Typography,
  DatePicker,
} from "antd";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export const NewCandidatePage = () => {
  const [form] = Form.useForm();

  const onSubmit = (values) => {
    console.log("Submitted Candidate Data:", values);
    // Add API call here to save candidate data
  };

  const initial = {
    name: "",
    description: "",
    birth: undefined,
    skills: [],
  };

  return (
    <Layout style={{ padding: "20px" }}>
      <Content
        style={{ maxWidth: "600px", minWidth: "400px", margin: "0 auto" }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Новый кандидат
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          initialValues={initial}
        >
          {/* Candidate Name */}
          <Form.Item
            name="name"
            label="Полное имя"
            rules={[
              { required: true, message: "Пожалуйста введите имя кандидата" },
            ]}
          >
            <Input placeholder="Введите полное имя" />
          </Form.Item>

          <Form.Item
            name="birth"
            label="Дата рождения"
            rules={[
              { required: true, message: "Пожалуйста выберите дату рождения" },
            ]}
          >
            <DatePicker
              placeholder="Выберите дату рождения"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Candidate Skills */}
          <Form.Item
            name="skills"
            label="Навыки"
            rules={[{ required: true, message: "Выберите хотя бы 1 навык" }]}
          >
            <Select
              mode="tags"
              placeholder="Add skills (e.g., React, Python)"
              allowClear
            >
              <Option value="React">React</Option>
              <Option value="Node.js">Node.js</Option>
              <Option value="Python">Python</Option>
              <Option value="Django">Django</Option>
              <Option value="Machine Learning">Machine Learning</Option>
            </Select>
          </Form.Item>

          {/* Candidate Description */}
          <Form.Item
            name="description"
            label="Описание"
            rules={[
              { required: true, message: "Please provide a description" },
            ]}
          >
            <TextArea rows={4} placeholder="Add a brief description" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
