
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
import { Bold, Italic, List, ListOrdered, Link, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  companyWebsite: z.string().url({
    message: "Please enter a valid URL.",
  }),
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  jobDescription: z.string().min(20, {
    message: "Job description must be at least 20 characters.",
  }).max(500),
  additionalInfo: z.string().max(500).optional(),
});

interface JobPostFormProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
}

const JobPostForm = ({ onSubmit }: JobPostFormProps) => {
  const [charCount, setCharCount] = useState(0);
  const [skills, setSkills] = useState(['Design', 'Marketing', 'Creative']);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      companyWebsite: "",
      jobTitle: "",
      jobDescription: "",
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
      <div className="pb-4">
        <h2 className="text-lg font-semibold">Announce Your Job</h2>
        <p className="text-sm text-gray-500">The following is required and will only be shared with Admin</p>
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

            <h4 className="font-medium pt-2">Company Info</h4>
            
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name (required)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website (required)</FormLabel>
                  <FormControl>
                    <Input placeholder="Link to your company URL or Social Links" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title (required)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description (required)</FormLabel>
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
                        placeholder="Enter job description" 
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
              <FormLabel>Skills (required)</FormLabel>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1 px-2">
                    {skill}
                    <X className="h-3 w-3 cursor-pointer" 
                       onClick={() => setSkills(skills.filter((_, i) => i !== index))} />
                  </Badge>
                ))}
                <div className="relative">
                  <input className="w-28 p-0 h-7 border-0 focus:outline-none" placeholder="+ Add more" />
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional information (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter additional info" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Attach your company papers</FormLabel>
              <div className="flex items-center mt-1">
                <Button type="button" variant="outline" size="sm" className="relative overflow-hidden">
                  <span className="ml-2">Attach papers</span>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                  />
                </Button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Submit Request</Button>
          
          <p className="text-xs text-gray-500 text-center">
            By sending the request you can confirm that you accept our <span className="text-jobblue">Terms of Service</span> and <span className="text-jobblue">Privacy Policy</span>.
          </p>
        </form>
      </Form>
    </DialogContent>
  );
};

export default JobPostForm;
