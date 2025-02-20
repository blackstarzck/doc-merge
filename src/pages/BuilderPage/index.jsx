import { useEffect } from "react";
import { useDispatch } from "react-redux";

import BodySection from "../../components/BodySection";
import MainLayout from "../../components/MainLayout";
import getDocuments from "../../services/getDocuments";

const BuilderPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  return (
    <MainLayout>
      <BodySection />
    </MainLayout>
  );
};

export default BuilderPage;
