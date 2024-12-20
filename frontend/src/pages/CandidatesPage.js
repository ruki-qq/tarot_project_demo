import {
  Avatar,
  Button,
  Card,
  List,
  Space,
  Tag,
  Typography,
  Spin,
  Alert,
} from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchCandidate } from "../business";
import { getCandidates } from "../business/candidate";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "../utils";

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
          {candidate.full_name[0]}
        </Avatar>

        {/* Main Content */}
        <div>
          {/* Employee Name */}
          <Title level={4}>{candidate.full_name}</Title>

          {/* Description */}
          <div style={{ marginTop: "15px" }}>
            <Text>{candidate.bio}</Text>
          </div>

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

const CandidatesCardList = ({ candidates, onOpen }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState();

  const onSearch = (text) => {
    setSearch(text);
  };

  const onCreateClick = () => {
    navigate(`/candidates/new`);
  };

  const filtered = search ? searchCandidate(candidates, search) : candidates;

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Space style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={onCreateClick}>
          Добавить
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

  const {
    data: candidates,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => getCandidates(),
  });

  if (isLoading) {
    return <Spin fullscreen />;
  }

  if (isError || isEmpty(candidates)) {
    return <Alert message={"Возникла ошибка при загрузке"} type="error" />;
  }

  return <CandidatesCardList candidates={candidates} onOpen={onOpen} />;
};
