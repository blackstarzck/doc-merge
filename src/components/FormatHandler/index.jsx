import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Select, Space, Tag } from "antd";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { DEFAULT_FORMAT_ITEMS } from "../../constants/options";
import { setVisibleState } from "../../store/modals/modalsSlice";
import FormatModal from "../FormatModal";

let index = 0;

const FormatHandler = () => {
  const [form] = Form.useForm();
  const [formatItems, setFormatItems] = useState(DEFAULT_FORMAT_ITEMS);
  const inputRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  const onNameChange = (event) => {
    setIsDisabled((prev) => !form.getFieldValue("customFormatName"));
  };
  const addItem = (e) => {
    e.preventDefault();

    console.log("addItem: ", inputRef);

    // Submit form to trigger validation
    form
      .validateFields()
      .then(() => {
        setFormatItems([
          ...formatItems,
          {
            key: `custom-${index++}`,
            label: form.getFieldValue("customFormatName"),
          },
        ]);

        form.setFieldValue("customFormatName", "");

        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  const onClickDeleteFormat = (key) => {
    setFormatItems((prev) => prev.filter((item) => item.key !== key));
  };

  const openFormatter = () => {
    setTimeout(() => {
      dispatch(setVisibleState({ modalName: "formatter", visible: true }));
    }, 200);
  };

  const onFinish = (values) => {
    console.log("폼 제출됨:", values);
  };

  const validateSameName = (_, value) => {
    const filter = formatItems.filter((item) => item.label === value);
    const isSameName = filter.length > 0;

    if (isSameName) {
      return Promise.reject(new Error("존재하는 서식이름입니다"));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Wrapper>
        <Select
          style={{ width: 300 }}
          onSelect={(data) => {
            if (data.includes("custom")) openFormatter();
          }}
          onDropdownVisibleChange={() => {
            form.setFieldValue("customFormatName", "");
          }}
          optionLabelProp="key"
          options={formatItems.map((item) => ({
            label: (
              <OptionWrapper>
                <div>
                  {item.key.includes("custom") && (
                    <Tag color="magenta">새 서식</Tag>
                  )}
                  <span>{item.label}</span>
                </div>
                {item.key.includes("custom") && (
                  <Button
                    variant="text"
                    color="defalut"
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClickDeleteFormat(item.key);
                    }}
                  />
                )}
              </OptionWrapper>
            ),
            value: item.key,
            key: item.label,
          }))}
          placeholder="서식을 선택해주세요"
          dropdownRender={(menu) => {
            return (
              // customized dropdown
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <FormWrapper form={form} onFinish={onFinish}>
                    <Form.Item
                      name="customFormatName"
                      rules={[{ validator: validateSameName }]}
                    >
                      <Input
                        ref={inputRef}
                        allowClear
                        autoSave="off"
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        disabled={isDisabled}
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Add item
                      </Button>
                    </Form.Item>
                  </FormWrapper>
                </Space>
              </>
            );
          }}
        />
      </Wrapper>

      <FormatModal />
    </>
  );
};

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FormWrapper = styled(Form)`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 8px;
`;

export default FormatHandler;
