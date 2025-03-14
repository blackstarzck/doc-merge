import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { OVERVIEW_TABLES } from '../constants/menu'
import { selectOrganizationInfoById } from '../store/organizationInfo/organizationInfoSlice'
import { useIdsFromParams } from './useIdsFromParams'

export const useSetFileName = () => {
  const { documentId, organizationId, clientId, vendorId } = useIdsFromParams()
  const org = useSelector((state) => (organizationId ? selectOrganizationInfoById(state, organizationId) : null))

  return useMemo(() => {
    const yyyymmdd = DateTime.now().toFormat('yyyyMMdd')
    let fileName = ''

    if (documentId) {
      fileName = OVERVIEW_TABLES.find((table) => table.key === documentId)?.label
    } else if (organizationId) {
      fileName = org?.name
    } else if (clientId) {
      fileName = '매출처 원장'
    } else if (vendorId) {
      fileName = '매입처 원장'
    }
    return `${yyyymmdd}_${fileName}`
  }, [documentId, organizationId, clientId, vendorId])
}
