// AboutPage/Components/ContactSection.jsx
export default function ContactSection() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-4">
          Have questions? Reach out to us!
        </p>
        <p className="text-gray-600">
          Email: <a href="mailto:info@example.com" className="text-blue-600">info@example.com</a>
        </p>
        <p className="text-gray-600">
          Phone: <a href="tel:+1234567890" className="text-blue-600">+1 (234) 567-890</a>
        </p>
      </div>
    </section>
  );
}