import { Space } from 'antd'
import styled from 'styled-components'

import ClientLedger from '../SelectField/ClientLedger'
import MarkStatus from '../SelectField/MarkStatus'
import VendorLedger from '../SelectField/VendorLedger'

const BodySelectSection = () => {
  return (
    <SpaceWrapper align="start">
      <Space wrap size="large">
        <ClientLedger />
        <VendorLedger />
        <MarkStatus />
      </Space>
    </SpaceWrapper>
  )
}

const SpaceWrapper = styled(Space)`
  width: 100%;
  justify-content: space-between;
`

export default BodySelectSection
