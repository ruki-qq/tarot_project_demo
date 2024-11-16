import react, { useState } from "react";
import { teams } from "../data";
import { Space, Typography } from "antd";
import { useQueryParams } from "../hooks";

const { Text } = Typography;

export const OraclePage = () => {
  const query = useQueryParams();

  const [candidate, setCandidate] = useState();

  const team = teams.find((team) => team.id === parseInt(team.id));

  return (
    <Space>
      <Space>
        <Text>Команда</Text>
      </Space>
    </Space>
  );
};
