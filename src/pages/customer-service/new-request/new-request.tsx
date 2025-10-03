import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import {
  Form, FormField, FormItem,
  FormControl, FormMessage
} from "@/components/ui/form"
import { serviceFormSchema, type serviceFormValue } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { sumbitServiceForm } from "@/service/customer-service"
import { toast } from "sonner"
import { Loader2Icon } from "lucide-react"


const NewRequest = () => {
  //React hook form 
  const form = useForm<serviceFormValue>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      "description": "",
      "category": "Other",
      "room_id": "",
      "status": "Pending",
      "priority_level": "Low"
    }
  })




  const mutation = useMutation({
    mutationFn: sumbitServiceForm,
    onSuccess: () => {
      toast.success("Request submitted successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Try again.")
    }
  })

  const isLoading = mutation.isPending; //Track loading

  //submit form to server
  const onSubmit = (data: serviceFormValue) => {
    form.reset()
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col md:flex-row  items-center md:items-start w-full gap-6 md:gap-8 lg:gap-10 my-15   ">
      <div className="flex flex-col gap-2 items-center md:items-start min-w-sm">
        <h1 className="text-h4  ">
          Report a New Issue
        </h1>
        <p className="text-body-1 text-gray-700">
          Please fill out the form below to submit a service request.
        </p>
      </div>


      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 min-w-sm w-full max-w-2xl"
        >

          {/* category select box */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange}  >
                    <SelectTrigger
                      className={`py-5 px-6 border-2 border-border bg-input w-full  
                        ${form.formState.errors.category
                          ? "border-red-500 focus:ring-red-500"
                          : ""
                        }`
                      }>
                      <SelectValue placeholder="Select service type" defaultValue={"Complain"} /></SelectTrigger>
                    <SelectContent className="bg-input ">
                      <SelectItem
                        value="Complain">
                        Complain
                      </SelectItem>
                      <SelectItem
                        value="Maintenance">
                        Maintenance
                      </SelectItem>
                      <SelectItem
                        value="Other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* decription textarea */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe your request..."
                    className="py-2 px-4 min-h-40 border-2 border-border bg-input focus:outline-none focus:ring-0 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            className={`w-full bg-primary text-white cursor-pointer ring-0 
          ${isLoading ? "bg-input text-accent-foreground cursor-not-allowed " : ''}
          `} size={'lg'}
          >
            {
              isLoading ?
                <><Loader2Icon className="animate-spin" /> Submitting... </>
                : "Submit"
            }
          </Button>
        </form>
      </Form>
    </div >


  )
}

export default NewRequest



