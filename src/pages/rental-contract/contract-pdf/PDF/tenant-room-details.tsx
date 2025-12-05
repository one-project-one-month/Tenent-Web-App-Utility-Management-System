import { Text, View } from "@react-pdf/renderer";
import { styles } from "../contract-styles";
import type { Room, Tenant } from "@/types/contract";

interface Props {
  tenant: Tenant;
  room: Room;
}

export default function TenantAndRoomDetails({ tenant, room }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>TENANT & PROPERTY DETAILS</Text>
      <View style={styles.twoColumn}>
        <View style={styles.column}>
          <Text style={styles.label}>Tenant Name:</Text>
          <Text style={styles.value}>{tenant.name}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{tenant.email}</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{tenant.phNumber}</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Room No:</Text>
          <Text style={styles.value}>{room.roomNo}</Text>

          <Text style={styles.label}>Floor:</Text>
          <Text style={styles.value}>{room.floor}</Text>

          <Text style={styles.label}>Dimensions:</Text>
          <Text style={styles.value}>{room.dimension}</Text>
        </View>
      </View>
    </View>
  );
}
