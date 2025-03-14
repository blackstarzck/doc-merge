import { Button, Select, Space } from 'antd'
import styled from 'styled-components'

import SelectField from '../SelectField'

const BodySelectSection = () => {
  const onChange = (value) => {
    console.log(`selected ${value}`)
  }

  const onSearch = (value) => {
    console.log('search:', value)
  }

  return (
    <SpaceWrapper align="start">
      <Space wrap size="large">
        <SelectField name="client" onChange={onChange} onSearch={onSearch} />
        <SelectField name="vendor" onChange={onChange} onSearch={onSearch} />
        <SelectField name="mark_info" onChange={onChange} onSearch={onSearch} />
      </Space>
      <Button type="primary" size="mdeium">
        생성
      </Button>
    </SpaceWrapper>
  )
}

const SpaceWrapper = styled(Space)`
  width: 100%;
  justify-content: space-between;
`

export default BodySelectSection
