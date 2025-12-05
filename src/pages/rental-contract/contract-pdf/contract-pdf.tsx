import type { Contract } from "@/types/contract";
import { Document, Page } from "@react-pdf/renderer";
import { styles } from "./contract-styles";
import ContractHeader from "./PDF/contract-header";
import TenantAndRoomDetails from "./PDF/tenant-room-details";
import ContractTerms from "./PDF/contract-terms";
import ContractFacilities from "./PDF/contract-facilities";
import ContractFooter from "./PDF/contract-footer";

type ContractPDFProps = {
  contract: Contract;
};

const ContractPDF = ({ contract }: ContractPDFProps) => {
  const { tenant, room, contractType, createdDate, expiryDate } = contract;

  return (
    <Document>
      <Page size={{ width: 300, height: 750 }} style={styles.page}>
        <ContractHeader tenant={tenant} contractId={contract.id} />
        <TenantAndRoomDetails tenant={tenant} room={room} />
        <ContractTerms
          startDate={createdDate}
          endDate={expiryDate}
          contractType={contractType}
        />
        <ContractFacilities facilities={contractType.facilities} />
        <ContractFooter />
      </Page>
    </Document>
  );
};

export default ContractPDF;
