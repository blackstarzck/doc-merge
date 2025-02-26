import { useEffect } from "react"
import { useDispatch } from "react-redux"

import BodySection from "../../components/BodySection"
import MainLayout from "../../components/MainLayout"
import getOrganizations from "../../services/getOrganizations"

const BuilderPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrganizations())
  }, [dispatch])

  return (
    <MainLayout>
      <BodySection />
    </MainLayout>
  )
}

export default BuilderPage
