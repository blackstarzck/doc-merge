import { useParams } from "react-router-dom"

export const useSheetId = () => {
  const { sheetId } = useParams()
  return parseInt(sheetId)
}
