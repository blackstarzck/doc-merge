import { theme } from "antd"
import { CheckCircleTwoTone } from "@ant-design/icons"
import React from "react"
import styled, { css } from "styled-components"

const ElementItem = ({ hasStyles, children }) => {
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

interface WrapProps {
  $hasStyles: boolean
  $colorPrimary: string
}

const Wrap = styled.div<WrapProps>`
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

export default ElementItem
