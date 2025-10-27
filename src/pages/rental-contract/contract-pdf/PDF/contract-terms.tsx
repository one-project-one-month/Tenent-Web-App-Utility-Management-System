import { Text, View } from "@react-pdf/renderer";
import { styles } from "../contract-styles";
import type { ContractType } from "@/types/contract";

interface Props {
  startDate: string;
  endDate: string;
  contractType: ContractType;
}

export default function ContractTerms({
  startDate,
  endDate,
  contractType,
}: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>CONTRACT TERMS</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Contract Type:</Text>
        <Text style={styles.value}>{contractType.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Duration:</Text>
        <Text style={styles.value}>{contractType.duration} months</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>
          {parseInt(contractType.price).toLocaleString()} MMK
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Start Date:</Text>
        <Text style={styles.value}>
          {new Date(startDate).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>End Date:</Text>
        <Text style={styles.value}>
          {new Date(endDate).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
