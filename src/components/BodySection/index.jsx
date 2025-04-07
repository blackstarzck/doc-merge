import { Flex, Radio, Select } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import FormatHandler from '../FormatHandler'
import SelectSection from '../SelectSection'
import TableSection from '../TableSection'
import { useSelector } from 'react-redux'
import { useIdsFromParams } from '../../hooks/useIdsFromParams'

const setTableKeyById = (idsObj) => {
  const { documentId, organizationId, clientId, vendorId, markClientId } = idsObj
  let key = null
  if (documentId) {
    key = documentId
  } else if (organizationId) {
    key = 'organization'
  } else if (clientId) {
    key = 'client_ledger'
  } else if (vendorId) {
    key = 'vendor_ledger'
  } else if (markClientId) {
    key = 'mark_status'
  }
  console.log('key: ', key)
  return key
}

const BodySection = () => {
  const idsObj = useIdsFromParams()
  const id = setTableKeyById(idsObj)
  console.log('id: ', id)
  const currentDocumentColumns = useSelector((state) => {
    const savedColumns = state.savedColumns.data[id].columns
    return savedColumns
  })
  const [columns, setColumns] = useState([])
  const [viewType, setViewType] = useState('all')

  useEffect(() => {
    console.log('currentDocumentColumns: ', currentDocumentColumns)
    setColumns(currentDocumentColumns)
  }, [currentDocumentColumns])

  return (
    <Wrapper>
      <SelectSection />
      <Flex justify="space-between" gap={16}>
        <Radio.Group
          style={{ width: 450 }}
          block
          options={[
            { label: '모두 보기', value: 'all' },
            { label: '연간', value: 'yearly' },
            { label: '단발', value: 'daily' },
          ]}
          optionType="button"
          buttonStyle="solid"
          defaultValue={'all'}
          onChange={(e) => setViewType(e.target.value)}
        />

        <Select
          mode="multiple"
          allowClear
          placeholder="고정하고 싶은 컬럼을 선택하세요. (중복가능)"
          style={{ width: '100%' }}
          options={currentDocumentColumns.filter((item) => !item.hide).map((col) => ({ label: col.name, value: col.key, key: col.key }))}
          onChange={(pinned) => {
            setColumns((prev) =>
              prev
                .filter((item) => !item.hide)
                .map((item) => ({
                  ...item,
                  pinned: pinned.includes(item.key) ? 'left' : null,
                }))
            )
          }}
          // defaultValue={['a10', 'c12']}
        />
        <FormatHandler />
      </Flex>
      <TableSection viewType={viewType} currentDocumentColumns={columns} />
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
