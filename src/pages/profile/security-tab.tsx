import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockKeyhole, RotateCcwKey } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useSelector } from "react-redux"
import { toast } from "sonner"
import type { RootState } from "@/store/store"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useUpdatePasswordQuery } from "@/hooks/use-profile"

const formSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current Password is required." }),
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirm: z.string().min(1, { message: "Confirm Password is required." }),
}).refine((data) => data.newPassword === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"]
})

const SecurityTab = () => {
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const tenantId = useSelector((state: RootState) => state.auth.user?.tenantId!);
  const { mutate: updatePassword, isPending } = useUpdatePasswordQuery(tenantId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirm: "",
    }
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    if (!tenantId) {
      toast.error("Something went wrong. Try again.");
      return
    }

    updatePassword({ tenantId, currentPassword: value.currentPassword, newPassword: value.newPassword });
    form.reset();
  }

  return (
    <>
      <div className="mb-6">
        <h4 className="text-sub-heading flex gap-2 text-[#333333] mb-2"><LockKeyhole /> Change Password</h4>
        <p className="text-mu ted-foreground text-body-1">Update you password to keep your account secure</p>
      </div>

      <Form {...form}>
        <form className="my-4 pb-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-[20px] text-gray-700 mb-1">Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field}  className="shadow border-foreground/40 py-6 text-slate-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-[20px] text-gray-700 mb-1">New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field}  className="shadow border-foreground/40 py-6 text-slate-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-[20px] text-gray-700 mb-1">Confirm New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field}  className="shadow border-foreground/40 py-6 text-slate-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full text-white p-6 font-light"
            type="submit"
            disabled={isPending}
          >
            <RotateCcwKey className="scale-[1.5] mr-2" /> Update Password
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SecurityTab