import { loginService } from "@/service/auth-service";
import { login as loginAction, type AuthStateType } from "@/store/features/auth/authSlice";
import type { LoginSchema } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
const useLogin = () => {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: async (payload: LoginSchema) => await loginService(payload),
		onSuccess: (res) => {
			toast.success("Login successful");

      const payload: AuthStateType = {
        user: {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          role: res.user.role,
          tenent_id: res.user.tenent_id
        },
        accessToken: res.accessToken
      };

			dispatch(loginAction(payload));  // update the auth state in store
		},
		onError: (error) => {
			toast.error(error.message || "Something went wrong. Try again.");
		},
	});
};

export default useLogin;
