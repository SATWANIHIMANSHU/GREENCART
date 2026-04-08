const Privacy = () => {
  return (
    <div className="px-6 md:px-16 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-gray-600">
        Your privacy is important to us. This policy explains how we collect and use your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="text-gray-600">
        We collect basic details like name, email, and contact information during registration or orders.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Data</h2>
      <p className="text-gray-600">
        Your data is used to process orders, improve services, and communicate updates.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
      <p className="text-gray-600">
        We use secure systems to protect your personal data from unauthorized access.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third Parties</h2>
      <p className="text-gray-600">
        We do not sell your data. Limited information may be shared with payment providers.
      </p>
    </div>
  );
};

export default Privacy;