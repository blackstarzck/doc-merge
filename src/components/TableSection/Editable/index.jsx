import { Form, Input } from "antd";
import isEqual from "lodash.isequal";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const EditableContext = React.createContext(null);

export const EditableRow = ({ ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false} autoComplete="off">
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCellComponent = ({
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

  console.log("yes?");

  useEffect(() => {
    setFieldValues();
  }, []);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const toggleEdit = (isVisible) => {
    if (isEditing === isVisible) return;
    setIsEditing(isVisible);
  };

  const setFieldValues = () => {
    if (!dataIndex) return;
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const isSaving = useRef(false);
  const save = async () => {
    if (isSaving.current) return;
    isSaving.current = true;

    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
      console.log("save: ", { ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    } finally {
      setTimeout(() => {
        isSaving.current = false;
      }, 100);
    }
  };

  return (
    <Wrapper
      className="ant-table-cell ant-table-selection-column"
      $isCheckBox={!dataIndex}
    >
      {dataIndex && (
        <InputWrapper $isEditing={isEditing}>
          <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[]}>
            <Input
              ref={inputRef}
              onPressEnter={() => {
                save();
                toggleEdit(true);
              }}
              onBlur={() => {
                save();
                toggleEdit(false);
              }}
              onFocus={() => toggleEdit(true)}
            />
          </Form.Item>
        </InputWrapper>
      )}
      <TextWrapper $isEditing={isEditing} onClick={() => toggleEdit(true)}>
        {children}
      </TextWrapper>
    </Wrapper>
  );
};

export const EditableCell = React.memo(
  EditableCellComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.record &&
      nextProps.record &&
      isEqual(prevProps.record, nextProps.record)
    );
  }
);

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
