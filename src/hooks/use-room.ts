import { getRoomByIdService } from "@/service/room-service";
import { useQuery } from "@tanstack/react-query";

export const useFetchRoomQuery = (tenantId: string) => {
  const roomQuery = useQuery({
    queryKey: ["rooms", tenantId],
    queryFn: () => getRoomByIdService(tenantId),
    enabled: !!tenantId,
  });

  if (!roomQuery.data) {
    return {
      room: null,
      isLoading: true,
      isError: false,
      error: null,
    };  
  }
  
  return {
    room: roomQuery.data.content,
    isLoading: roomQuery.isLoading,
    isError: roomQuery.isError,
    error: roomQuery.error,
  }
}