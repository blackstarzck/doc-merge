import { useDispatch } from "react-redux"

import BodySection from "../../components/BodySection"
import MainLayout from "../../components/MainLayout"

const BuilderPage = () => {
  const dispatch = useDispatch()

  return (
    <MainLayout>
      <BodySection />
    </MainLayout>
  )
}

export default BuilderPage
