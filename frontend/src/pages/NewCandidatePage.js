import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Layout,
  Typography,
  DatePicker,
  TimePicker,
} from "antd";
import { createCandidate } from "../business/candidate";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

export const NewCandidatePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    const { full_name, birth_date, birth_time, hard_skills, soft_skills, bio } =
      values;

    setIsLoading(true);

    const candidate = await createCandidate({
      full_name,
      bio: bio ? bio : "",
      birth_date: birth_date.format("YYYY-MM-DD"),
      birth_time: birth_time.format("hh:mm:ss"),
      hard_skills: hard_skills.join(", "),
      soft_skills: soft_skills.join(", "),
    });

    setIsLoading(false);

    navigate(`/candidate/${candidate.id}`);
  };

  const initial = {
    full_name: "",
    bio: "",
    birth_date: undefined,
    birth_time: undefined,
    hard_skills: [],
    soft_skills: [],
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
            name="full_name"
            label="Полное имя"
            rules={[
              { required: true, message: "Пожалуйста введите имя кандидата" },
            ]}
          >
            <Input placeholder="Введите полное имя" />
          </Form.Item>

          <Form.Item
            name="birth_date"
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

          <Form.Item
            name="birth_time"
            label="Время рождения"
            rules={[
              { required: true, message: "Пожалуйста выберите время рождения" },
            ]}
          >
            <TimePicker
              placeholder="Выберите время рождения"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Candidate Skills */}
          <Form.Item
            name="hard_skills"
            label="Hard скилы"
            rules={[{ required: true, message: "Выберите хотя бы 1 навык" }]}
          >
            <Select
              mode="tags"
              placeholder="Например: Python, React"
              allowClear
            />
          </Form.Item>

          {/* Candidate Skills */}
          <Form.Item
            name="soft_skills"
            label="Soft скилы"
            rules={[{ required: true, message: "Выберите хотя бы 1 навык" }]}
          >
            <Select
              mode="tags"
              placeholder="Например: Communication, Productivity"
              allowClear
            />
          </Form.Item>

          {/* Candidate Description */}
          <Form.Item name="bio" label="Описание">
            <TextArea
              rows={4}
              placeholder="Описание кандидата в произвольной форме"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
