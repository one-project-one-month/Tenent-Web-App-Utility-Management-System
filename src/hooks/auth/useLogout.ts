import { logoutService } from "@/service/auth-service"
import { logout as logoutAction } from "@/store/features/auth/authSlice"
import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { toast } from "sonner"

const useLogout = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async () => await logoutService(),
    onSuccess: () => {
      toast.success("Logout successful");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Try again.");
    },
    onSettled: () => dispatch(logoutAction()) // update the auth state in store
  })
}

export default useLogout;