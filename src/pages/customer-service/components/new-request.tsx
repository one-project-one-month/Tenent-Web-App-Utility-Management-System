import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FrequentlyAskedQuestions from "./frequently-asked-questions";
import { useSubmitForm } from "@/hooks/use-service";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { serviceFormSchema, type serviceFormValue } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import SelectBox from "./select-box";
import { categoryValue, priorityLevelValue } from "../utils";

const NewRequest = ({ tenantId, roomId }: { tenantId: string, roomId: string }) => {
  const form = useForm<serviceFormValue>({
    resolver: zodResolver(serviceFormSchema),
  });
  //custom hook submit form
  const mutation = useSubmitForm()

  //submit form to server
  const onSubmit = (data: serviceFormValue) => {
    if (!tenantId) return;
    form.reset({
      description: "",
      category: undefined,
      priorityLevel: undefined,
    });
    mutation.mutate({ data, tenantId, roomId })
  };

  //track loading indicator
  const isLoading = mutation.isPending


  return (
    <div className="text-text-primary">
      <div className="border border-gray-300 rounded-sm shadow-sm p-4 bg-card">
        <h3 className="text-2xl font-semibold mb-3">Submit New Request</h3>
        <p className="mb-3">
          Fill out the form below and we'll get back to you as soon as possible
        </p>

        <div className="flex flex-col md:flex-row bg-card items-center md:items-start w-full gap-6 md:gap-8 lg:gap-10 ">
          {/* Service form */}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 w-full max-w-2xl"
            >
              {/* category select box */}
              <FormField
                control={form.control}
                name="category"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Service type"
                        items={categoryValue}
                        className={`py-5 px-6 border-2 border-border bg-input w-full  
                        ${fieldState.error ? "border-red-500 focus:ring-red-500" : ""
                          }`}
                      />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priprity select box */}
              <FormField
                control={form.control}
                name="priorityLevel"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <SelectBox
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Service type"
                        items={priorityLevelValue}
                        className={`py-5 px-6 border-2 border-border bg-input w-full  
                        ${fieldState.error ? "border-red-500 focus:ring-red-500" : ""
                          }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* decription textarea */}
              <FormField
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your request..."
                        className={`py-2 px-4 min-h-40 border-2 border-border bg-input focus:outline-none focus:ring-0 focus-visible:ring-0
                          ${fieldState.error ? "border-red-500 focus:ring-red-500" : ""
                          }`}
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
      <div className="border border-gray-300 rounded-sm p-3 bg-card mt-10 shadow-sm">
        <h3 className="text-2xl font-semibold mb-5">
          Frequently Asked Questions
        </h3>
        <FrequentlyAskedQuestions />
      </div>
    </div>
  );
};

export default NewRequest;
