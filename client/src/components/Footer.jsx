import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Footer = () => {

  const { setShowUserLogin, user, navigate } = useAppContext();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", url: "/" },
        { text: "Shop", url: "/products" },
        { text: "Cart", url: "/cart" },
        { text: "Contact", url: "/contact" }
      ]
    },
    {
      title: "Customer",
      links: [
        { text: "My Orders", action: "orders" },
        { text: "Login", action: "login" }
      ]
    },
    {
      title: "Support",
      links: [
        { text: "Help Center", url: "/contact" },
        { text: "Terms & Conditions", url: "/terms" },
        { text: "Privacy Policy", url: "/privacy" }
      ]
    }
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">

      <div className="flex flex-col md:flex-row justify-between gap-10 py-10 border-b border-gray-300 text-gray-600">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-green-600">GreenCart</h1>
          <p className="max-w-[400px] mt-4">
            We deliver fresh groceries and snacks straight to your door.
            Trusted by thousands, we aim to make your shopping experience simple and affordable.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-6">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-3">
                {section.title}
              </h3>

              <ul className="space-y-2 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>

                    {/* Login (Modal) */}
                    {link.action === "login" && (
                      <span
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer hover:text-green-600"
                      >
                        {link.text}
                      </span>
                    )}

                    {/* My Orders */}
                    {link.action === "orders" && (
                      <span
                        onClick={() => navigate("/my-orders")}
                        className="cursor-pointer hover:text-green-600"
                      >
                        {link.text}
                      </span>
                    )}

                    {/* Normal Links */}
                    {!link.action && (
                      <Link
                        to={link.url}
                        className="hover:text-green-600 transition"
                      >
                        {link.text}
                      </Link>
                    )}

                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      <div className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GreenCart — All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;