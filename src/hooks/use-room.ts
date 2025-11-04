import { getRoomByIdService } from "@/service/room-service";
import { useQuery } from "@tanstack/react-query";

export const useFetchRoomQuery = (roomId: string) => {
  const roomQuery = useQuery({
    queryKey: ["rooms", roomId],
    queryFn: () => getRoomByIdService(roomId),
    enabled: !!roomId,
  });

  if (!roomQuery.data) {
    return {
      room: null,
      isLoading: true,
      isError: false,
      error: null,
    };  
  }
  
  console.log("room query: ", roomQuery);
  return {
    room: roomQuery.data.content,
    isLoading: roomQuery.isLoading,
    isError: roomQuery.isError,
    error: roomQuery.error,
  }
}