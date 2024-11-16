import React from "react";
import { candidates } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Card, Tag, Space, Avatar, Divider } from "antd";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { isEmpty } from "../utils";

const { Text, Title } = Typography;

export const CandidatePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const candidate = candidates.find((employee) => employee.id === parseInt(id));

  if (isEmpty(candidate)) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Title level={3}>Такого кандидата не существует!</Title>
        <Button type="primary" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Buttons */}
      <Space style={{ marginBottom: "20px" }}>
        <Button onClick={() => navigate(-1)}>Назад</Button>
        <Button
          type="primary"
          onClick={() => navigate(`/candidate-matching/${candidate.id}`)}
        >
          🔮 Сравнить
        </Button>
      </Space>

      {/* Employee Detail Card */}
      <Card
        style={{
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header: Avatar and Name */}
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <Avatar size={100} src={candidate.avatar}>
            {candidate.name[0]}
          </Avatar>
          <Title level={4}>{candidate.name}</Title>
          <Text type="secondary">{candidate.role}</Text>

          {/* Description */}
          <div style={{ marginTop: "15px" }}>
            <Text>{candidate.description}</Text>
          </div>
        </Space>

        <Divider />

        {/* Contact Information */}
        <Space
          direction="vertical"
          style={{ marginTop: "20px", width: "100%" }}
        >
          {/* Skills Section */}
          <div style={{ marginTop: "10px" }}>
            <Text strong>Hard Skills: </Text>
            <Space wrap>
              {candidate.hardSkills.map((skill, index) => (
                <Tag color="blue" key={index}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Text strong>Soft Skills: </Text>
            <Space wrap>
              {candidate.softSkills.map((skill, index) => (
                <Tag color="green" key={index}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  );
};
