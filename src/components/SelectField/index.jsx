import { ConfigProvider, Select, Space } from "antd";
import { theme } from "antd";
import styled from "styled-components";

const { useToken } = theme;

const SelectField = ({ name, onChange, onSearch }) => {
  const { token } = useToken();

  return (
    <Space wrap size="small">
      <span>{name}</span>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              optionSelectedColor: token.colorPrimary,
            },
          },
        }}
      >
        <SelectWrapper
          // open={true}
          showSearch
          size="large"
          placeholder="Select a person"
          optionFilterProp="label"
          onChange={onChange}
          onSearch={onSearch}
          options={[
            {
              value: "여송사회복지제단(위즈덤셀러)",
              label: "여송사회복지제단(위즈덤셀러)",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
      </ConfigProvider>
    </Space>
  );
};

const SelectWrapper = styled(Select)`
  width: 310px;

  & .ant-select-selection-item {
    font-size: 14px;
  }
`;

export default SelectField;
