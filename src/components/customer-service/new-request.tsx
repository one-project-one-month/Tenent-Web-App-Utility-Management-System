import { Button } from "@/components/ui/button";
import FrequentlyAskedQuestions from "./frequently-asked-questions";
// import { useMutation } from "@tanstack/react-query"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { serviceFormSchema, type serviceFormValue } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { sumbitServiceForm } from "@/service/customer-service"
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";



const NewRequest = () => {
  //React hook form
  const form = useForm<serviceFormValue>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      description: "",
      category: "Complain",
      priority_level: "Low",

    },
  });
  // const mutation = useMutation({
  //   mutationFn: sumbitServiceForm,
  //   onSuccess: () => {
  //     toast.success("Request submitted successfully.");
  //   },
  //   onError: () => {
  //     toast.error("Something went wrong. Try again.")
  //   }
  // })

  const isLoading = form.formState.isLoading; //Track loading

  //submit form to server
  const onSubmit = (data: serviceFormValue) => {
    console.log(data);
    form.reset();
    toast.success("Request submitted successfully");
    // mutation.mutate(data);
  };

  return (
    <div className="text-text-primary">
      <div className="border-1 border-gray-300 rounded-sm shadow-sm p-4 bg-card">
        <h3 className="text-2xl font-semibold mb-3">Submit New Request</h3>
        <p className="mb-3">
          Fill out the form below and we'll get back to you as soon as possible
        </p>

        <div className="flex flex-col md:flex-row bg-card items-center md:items-start w-full gap-6 md:gap-8 lg:gap-10 ">
          {/* Service form */}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 min-w-xs w-full max-w-2xl"
            >
              {/* category select box */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value} >
                        <SelectTrigger
                          className={`py-5 px-6 border-2 border-border bg-input w-full  
                        ${form.formState.errors.category
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                            }`}
                        >
                          <SelectValue placeholder="Service Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-input ">
                          <SelectItem value="Complain">
                            Complain
                          </SelectItem>
                          <SelectItem value="Maintenance">
                            Maintenance
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priprity select box */}
              <FormField
                control={form.control}
                name="priority_level"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger
                          className={`py-5 px-6 border-2 border-border bg-input w-full  
                        ${form.formState.errors.priority_level
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                            }`}
                        >
                          <SelectValue placeholder="Priority Level" />
                        </SelectTrigger>
                        <SelectContent className="bg-input ">
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
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
                type="submit"
                size={"lg"}
                className={`cursor-pointer text-accent 
              ${isLoading
                    ? "cursor-not-allowed bg-muted text-muted-foreground"
                    : ""
                  }`}
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="animate-spin" />
                    Submitting
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="border-1 border-gray-300 rounded-sm p-3 bg-card mt-10 shadow-sm">
        <h3 className="text-2xl font-semibold mb-5">
          Frequently Asked Questions
        </h3>{" "}
        <FrequentlyAskedQuestions />
      </div>
    </div>
  );
};

export default NewRequest;
