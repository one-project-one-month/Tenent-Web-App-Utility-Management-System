import { Text, View } from "@react-pdf/renderer";
import { styles } from "../contract-styles";
import type { Tenant } from "@/types/contract";

interface Props {
  tenant: Tenant;
  contractId: string;
}

export default function ContractHeader({ tenant, contractId }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.leftHeader}>
        <Text style={styles.companyName}>Yan Nyein Eain Yar</Text>
        <Text style={styles.companyAddress}>
          {tenant.name}
          {"\n"}
          {tenant.nrc}
          {"\n"}
          Phone: {tenant.phNumber}
          {"\n"}
          Email: {tenant.email}
        </Text>
      </View>

      <View style={styles.rightHeader}>
        <Text style={styles.header}>RENTAL CONTRACT</Text>
        <Text style={styles.label}>
          #{contractId.slice(0, 8).toUpperCase()}
        </Text>
      </View>
    </View>
  );
}
