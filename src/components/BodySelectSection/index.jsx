import { Space } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { getAllClient, selectAllClient } from '../../store/client/clientSlice'
import { getAllMarkClient, selectAllMarkClient } from '../../store/markClient/markClientSlice'
import { getAllVendor, selectAllVendor } from '../../store/vendor/vendorSlice'
import SelectField from '../SelectField'

const BodySelectSection = () => {
  const dispatch = useDispatch()
  const clients = useSelector(selectAllClient) || []
  const vendors = useSelector(selectAllVendor) || []
  const markClients = useSelector(selectAllMarkClient) || []

  useEffect(() => {
    dispatch(getAllClient()).then((res) => {
      console.log('client: ', res.payload)
    })

    dispatch(getAllVendor()).then((res) => {
      console.log('vendor: ', res.payload)
    })

    dispatch(getAllMarkClient()).then((res) => {
      console.log('mark client: ', res.payload)
    })
  }, [])

  return (
    <SpaceWrapper align="start">
      <Space wrap size="large">
        <SelectField table="client" option={clients} />
        <SelectField table="vendor" option={vendors} />
        <SelectField table="mark_info" option={markClients} />
      </Space>
    </SpaceWrapper>
  )
}

const SpaceWrapper = styled(Space)`
  width: 100%;
  justify-content: space-between;
`

export default BodySelectSection
