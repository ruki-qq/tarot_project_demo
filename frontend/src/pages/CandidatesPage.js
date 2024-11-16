import { Avatar, Button, Tag, Card, List, Space, Typography } from "antd";
import { candidates } from "../data";
import { useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import { useState } from "react";

const { Text, Title } = Typography;

const CandidateCard = ({ candidate, onOpen }) => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "20px",
      }}
    >
      <Space
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {/* Avatar Section */}
        <Avatar
          size={100}
          src={candidate.avatar}
          style={{ marginRight: "20px" }}
        >
          {candidate.name[0]}
        </Avatar>

        {/* Main Content */}
        <div>
          {/* Employee Name */}
          <Title level={4}>{candidate.name}</Title>
          <Text type="secondary">{candidate.role}</Text>

          {/* Description */}
          <div style={{ marginTop: "15px" }}>
            <Text>{candidate.description}</Text>
          </div>

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
        </div>
      </Space>

      <Space>
        <Button type="primary" onClick={() => onOpen(candidate.id)}>
          Подробнее
        </Button>
      </Space>
    </Card>
  );
};

const CandidatesCardList = ({ candidates, onOpen, onCreate }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState();

  const onSearch = (text) => {
    setSearch(text);
  };

  const onCreateClick = () => {
    navigate(`/candidates/new`);
  };

  const filtered = search
    ? candidates.filter((candidate) => {
        const text = search.toLowerCase().replaceAll(" ", "");

        return (
          candidate.name.toLowerCase().replaceAll(" ", "").includes(text) ||
          candidate.jobTitle.toLowerCase().replaceAll(" ", "").includes(text) ||
          candidate.skills
            .map((x) => x.toLowerCase())
            .join("")
            .includes(text)
        );
      })
    : candidates;

  return (
    <div
      style={{
        padding: "20px",
        background: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Space style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={onCreateClick}>
          Новый кандидат
        </Button>
      </Space>

      <Space style={{ marginBottom: "20px" }}>
        <Search style={{ width: "100%" }} onSearch={onSearch} />
      </Space>

      <List
        itemLayout="vertical"
        dataSource={filtered}
        renderItem={(candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onOpen={onOpen}
          />
        )}
      />
    </div>
  );
};

export const CandidatesPage = () => {
  const navigate = useNavigate();
  const onOpen = (id) => navigate(`/candidate/${id}`);
  return <CandidatesCardList candidates={candidates} onOpen={onOpen} />;
};
