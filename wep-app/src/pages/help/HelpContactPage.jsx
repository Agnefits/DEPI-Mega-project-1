
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const HelpContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent", {
        description: "We'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthenticated={true} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">
              Have a question?
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-8">
              We're here to help, Feel free to reach out anytime!
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Write your name..."
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Write your second name..."
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Write your email..."
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Questions/ Feedbacks
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                      />
                    </div>

                    <div>
                      <Button 
                        type="submit" 
                        className="bg-jobblue hover:bg-jobblue-dark w-full py-3 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>

              <div>
                <div className="mb-8">
                  <img
                    src="/lovable-uploads/b81f026d-a98f-4925-ace1-f4c871f4cfdb.png"
                    alt="Customer Support"
                    className="w-full h-auto"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">support@jobgenius.com</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (800) 555-1234</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-1">Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpContactPage;
