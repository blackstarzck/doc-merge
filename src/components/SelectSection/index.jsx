import { Space } from 'antd'
import styled from 'styled-components'

import ClientLedger from '../ClientLedger'
import MarkStatus from '../MarkStatus'
import VendorLedger from '../VendorLedger'

const SelectSection = () => {
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

export default SelectSection
