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
  const [items, setItems] = useState(DEFAULT_FORMAT_ITEMS);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const onNameChange = (event) => {
    console.log("onNameChange: ", event.target.value);

    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();

    // Submit form to trigger validation
    form
      .validateFields()
      .then(() => {
        setItems([...items, { key: `custom-${index++}`, label: name }]);
        setName("");
        form.setFieldValue("confirm", "");
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  const onClickDeleteFormat = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
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
    const filter = items.filter((item) => item.label === value);
    const isSameName = filter.length > 0;
    console.log("validateSameName value: ", value, name, isSameName);

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
            setName("");
          }}
          optionLabelProp="key"
          options={items.map((item) => ({
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
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <FormWrapper form={form} onFinish={onFinish}>
                    <Form.Item
                      name="confirm"
                      rules={[{ validator: validateSameName }]}
                    >
                      <Input
                        ref={inputRef}
                        value={name}
                        allowClear
                        autoSave="off"
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        disabled={!name}
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
