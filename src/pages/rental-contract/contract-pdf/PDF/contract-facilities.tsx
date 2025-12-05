import { Text, View } from "@react-pdf/renderer";
import { styles } from "../contract-styles";

interface Props {
  facilities: string[];
}

export default function ContractFacilities({ facilities }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>FACILITIES INCLUDED</Text>
      {facilities.map((item, i) => (
        <Text key={i} style={styles.value}>
          • {item}
        </Text>
      ))}
    </View>
  );
}
