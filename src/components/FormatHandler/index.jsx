import { Button, Divider, Dropdown, Space, theme } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setVisibleState } from "../../store/modals/modalsSlice";
import FormatModal from "../FormatModal";
import { TableEditOutLined } from "../icons";

const items = [
  {
    key: "1",
    label: "Type-A",
  },
  {
    key: "2",
    label: "Type-B",
  },
  {
    key: "3",
    label: "Type-C",
  },
];

const { useToken } = theme;

const FormatHandler = () => {
  const { token } = useToken();
  const [open, setOpen] = React.useState(false);
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const dispatch = useDispatch();

  const onClickSelectStyle = (param) => {
    setOpen(false);
  };

  const onClickOpenFormatter = () => {
    setOpen(false);
    setTimeout(() => {
      dispatch(setVisibleState({ modalName: "formatter", visible: true }));
    }, 200);
  };

  return (
    <>
      <Wrapper>
        <Dropdown
          open={open}
          onOpenChange={(open) => setOpen(open)}
          menu={{ items, onClick: onClickSelectStyle }}
          trigger={["click"]}
          dropdownRender={(menu) => (
            <div style={contentStyle}>
              {React.cloneElement(menu, {
                style: { boxShadow: "none" },
              })}
              <Divider style={{ margin: 0 }} />
              <SpaceWrapper style={{ padding: 16, width: "100%" }}>
                <Button
                  onClick={onClickOpenFormatter}
                  style={{ width: "100%" }}
                  type="primary"
                >
                  표 스타일 새로 만들기
                </Button>
              </SpaceWrapper>
            </div>
          )}
        >
          <Button icon={<TableEditOutLined style={{ fontSize: 22 }} />}>
            표 서식
          </Button>
        </Dropdown>
      </Wrapper>

      <FormatModal />
    </>
  );
};

const Wrapper = styled.div`
  text-align: right;
`;

const SpaceWrapper = styled(Space)`
  padding: 16px;
  width: 100%;

  & .ant-space-item {
    width: 100%;
  }
`;

export default FormatHandler;
