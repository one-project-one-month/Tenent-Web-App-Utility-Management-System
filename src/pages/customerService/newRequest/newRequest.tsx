import { Button } from "@/components/ui/button"
import {
  Form, FormField, FormItem,
  FormControl, FormMessage
} from "@/components/ui/form"
import { serviceFormSchema, type serviceFormValue } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const NewRequest = () => {

  //React hook form 
  const form = useForm<serviceFormValue>({
    resolver: zodResolver(serviceFormSchema)
  })

  const onSubmit = (data: serviceFormValue) => {
    console.log(data)
  }

  return (
    <div className="flex gap-4   ">
      <div className="flex flex-col gap-2">
        <h1 className="text-h4 font-semibold ">
          Report a New Issue
        </h1>
        <p className="text-body-1">
          Please fill out the form below to submit a service request.
        </p>
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-2xl ">

          <div className="grid grid-cols-2 gap-4">

            {/* Name filed */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Name</FormLabel> */}
                  <FormControl><Input placeholder="Name" className="py-5 px-6  border-2 border-[#E0E0E0] bg-white focus:outline-none focus:ring-0 focus-visible:ring-0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />

            {/* email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Name</FormLabel> */}
                  <FormControl><Input placeholder="Email" className="py-5 px-6 border-2 border-[#E0E0E0] bg-white focus:outline-none focus:ring-0 focus-visible:ring-0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            {/* phon number field */}

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Name</FormLabel> */}
                  <FormControl><Input placeholder="Phone No" className="py-5 px-6  border-2 border-[#E0E0E0] bg-white focus:outline-none focus:ring-0 focus-visible:ring-0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomNo"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Name</FormLabel> */}
                  <FormControl><Input placeholder="Room No" className="py-5 px-6 border-2 border-[#E0E0E0] bg-white focus:outline-none focus:ring-0 focus-visible:ring-0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* category select box */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <SelectTrigger
                      className={`py-5 px-6 border-2 border-[#E0E0E0] bg-white w-full  ${form.formState.errors.category
                        ? "border-red-500 focus:ring-red-500"
                        : ""}`}>
                      <SelectValue placeholder="Select service" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cleaning">Electric</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="roomService">Security and Safety</SelectItem>
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
                <FormControl><Textarea placeholder="Describe your request..." className="py-2 px-4 text-xl border-2 border-[#E0E0E0] bg-white focus:outline-none focus:ring-0 focus-visible:ring-0" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full bg-[#3E70FF] text-white" size={'lg'}>Submit</Button>
        </form>
      </Form>
    </div >


  )
}

export default NewRequest



