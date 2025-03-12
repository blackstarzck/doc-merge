import { Button, Col, ColorPicker, Divider, Flex, Form, Menu, Row, Select, theme } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import {
  DEFAULT_STYLES,
  FONT_SIZE_OPTIONS,
  FONT_STYLE_OPTIONS,
  TABLE_ELEMENTS,
  UNDERLINE_OPTIONS,
} from "../../constants/options"
import { setFormat } from "../../store/format/formatSlice"
import { updateFormatItem } from "../../store/formatItems/formatItemsSlice"
import Preview from "../Preview"
import ElementItem from "./ElementItem/ElementItem"


const FormatContent = ({ handleCancel }) => {
  const [form] = Form.useForm()
  const [styles, setStyles] = useState(DEFAULT_STYLES)
  const selectedFormat = useSelector((state) => state.modals.modals.formatter)
  const [elements, setElements] = useState([])
  const [selectedKey, setSelectedKey] = useState(null) // 리스트 모두 styles 가 없을때 비활성화
  const isVisible = useSelector(
    (state) => state.modals.modals.formatter.visible
  )
  const dispatch = useDispatch()
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
    setStyles(DEFAULT_STYLES)
    setSelectedKey(null)
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
          styles: selectedFormat.elements[key],
        })
      }
      console.log("selectedElemenets: ", selectedElemenets)
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
              selectedKeys={selectedKey}
              onSelect={({ key }) => {
                const find = elements.find((item) => item.key === key)

                console.log("find: ", find, key)

                const styles = find.styles ? find.styles : DEFAULT_STYLES

                setSelectedKey(key)
                setStyles(styles)
                form.setFieldsValue(styles)
              }}
              mode="inline"
              items={elements.map((item) => ({
                key: item.key,
                label: (
                  <ElementItem hasStyles={item.styles ? true : false}>
                    {item.label}
                  </ElementItem>
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
          <Preview type="grid" elements={elements} />
        </ColWrapper>
      </Row>
      <Divider />
      {/* 아래쪽 */}
      <Row gutter={16}>
        {/* 위쪽 */}
        <ColWrapper span={12}>
          <Form
            disabled={!selectedKey}
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
                disabled={!selectedKey}
                size="small"
                color="default"
                variant="text"
                onClick={() => {
                  const update = elements.map((item) =>
                    item.key === selectedKey ? { ...item, styles } : item
                  )
                  setElements(update)
                }}
              >
                저장
              </Button>
              <Divider type="vertical" />
              <Button
                disabled={!selectedKey}
                size="small"
                color="default"
                variant="text"
                onClick={() => {
                  const update = elements.map((item) =>
                    item.key === selectedKey ? { ...item, styles: null } : item
                  )
                  setElements(update)
                  setStyles(DEFAULT_STYLES)
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
            const update = {
              id: selectedFormat.key,
              changes: {
                elements: {},
              },
            }
            elements.forEach((item) => {
              update.changes.elements[item.key] = item.styles || null
            })
            console.log("update: ", update)
            console.log("elements: ", update.changes.elements)

            dispatch(setFormat({ ...selectedFormat, elements: update.changes.elements }))
            dispatch(updateFormatItem({ ...update }))
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

const ItemWrapper = styled(Form.Item)`
  margin-bottom: 0;
  overflow: hidden;

  & .ant-color-picker-trigger {
    width: 100%;
    justify-content: start;
  }
`

export default FormatContent
