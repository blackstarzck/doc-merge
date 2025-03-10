import { CheckCircleTwoTone } from "@ant-design/icons"
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
} from "antd"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled, { css } from "styled-components"

import {
  FONT_SIZE_OPTIONS,
  FONT_STYLE_OPTIONS,
  TABLE_ELEMENTS,
  UNDERLINE_OPTIONS,
} from "../../constants/options"
import { setFormat } from "../../store/format/formatSlice"
import {
  selectFormatItemByKey,
  updateFormatItem,
} from "../../store/formatItems/formatItemsSlice"
import { updateContents } from "../../store/modals/modalsSlice"
import Preview from "../Preview"

const { Item } = Form

const MenuItem = ({ hasStyles, children }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken()
  return (
    <Wrap $hasStyles={hasStyles} $colorPrimary={colorPrimary}>
      <span>{children}</span>
      {hasStyles && <CheckCircleTwoTone twoToneColor={colorPrimary} />}
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;

  & > span {
    ${({ $hasStyles, $colorPrimary }) => {
      if ($hasStyles) {
        return css`
          color: ${$colorPrimary};
        `
      }
    }};
  }
`

const defaultStyles = {
  fontSize: FONT_SIZE_OPTIONS[5].value,
  fontStyle: FONT_STYLE_OPTIONS[0].value,
  textDecorationLine: UNDERLINE_OPTIONS[0].value,
  textDecorationColor: "#000000",
  color: "#000000",
  backgroundColor: "#ffffff",
}

const FormatContent = ({ handleCancel, saveNewFormat }) => {
  const [form] = Form.useForm()
  const [styles, setStyles] = useState(defaultStyles)
  const selectedFormat = useSelector((state) => state.modals.modals.formatter)
  const dispatch = useDispatch()
  const [elements, setElements] = useState([])
  const [selectedKeys, setSelectedKeys] = useState(null) // 리스트 모두 styles 가 없을때 비활성화
  const isVisible = useSelector(
    (state) => state.modals.modals.formatter.visible
  )
  const {
    token: { colorBorder },
  } = theme.useToken()

  const handleValuesChange = (data) => {
    const [[key, value]] = Object.entries(data)
    const parsedValue =
      key === "color" || key === "backgroundColor"
        ? { [key]: value.toHexString() }
        : { [key]: value }

    setStyles((prev) => {
      const update = { ...prev, ...parsedValue }
      return update
    })
  }

  const initReset = useCallback(() => {
    setStyles(defaultStyles)
    setSelectedKeys(null)
    // form.resetFields()
  }, [form])

  useEffect(() => {
    console.log("====================================")
    console.log("selectedFormat: ", selectedFormat)
    console.log("====================================")
    if (isVisible) {
      const selectedElemenets = []
      for (const key in selectedFormat.elements) {
        selectedElemenets.push({
          key,
          label: TABLE_ELEMENTS.find((item) => item.key === key).label,
          styles: selectedFormat.elements[key]?.styles,
        })
      }
      setElements(selectedElemenets)
    }
  }, [selectedFormat])

  useEffect(() => {
    if (!isVisible) {
      initReset()
      handleCancel()
    }
  }, [isVisible])

  useEffect(() => {
    form.setFieldsValue(styles)
    setStyles(styles)
  }, [form, styles])

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
              onSelect={({ key }) => {
                const find = elements.find((item) => item.key === key)
                const styles = find.styles ? find.styles : defaultStyles

                console.log("find: ", find)
                console.log("onSelect", key)
                console.log("styles: ", find.styles || defaultStyles)
                console.log("[1] form getFieldsValue: ", form.getFieldsValue())

                setSelectedKeys(key)
                setStyles(styles)
                form.setFieldsValue(styles)
                console.log("[2] form getFieldsValue: ", form.getFieldsValue())
              }}
              mode="inline"
              items={elements.map((item) => ({
                key: item.key,
                label: (
                  <MenuItem hasStyles={item.styles ? true : false}>
                    {item.label}
                  </MenuItem>
                ),
              }))}
            />
          </MenuWrapper>
        </ColWrapper>
        {/* 오른쪽 */}
        <ColWrapper span={12}>
          <Head>
            <h4>미리 보기</h4>
          </Head>
          {/* [1] 미리보기 */}
          <Preview type="grid" settings={null} />
        </ColWrapper>
      </Row>
      <Divider />
      {/* 아래쪽 */}
      <Row gutter={16}>
        {/* 위쪽 */}
        <ColWrapper span={12}>
          <Form
            disabled={!selectedKeys}
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
                disabled={!selectedKeys}
                size="small"
                color="default"
                variant="text"
                onClick={() => {
                  const element = selectedFormat.elements[selectedKeys]
                  const update = {
                    ...selectedFormat,
                    elements: {
                      ...selectedFormat.elements,
                      [selectedKeys]: { ...element, styles },
                    },
                  }
                  dispatch(updateContents(update))
                }}
              >
                저장
              </Button>
              <Divider type="vertical" />
              <Button
                disabled={!selectedKeys}
                size="small"
                color="default"
                variant="text"
                onClick={() => {
                  const element = selectedFormat.elements[selectedKeys]
                  setStyles(defaultStyles)
                  dispatch(
                    updateContents({
                      ...selectedFormat,
                      elements: {
                        ...selectedFormat.elements,
                        [selectedKeys]: { ...element, styles: null },
                      },
                    })
                  )
                }}
              >
                지우기
              </Button>
            </div>
          </Head>
          {/* [2] 미리보기 */}
          <Preview type="text" styles={styles} />
        </ColWrapper>
        {/* 아래쪽 */}
      </Row>
      <Flex gap="middle" justify="end" style={{ padding: "46px 0 24px 0" }}>
        <Button
          size="large"
          disabled={false}
          onClick={() => {
            const element = selectedFormat.elements[selectedKeys]

            // dispatch(setFormat())
            dispatch(
              updateFormatItem({
                id: selectedFormat.key,
                changes: {
                  elements: {
                    ...selectedFormat.elements,
                    [selectedKeys]: { ...element, styles },
                  },
                },
              })
            )
            initReset()
            handleCancel()
          }}
          type="primary"
        >
          적용하기
        </Button>
      </Flex>
    </ContentBody>
  )
}

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
`

const ContentBody = styled.div`
  padding-top: 24px;
`

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;

  & > div span {
    color: #555555;
  }
`

const ColWrapper = styled(Col)`
  display: flex;
  flex-direction: column;
`

const ItemWrapper = styled(Item)`
  margin-bottom: 0;
  overflow: hidden;

  & .ant-color-picker-trigger {
    width: 100%;
    justify-content: start;
  }
`

export default FormatContent
