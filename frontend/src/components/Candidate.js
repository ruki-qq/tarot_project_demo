import React from "react";
import { Card, Avatar, Tag, Typography, Button, Row, Col, Space } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const Candidate = ({ candidate }) => {
  return (
    <Card
      style={{
        width: 400,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
      }}
      cover={
        <Avatar
          src={candidate.profilePicture}
          size={100}
          style={{
            margin: "20px auto",
            display: "block",
            border: "2px solid #1890ff",
          }}
        />
      }
    >
      <Title level={4} style={{ textAlign: "center" }}>
        {candidate.name}
      </Title>
      <Text type="secondary" style={{ textAlign: "center", display: "block" }}>
        {candidate.jobTitle}
      </Text>

      <Row gutter={[8, 8]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Text strong>Skills:</Text>
          <Space wrap style={{ marginTop: 8 }}>
            {candidate.skills.map((skill, index) => (
              <Tag key={index} color="blue">
                {skill}
              </Tag>
            ))}
          </Space>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Button
            type="primary"
            icon={<MailOutlined />}
            block
            onClick={() => alert(`Send email to: ${candidate.email}`)}
          >
            Email
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="default"
            icon={<PhoneOutlined />}
            block
            onClick={() => alert(`Call: ${candidate.phone}`)}
          >
            Call
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
