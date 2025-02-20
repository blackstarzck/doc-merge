import { Form, Input } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const EditableContext = React.createContext(null);

export const EditableRow = ({ ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      component={false}
      name={`row-${props["data-row-key"]}`}
      autoComplete="off"
    >
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    setFieldValues(); ///
  }, []);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const toggleEdit = (isVisible) => {
    if (isEditing === isVisible) return;

    setIsEditing(() => isVisible);
  };

  const setFieldValues = (data) => {
    if (!dataIndex) return;

    const value = data ?? record[dataIndex];

    form.setFieldsValue({
      [dataIndex]: value,
    });
  };

  const isSaving = useRef(false);
  const save = async () => {
    if (isSaving.current) return; // 이미 실행 중이면 return
    isSaving.current = true; // 실행 시작

    try {
      const values = await form.validateFields();
      // toggleEdit();
      handleSave({ ...record, ...values });
      console.log("cell values: ", values);
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    } finally {
      setTimeout(() => {
        isSaving.current = false; // 일정 시간 후 다시 실행 가능
      }, 100);
    }
  };
  return (
    <Wrapper
      className="ant-table-cell ant-table-selection-column"
      $isCheckBox={dataIndex ? false : true}
    >
      {dataIndex && (
        <InputWrapper $isEditing={isEditing}>
          <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[]}>
            <Input
              ref={inputRef}
              onChange={(e) => {}}
              onPressEnter={() => {
                save();
                toggleEdit(true);
              }}
              onBlur={() => {
                save();
                toggleEdit(false);
              }}
              onFocus={(e) => {
                toggleEdit(true);
              }}
            />
          </Form.Item>
        </InputWrapper>
      )}

      <TextWrapper
        $isEditing={isEditing}
        onClick={(e) => {
          toggleEdit(true);
        }}
      >
        {children}
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.td`
  position: relative;
  height: 55px;
  overflow: auto;

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    padding-left: ${({ $isCheckBox }) => ($isCheckBox ? 0 : "10px")};
    justify-content: ${({ $isCheckBox }) =>
      $isCheckBox ? "center" : "flex-start"};
  }
`;

const InputWrapper = styled.div`
  z-index: ${({ $isEditing }) => ($isEditing ? 1 : -1)};
`;

const TextWrapper = styled.div`
  width: 100%;
  /* background-color: #ffffff; */
  z-index: ${({ $isEditing }) => ($isEditing ? 0 : 1)};
  cursor: pointer;
`;
