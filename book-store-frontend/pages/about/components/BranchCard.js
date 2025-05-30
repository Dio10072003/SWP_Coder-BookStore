export default function BranchCard({ city, contact }) {
  return (
    <div className="text-center px-4 py-2">
      <h3 className="font-bold text-yellow-400 text-lg">{city}</h3>
      <p>Main Street, City Center</p>
      <p>Contact: {contact}</p>
      <p>Operating Hours:</p>
      <p>Mon–Sat: 9 AM – 7 PM</p>
      <p>Sunday: 10 AM – 5 PM</p>
      <p className="text-sm text-gray-400 mt-2">
        In-store shopping, Student discounts,<br />Workshops, Study spaces
      </p>
    </div>
  );
}
