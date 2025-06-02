// AboutPage/Components/TeamSection.jsx
export default function TeamSection() {
  const teamMembers = [
    { name: "Binh An", role: "CEO - Frontend" },
    { name: "Nhat Bao", role: "Backend" },
    { name: "Ngoc Thien", role: "Backend" },
    { name: "Hoang Do", role: "Frontend" },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-medium text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}