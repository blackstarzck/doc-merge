import { CheckCircleTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  ColorPicker,
  Divider,
  Flex,
  Form,
  Menu,
  Row,
  Select,
  theme,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

import {
  FONT_SIZE_OPTIONS,
  FONT_STYLE_OPTIONS,
  TABLE_ELEMENTS,
  UNDERLINE_OPTIONS,
} from "../../constants/options";
import { flattenObject } from "../../utils";
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

const defaultStyles = {
  fontSize: FONT_SIZE_OPTIONS[5].value,
  fontStyle: FONT_STYLE_OPTIONS[0].value,
  textDecorationLine: UNDERLINE_OPTIONS[0].value,
  textDecorationColor: "#000000",
  color: "#000000",
  backgroundColor: "#ffffff",
};

const FormatContent = ({ handleCancel, saveCustomFormat }) => {
  const [form] = Form.useForm();
  const [styles, setStyles] = useState(defaultStyles);
  const [menuItems, setMenuItems] = useState(TABLE_ELEMENTS);
  const [isFormDisabled, setFormDisabled] = useState(true);
  const [isSaveDisabled, setSaveDisabled] = useState(false);
  const [gridStyles, setGridStyles] = useState({});
  const [selectedKeys, setSelectedKeys] = useState(); // 리스트 모두 styles 가 없을때 비활성화
  const visibility = useSelector((state) => state.modals?.formatter.visible);

  const {
    token: { colorBorder },
  } = theme.useToken();

  const handleValuesChange = (data) => {
    const [[key, value]] = Object.entries(data);
    const parsedValue =
      key === "color" || key === "backgroundColor"
        ? { [key]: value.toHexString() }
        : { [key]: value };

    setStyles((prev) => ({ ...prev, ...parsedValue }));
  };

  const handleMenuClick = (e) => {
    setSelectedKeys(e.key); // 선택된 메뉴 항목을 업데이트
  };

  const handleDeselect = () => {
    setSelectedKeys(""); // 선택된 항목을 해제
  };

  const handleDeleteStyles = (key) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, styles: null } : item))
    );
  };

  const reset = useCallback(() => {
    setStyles(defaultStyles);
    setMenuItems((prev) => prev.map((item) => ({ ...item, styles: null })));
    form.resetFields();
  }, [form]);

  useEffect(() => {
    if (!visibility) {
      reset();
      handleCancel();
      handleDeselect();
    }
  }, [handleCancel, reset, visibility]);

  useEffect(() => {
    const selectedItem = menuItems.find((item) => item.isSelected);
    const styles = selectedItem?.styles || defaultStyles;
    const gridStyles = {};

    menuItems.forEach((item) => {
      if (item.styles) {
        gridStyles[item.key] = flattenObject(item.styles);
        setGridStyles((prev) => ({ ...prev, ...gridStyles }));
      }
    });

    Object.keys(gridStyles).length > 0
      ? setSaveDisabled(false)
      : setSaveDisabled(true);

    form.setFieldsValue(styles);

    setStyles(styles);
  }, [menuItems, form]);

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
              selectedKeys={selectedKeys}
              onClick={handleMenuClick}
              onSelect={({ key }) => {
                if (isFormDisabled) setFormDisabled(false);
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
          <Preview settings={menuItems} type="grid" />
        </ColWrapper>
      </Row>
      <Divider />
      {/* 아래쪽 */}
      <Row gutter={16}>
        {/* 위쪽 */}
        <ColWrapper span={12}>
          <Form
            disabled={isFormDisabled}
            form={form}
            onValuesChange={handleValuesChange}
            layout="vertical"
          >
            <div style={{ flexDirection: "column" }}>
              <Row gutter={10} style={{ flex: 1, marginBottom: 16 }}>
                <Col span={8}>
                  <ItemWrapper name="fontStyle" label="스타일">
                    <Select
                      popupMatchSelectWidth={false}
                      options={FONT_STYLE_OPTIONS}
                    />
                  </ItemWrapper>
                </Col>
                <Col span={8}>
                  <ItemWrapper name="fontSize" label="크기">
                    <Select
                      popupMatchSelectWidth={false}
                      options={FONT_SIZE_OPTIONS}
                    />
                  </ItemWrapper>
                </Col>
                <Col span={8}>
                  <ItemWrapper name="textDecorationLine" label="밑줄">
                    <Select
                      popupMatchSelectWidth={false}
                      options={UNDERLINE_OPTIONS}
                    />
                  </ItemWrapper>
                </Col>
              </Row>
              <Row gutter={10} style={{ flex: 1 }}>
                <Col span={12}>
                  <ItemWrapper name="color" label="색">
                    <ColorPicker onFormatChange={"hex"} showText={true} />
                  </ItemWrapper>
                </Col>
                <Col span={12}>
                  <ItemWrapper name="backgroundColor" label="배경색">
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
                disabled={isFormDisabled}
                size="small"
                color="default"
                variant="text"
                onClick={() => {
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
                disabled={isFormDisabled}
                size="small"
                color="default"
                variant="text"
                onClick={() => handleDeleteStyles(selectedKeys)}
              >
                지우기
              </Button>
            </div>
          </Head>
          <Preview type="text" styles={styles} />
        </ColWrapper>
        {/* 아래쪽 */}
      </Row>
      <Flex gap="middle" justify="end" style={{ padding: "46px 0 24px 0" }}>
        <Button
          disabled={isSaveDisabled || Object.keys(gridStyles).length === 0}
          onClick={() => {
            const hasStyles = Object.keys(gridStyles).length > 0;
            if (hasStyles) saveCustomFormat(gridStyles);
            reset();
            handleCancel();
          }}
          type="primary"
        >
          적용하기
        </Button>
      </Flex>
    </ContentBody>
  );
};

const MenuWrapper = styled.div`
  border-width: 1px;
  border-style: solid;
  border-color: ${({ $colorBorder }) => $colorBorder};
  border-radius: 8px;
  overflow-y: auto;
  height: 300px;
  scrollbar-width: thin;
  scrollbar-color: #eaeaea transparent;
  scrollbar-gutter: stable;

  & > ul {
    border-inline-end: none !important;
  }
`;

const ContentBody = styled.div`
  padding-top: 24px;
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

  & .ant-color-picker-trigger {
    width: 100%;
    justify-content: start;
  }
`;

export default FormatContent;
