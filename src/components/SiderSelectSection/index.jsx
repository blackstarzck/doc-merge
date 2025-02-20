import { Divider, Select, theme } from "antd";
import { useState } from "react";
import styled from "styled-components";

const SiderSelectSection = () => {
  const [isSelected, setIsSelected] = useState(false);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setIsSelected(true);
  };
  const onSearch = (value) => {};

  return (
    <Wrapper>
      <Divider style={{ borderColor: "rgba(255, 255, 255, .3)" }} />
      <SelectWrapper
        showSearch
        size="large"
        $isSelected={isSelected}
        $primary={colorPrimary}
        placeholder="문서를 선택해주세요"
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options={[
          {
            value: "jack",
            label: "JackJackJackJackJackJackJackJackJackJackJackJackJackJack",
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0 4px;
`;

const SelectWrapper = styled(Select)`
  width: 100%;

  & .ant-select-selector {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border-color: ${(props) =>
      props.$isSelected
        ? props.$primary
        : "rgba(255, 255, 255, 0.1)"} !important;

    & .ant-select-selection-placeholder {
      color: rgba(255, 255, 255, 0.65) !important;
      font-size: 14px;
    }
  }
  & .ant-select-arrow {
    transform: translate(50%, 50%);
    top: 40%;
    right: 10%;
  }
  & .ant-select-arrow,
  .ant-select-selection-item {
    color: ${(props) =>
      props.$isSelected ? props.$primary : "#ffffff"} !important;
  }
`;

export default SiderSelectSection;
