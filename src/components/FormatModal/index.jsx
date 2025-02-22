import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";

import { setVisibleState } from "../../store/modals/modalsSlice";
import FormatContent from "../FormatContent";

const MODAL_NAME = "formatter";

const FormatModal = () => {
  const [customFormat, setCustomFormat] = useState();
  const isVisible = useSelector(
    (state) => state.modals?.formatter && state.modals?.formatter.visible
  );
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  // ✅ 모달이 열릴 때마다 드래그 위치 초기화
  useEffect(() => {
    if (isVisible && draggleRef.current) {
      draggleRef.current.style.transform = "none"; // 위치 초기화
    }
  }, [isVisible]);

  const saveCustomFormat = (styles) => {
    console.log("saveCustomFormat: ", styles); // 모달에서 전달한 저장된 스타일값을 어디에 저장해야함
    dispatch(setVisibleState({ modalName: MODAL_NAME, visible: false }));
  };

  const handleCancel = () => {
    dispatch(setVisibleState({ modalName: MODAL_NAME, visible: false }));
  };

  const onDragStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{ width: "100%", cursor: "move" }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            새 표 스타일
          </div>
        }
        centered
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        open={isVisible}
        footer={null}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds} // boundary, 드래그 범위 제한
            nodeRef={draggleRef}
            onStart={(event, uiData) => onDragStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <FormatContent
          handleCancel={handleCancel}
          saveCustomFormat={saveCustomFormat}
        />
      </Modal>
    </>
  );
};

export default FormatModal;
