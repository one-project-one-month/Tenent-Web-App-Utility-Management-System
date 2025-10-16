import { loginService, logoutService } from "@/service/auth-service";
import {
	login as loginAction,
	logout as logoutAction,
} from "@/store/features/auth/authSlice";
import { type LoginResponse, type LoginSchema } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useLogin = () => {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: (formData: LoginSchema) => loginService(formData),
		onSuccess: (data: LoginResponse) => {
			dispatch(loginAction(data));

			toast.success("Login successful");
		},
		onError: (error: any) => {
			console.log("error: ", error);
			toast.error(
				error.response?.data?.message ||
					"Something went wrong. Try again."
			);
		},
	});
};

export const useLogout = () => {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: () => logoutService(),
		onSuccess: () => {
			dispatch(logoutAction());

			toast.success("Logout successful");
		},
		onError: (error: any) => {
			if (error.response.status === 401) {
				dispatch(logoutAction());

				toast.success("Logout successful");
			} else {
				toast.error(
					error.message || "Something went wrong. Try again."
				);
			}
		},
	});
};
