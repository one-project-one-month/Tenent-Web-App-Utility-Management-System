import { Text, View } from "@react-pdf/renderer";
import { styles } from "../contract-styles";

export default function ContractFooter() {
  return (
    <View style={styles.footer}>
      <Text>Thank you for choosing Pann Hlaing Eain Yar.</Text>
      <Text>
        This document was generated on {new Date().toLocaleDateString()}.
      </Text>
    </View>
  );
}
