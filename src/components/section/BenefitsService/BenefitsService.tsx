import BenefitsServiceSwipper from "@/components/ui/BenefitsServiceSwipper/BenefitsServiceSwipper";
import PageContainer from "@/components/layout/PageContainer/PageContainer";

function BenefitsService() {
  return (
    <PageContainer mt={{ xs: 5, sm: 5, md: 15 }}>
      <BenefitsServiceSwipper />
    </PageContainer>
  );
}
export default BenefitsService;
