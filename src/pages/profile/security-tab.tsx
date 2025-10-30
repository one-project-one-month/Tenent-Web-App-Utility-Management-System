import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePasswordService } from "@/service/profile-service"
import { LockKeyhole, RotateCcwKey } from "lucide-react"
import { useEffect } from "react"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useSelector } from "react-redux"
import { toast } from "sonner"
import type { RootState } from "@/store/store"
import type { UpdatePasswordPayload } from "@/types/tenant"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  current: z.string().min(1, { message: "Current Password is required." }),
  new: z.string().min(8, "Password must be at least 8 characters long").max(32, "Password must be at most 32 characters long"),
  confirm: z.string().min(8, "Password must be at least 8 characters long").max(32, "Password must be at most 32 characters long")
}).refine((data) => data.new === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"]
})

const SecurityTab = () => {
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current: "",
      new: "",
      confirm: "",
    }
  })

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    if (!userId) {
      toast.error("Something went wrong. Try again.");
      return
    }

    const payload: UpdatePasswordPayload = {
      userId,
      currentPassword: value.current,
      newPassword: value.new
    }
    const res = await updatePasswordService(payload);

    console.log("Update res: ", res);
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
            name="current"
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
            name="new"
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
          >
            <RotateCcwKey className="scale-[1.5] mr-2" /> Update Password
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SecurityTab