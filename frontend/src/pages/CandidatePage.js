import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  Tag,
  Space,
  Avatar,
  Divider,
  DatePicker,
  TimePicker,
  Spin,
} from "antd";
import { isEmpty } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { getCandidate } from "../business/candidate";
import dayjs from "dayjs";

const { Text, Title } = Typography;

export const CandidatePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: candidate = undefined,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["candidate", id],
    queryFn: async () => getCandidate(id),
  });

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (isError || isEmpty(candidate)) {
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
        <Space direction="vertical" align="left">
          <Avatar size={100} src={candidate.avatar}>
            {candidate.full_name[0]}
          </Avatar>
          <Title level={4}>{candidate.full_name}</Title>

          {/* Description */}
          <div style={{ marginTop: "15px" }}>
            <Text>{candidate.bio}</Text>
          </div>
        </Space>

        <Divider />

        <Space direction="vertical">
          <div style={{ marginTop: "15px" }}>
            Дата рождения: {candidate.birth_date}
          </div>

          {candidate.birth_time && (
            <div style={{ marginTop: "15px" }}>
              Время рождения: {candidate.birth_time}
            </div>
          )}
        </Space>

        <Divider />

        <Space direction="vertical">
          {/* Skills Section */}
          <div style={{ marginTop: "10px" }}>
            <Text strong>Hard Skills: </Text>
            <Space wrap>
              {candidate.hard_skills.split(", ").map((skill, index) => (
                <Tag color="blue" key={index}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </div>
          <div style={{ marginTop: "10px" }}>
            <Text strong>Soft Skills: </Text>
            <Space wrap>
              {candidate.soft_skills.split(", ").map((skill, index) => (
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
