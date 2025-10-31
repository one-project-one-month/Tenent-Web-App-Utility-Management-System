import { Contact } from "lucide-react";
import { Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="w-full  md:max-w-sm flex flex-col gap-3 border border-gray-300 rounded-sm shadow-sm p-3 bg-card text-text-primary">
      <div className="flex gap-3 my-2">
        <Contact />
        <p>Contact Us</p>
      </div>
      <div className="flex gap-2 border-2 border-yellow-500 rounded-sm p-3">
        <Phone />
        <div>
          <p>Emergency Line for Apartment Staff</p>
          <p>09 123 456 789</p>
          <p>24/7 Available</p>
        </div>
      </div>

      <div className="flex gap-2 border-2 border-green-500 rounded-sm p-3">
        <Phone />
        <div>
          <p>Support Line for Apartment Owner</p>
          <p>09 123 456 789</p>
          <p>Mon-Sun 9AM-6PM</p>
        </div>
      </div>

      <div className="flex gap-2 border-2 border-blue-500 rounded-sm p-3">
        <Contact />
        <div>
          <p>Email Support for Apartment Owner</p>
          <p>Estherhoward@gmail.com</p>
          <p>Response within 24h</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
