import { useEffect } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import ActionHandler from "../ActionHandler"
import BodySelectSection from "../BodySelectSection"
import FormatHandler from "../FormatHandler"
import TableSection from "../TableSection"

const BodySection = () => {
  const organizations = useSelector((state) => state.organizations.data)

  useEffect(() => {
    // console.log("1. organizations: ", organizations);
  }, [organizations])

  return (
    <Wrapper>
      <BodySelectSection />
      <FormatHandler />
      <TableSection />
      <ActionHandler />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 18px;
  flex-direction: column;
  height: 100%;
`

export default BodySection
