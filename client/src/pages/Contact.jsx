import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Message sent successfully! 🚀");

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-10">
      
      {/* Toast Container */}
      {/* <Toaster position="top-right" /> */}

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-600 mt-2">
          We'd love to hear from you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6">
          
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
            <p className="text-gray-600 mb-2">📍 Bangalore, India</p>
            <p className="text-gray-600 mb-2">📞 +91 9876543210</p>
            <p className="text-gray-600">📧 support@greencart.com</p>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Bangalore&output=embed"
              className="w-full h-64 border-0"
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;