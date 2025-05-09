
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Bold, Italic, List, ListOrdered, Link } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Phone number must be at least 6 characters.",
  }),
  currentJob: z.string().optional(),
  linkedinUrl: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal("")),
  portfolioUrl: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal("")),
  additionalInfo: z.string().max(500).optional(),
});

interface JobApplicationFormProps {
  jobTitle: string;
  companyName: string;
  location: string;
  type: string;
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
}

const JobApplicationForm = ({ jobTitle, companyName, location, type, onSubmit }: JobApplicationFormProps) => {
  const [charCount, setCharCount] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      currentJob: "",
      linkedinUrl: "",
      portfolioUrl: "",
      additionalInfo: "",
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    if (onSubmit) {
      onSubmit(data);
    }
    console.log(data);
  }

  return (
    <DialogContent className="sm:max-w-[500px]">
      <div className="flex items-center space-x-4 pb-4">
        <div className="h-12 w-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
          N
        </div>
        <div>
          <h2 className="text-lg font-semibold">{jobTitle}</h2>
          <p className="text-sm text-gray-500">
            {companyName} • {location} • {type}
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-semibold">Submit your application</h3>
        <p className="text-sm text-gray-500">The following is required and will only be shared with Nomad</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Personal Info</h4>
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name (required)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your fullname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address (required)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number (required)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentJob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current of previous job title (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="What's your current or previous job title?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h4 className="font-medium pt-2">Links</h4>
            
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL (required)</FormLabel>
                  <FormControl>
                    <Input placeholder="Link to your LinkedIn URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolioUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio URL (required)</FormLabel>
                  <FormControl>
                    <Input placeholder="Link to your portfolio URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional information (optional)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex space-x-1 bg-white border-b p-1">
                        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <List className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ListOrdered className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Link className="h-4 w-4" />
                        </Button>
                      </div>
                      <Textarea 
                        placeholder="Add a cover letter or anything else you want to share" 
                        className="min-h-[120px] resize-none"
                        {...field} 
                        onChange={(e) => {
                          setCharCount(e.target.value.length);
                          field.onChange(e);
                        }}
                      />
                      <div className="text-xs text-gray-500 text-right">
                        Maximum 500 characters
                        <span className="ml-1">{charCount} / 500</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Attach your resume (required)</FormLabel>
              <div className="flex items-center mt-1">
                <Button type="button" variant="outline" size="sm" className="relative overflow-hidden">
                  <span className="ml-2">Attach Resume/CV</span>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                  />
                </Button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Submit Application</Button>
          
          <p className="text-xs text-gray-500 text-center">
            By sending the request you can confirm that you accept our <span className="text-jobblue">Terms of Service</span> and <span className="text-jobblue">Privacy Policy</span>.
          </p>
        </form>
      </Form>
    </DialogContent>
  );
};

export default JobApplicationForm;
