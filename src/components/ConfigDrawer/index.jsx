import { SettingOutlined } from '@ant-design/icons'
import { Button, Drawer, message } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TABLE_COLUMNS } from '../../constants/tables'
import { useIdsFromParams } from '../../hooks/useIdsFromParams'
import DrawerContent from './DrawerContent'

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

const ConfigDrawer = () => {
  const idsObj = useIdsFromParams()
  const [open, setOpen] = useState(false)
  const [titleObj, setTitleObj] = useState({ title: '', key: '' })
  const [messageApi, messageContextHolder] = message.useMessage()

  const onSavedSuccess = () => {
    messageApi.open({
      type: 'success',
      content: `${titleObj.title}의 컬럼설정이 완료되었습니다.`,
    })
    setOpen(false)
  }

  useEffect(() => {
    setTitleObj(() => {
      const id = setTableKeyById(idsObj)
      const find = TABLE_COLUMNS.find((table) => table.key === id)
      return { title: find.label, key: id }
    })
  }, [idsObj])

  return (
    <>
      {messageContextHolder}
      <DrawerButton
        type="text"
        icon={<SettingOutlined />}
        onClick={() => setOpen(true)}
        style={{
          fontSize: '16px',
          width: 48,
          height: 48,
        }}
      />
      <Drawer
        open={open}
        size="default"
        width="inherit"
        closable
        destroyOnClose={true}
        title={<p>{`${titleObj.title} 설정`}</p>}
        placement="right"
        onClose={() => setOpen(false)}
      >
        <DrawerContent titleObj={titleObj} onSavedSuccess={onSavedSuccess} />
      </Drawer>
    </>
  )
}

const DrawerButton = styled(Button)`
  z-index: 1;
  position: absolute;
  top: 6px;
  right: 6px;
  background-color: #ffffff;
  font-size: 26px;
  box-shadow:
    0px 6px 16px -8px rgba(0, 0, 0, 0.16),
    0px 3px 6px 0px rgba(0, 0, 0, 0.12),
    0px 5px 12px 4px rgba(0, 0, 0, 0.09);
`

export default ConfigDrawer
