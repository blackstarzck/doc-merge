import { Button, Select, Space } from "antd";
import styled from "styled-components";

import SelectField from "../SelectField";

const BodySelectSection = () => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <SpaceWrapper align="start">
      <Space wrap size="middle">
        <SelectField
          name="매출처 원장"
          onChange={onChange}
          onSearch={onSearch}
        />
        <SelectField
          name="매입처 원장"
          onChange={onChange}
          onSearch={onSearch}
        />
        <SelectField
          name="마크장비 진행현황"
          onChange={onChange}
          onSearch={onSearch}
        />
      </Space>
      <Button type="primary" size="large">
        생성
      </Button>
    </SpaceWrapper>
  );
};

const SpaceWrapper = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;

export default BodySelectSection;
