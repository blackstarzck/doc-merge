import { CheckCircleTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  ColorPicker,
  Divider,
  Form,
  Menu,
  Row,
  Select,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import Preview from "../Preview";

const { Item } = Form;

const MenuItem = ({ styles, children }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <Wrap $hasStyles={styles} $colorPrimary={colorPrimary}>
      <span>{children}</span>
      {styles && <CheckCircleTwoTone twoToneColor={colorPrimary} />}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;

  & > span {
    ${({ $hasStyles, $colorPrimary }) => {
      if ($hasStyles) {
        return css`
          color: ${$colorPrimary};
        `;
      }
    }};
  }
`;

const TableElements = [
  { key: "all", styles: null, isSelected: false, label: "전체 표" },
  {
    key: "fst-columns-repeat",
    styles: null,
    isSelected: false,
    label: "열 줄무늬",
  },
  {
    key: "scnd-columns-repeat",
    styles: null,
    isSelected: false,
    label: "둘째 열 줄무늬",
  },
  {
    key: "fst-rows-repeat",
    styles: null,
    isSelected: false,
    label: "첫 행 줄무늬",
  },
  {
    key: "scnd-rows-repeat",
    styles: null,
    isSelected: false,
    label: "둘째 행 줄무늬",
  },
  { key: "lst-column", styles: null, isSelected: false, label: "마지막 열" },
  { key: "fst-column", styles: null, isSelected: false, label: "첫째 열" },
  { key: "fst-row", styles: null, isSelected: false, label: "머리글 행" },
  { key: "lst-row", styles: null, isSelected: false, label: "요약 행" },
];

const fontStyleOptions = [
  {
    value: '{"fontStyle":"normal","fontWeight":"normal"}',
    label: "보통",
  },
  {
    value: '{"fontStyle":"italic","fontWeight":"normal"}',
    label: "기울임꼴",
  },
  {
    value: '{"fontStyle":"normal","fontWeight":"bold"}',
    label: "굵게",
  },
  {
    value: '{"fontStyle":"italic","fontWeight":"bold"}',
    label: "굵은 기울임꼴",
  },
];

const fontSizeOptions = Array.from({ length: 24 - 6 + 1 }, (_, i) => ({
  value: `{"fontSize": "${i + 6}px"}`,
  label: `${i + 6}px`,
}));

const underLineOptions = [
  {
    value: '{"textDecorationLine":"none","textDecorationStyle":"none"}',
    label: "없음",
  },
  {
    value: '{"textDecorationLine":"underline","textDecorationStyle":"solid"}',
    label: "밑줄",
  },
  {
    value:
      '{"textDecorationLine":"line-through","textDecorationStyle":"solid"}',
    label: "취소선",
  },
];

const defaultStyles = {
  fontSize: "11px",
  fontStyle: "normal",
  fontWeight: "normal",
  textDecorationLine: "none",
  textDecorationStyle: "none",
  textDecorationColor: "#000000",
  color: "#000000",
  backgroundColor: "#ffffff",
};

const FormatContent = () => {
  const [form] = Form.useForm();
  const [styles, setStyles] = useState(defaultStyles);
  const [menuItems, setMenuItems] = useState(TableElements);
  const {
    token: { colorBorder },
  } = theme.useToken();

  const onValuesChange = (data) => {
    let [[key, value]] = Object.entries(data);

    if (key === "color" || key === "backgroundColor") {
      value = JSON.stringify({ [key]: value.toHexString() });
    }
    value = JSON.parse(value);

    setStyles((prev) => ({ ...prev, ...value }));
  };

  useEffect(() => {
    console.log("menuItems의 값이 변경되었습니다.");
    menuItems.forEach((item) => {
      if (item.isSelected) {
        const selectedStyles = item.styles || defaultStyles;
        console.log(item.styles, styles);
        console.log("selectedStyles: ", selectedStyles);
        form.setFieldsValue(selectedStyles);
      }
    });
  }, [menuItems]);

  const reset = () => {
    setStyles(defaultStyles);
    setMenuItems((prev) => {
      return prev.map((item) =>
        item.isSelected ? { ...item, styles: null } : item
      );
    });
    form.resetFields();
  };

  return (
    <ContentBody>
      {/* 위쪽 */}
      <Row gutter={16}>
        {/* 왼쪽 */}
        <ColWrapper span={12}>
          <Head>
            <h4>표 요소</h4>
          </Head>
          <MenuWrapper $colorBorder={colorBorder}>
            <Menu
              onSelect={({ key }) => {
                setMenuItems((prev) => {
                  return prev.map((item) => ({
                    ...item,
                    isSelected: item.key === key ? true : false,
                  }));
                });
              }}
              mode="inline"
              items={menuItems.map((item) => {
                return {
                  key: item.key,
                  label: (
                    <MenuItem styles={item.styles ? true : false}>
                      {item.label}
                    </MenuItem>
                  ),
                };
              })}
            />
          </MenuWrapper>
        </ColWrapper>
        {/* 오른쪽 */}
        <ColWrapper span={12}>
          <Head>
            <h4>미리 보기</h4>
          </Head>
          <Preview type="grid" />
        </ColWrapper>
      </Row>
      <Divider />
      {/* 아래쪽 */}
      <Row gutter={16}>
        {/* 위쪽 */}
        <ColWrapper span={12}>
          <Form form={form} onValuesChange={onValuesChange} layout="vertical">
            <div style={{ flexDirection: "column" }}>
              <Row gutter={10} style={{ flex: 1, marginBottom: 16 }}>
                <Col span={8}>
                  <ItemWrapper
                    name="fontStyle"
                    label="스타일"
                    initialValue="normal"
                  >
                    <Select
                      popupMatchSelectWidth={false}
                      options={fontStyleOptions}
                    />
                  </ItemWrapper>
                </Col>
                <Col span={8}>
                  <ItemWrapper name="fontSize" label="크기" initialValue={11}>
                    <Select
                      popupMatchSelectWidth={false}
                      options={fontSizeOptions}
                    />
                  </ItemWrapper>
                </Col>
                <Col span={8}>
                  <ItemWrapper
                    name="textDecoration"
                    label="밑줄"
                    initialValue="none"
                  >
                    <Select
                      popupMatchSelectWidth={false}
                      options={underLineOptions}
                    />
                  </ItemWrapper>
                </Col>
              </Row>
              <Row gutter={10} style={{ flex: 1 }}>
                <Col span={12}>
                  <ItemWrapper initialValue="#000000" name="color" label="색">
                    <ColorPicker onFormatChange={"hex"} showText={true} />
                  </ItemWrapper>
                </Col>
                <Col span={12}>
                  <ItemWrapper
                    initialValue="#ffffff"
                    name="backgroundColor"
                    label="배경색"
                  >
                    <ColorPicker onFormatChange={"hex"} showText={true} />
                  </ItemWrapper>
                </Col>
              </Row>
            </div>
          </Form>
        </ColWrapper>
        <ColWrapper span={12}>
          <Head>
            <h4>미리 보기</h4>
            <div>
              <Button
                size="small"
                color="default"
                variant="text"
                onClick={() => {
                  console.log("저장: ", styles);
                  setMenuItems((prev) => {
                    return prev.map((item) =>
                      item.isSelected ? { ...item, styles } : { ...item }
                    );
                  });
                }}
              >
                저장
              </Button>
              <Divider type="vertical" />
              <Button
                size="small"
                color="default"
                variant="text"
                onClick={reset}
              >
                지우기
              </Button>
            </div>
          </Head>
          <Preview type="text" styles={styles} />
        </ColWrapper>
        {/* 아래쪽 */}
      </Row>
    </ContentBody>
  );
};

const MenuWrapper = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ $colorBorder }) => $colorBorder};
  border-radius: 8px;
  overflow: hidden;

  & > ul {
    border-inline-end: none !important;
  }
`;

const ContentBody = styled.div`
  padding: 24px 0;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;

  & > div span {
    color: #555555;
  }
`;

const ColWrapper = styled(Col)`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled(Item)`
  margin-bottom: 0;
  overflow: hidden;
`;

export default FormatContent;
