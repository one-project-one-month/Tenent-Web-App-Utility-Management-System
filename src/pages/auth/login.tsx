import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginSchema } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "@/hooks/auth/useLogin";
import { useNavigate } from "react-router";

const Login = () => {
  const { mutate: login } = useLogin();
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {

    try {
      login(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="max-w-3xl mx-auto mt-40">
      <div>
        <div className="flex items-center justify-start gap-2">
          <img src="logo-final.svg" alt="logo" className="h-12 w-12" />
          <h2 className="text-xl">NestFlow</h2>
        </div>
        <div className="text-center text-3xl font-bold mt-5">
          <h2>"Simplify Your Utility Management"</h2>
        </div>
        <div className="flex items-center justify-center gap-4 -mt-10">
          <div>
            <img src="login-illu.svg" alt="login" className="w-120 h-120" />
          </div>
          <div className="w-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold">Login Your Account</h2>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter Your Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter Yout Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-blue-500">
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
