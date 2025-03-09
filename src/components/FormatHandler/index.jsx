import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Select, Space, Tag } from "antd";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { DEFAULT_FORMAT_ITEMS } from "../../constants/options";
import { setVisibleState } from "../../store/modals/modalsSlice";
import FormatModal from "../FormatModal";

let index = 0;
const LOCAL_STORAGE_KEY = "formatItems";

const setUniqueNumber = (array) => {
  // "custom-"으로 시작하는 항목 필터링 및 숫자 추출
  const customNumbers = array
    .map((item) => item.key.match(/^custom-(\d+)$/)) // "custom-" 다음 숫자 찾기
    .filter(Boolean) // null 값 제거
    .map((match) => Number(match[1])); // 숫자로 변환

  let newNumber;

  if (customNumbers.length === 0) {
    // "custom-" 항목이 없으면 첫 번째 항목으로 "custom-1" 추가
    newNumber = 1;
  } else {
    // 1부터 최대 숫자 사이에서 비어있는 숫자 찾기
    for (let i = 1; i <= Math.max(...customNumbers) + 1; i++) {
      if (!customNumbers.includes(i)) {
        newNumber = i;
        break;
      }
    }
  }
  return newNumber;
};

const FormatHandler = () => {
  const [form] = Form.useForm();
  const [formatItems, setFormatItems] = useState(() => {
    const items = localStorage.getItem(LOCAL_STORAGE_KEY);
    return items ? JSON.parse(items) : DEFAULT_FORMAT_ITEMS;
  });
  const inputRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  const onNameChange = (event) => {
    setIsDisabled((prev) => !form.getFieldValue("customFormatName"));
  };

  const addItem = (e) => {
    // e.preventDefault();

    console.log("addItem: ", inputRef);

    // Submit form to trigger validation
    form
      .validateFields()
      .then(() => {
        setFormatItems((prev) => {
          const newNumber = setUniqueNumber(prev);
          const newItems = [
            ...prev,
            {
              key: `custom-${newNumber}`,
              label: form.getFieldValue("customFormatName"),
              elements: null,
            },
          ];
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newItems));
          return newItems;
        });

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
    setFormatItems((prev) => {
      const newItems = prev.filter((item) => item.key !== key);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newItems));
      return newItems;
    });
  };

  const openFormatter = () => {
    setTimeout(() => {
      dispatch(setVisibleState({ modalName: "formatter", visible: true }));
    }, 200);
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
                  <FormWrapper
                    form={form}
                    onFinish={addItem}
                    autoComplete="off"
                  >
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
                        label={null}
                        htmlType="submit"
                        disabled={isDisabled}
                        type="text"
                        icon={<PlusOutlined />}
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
