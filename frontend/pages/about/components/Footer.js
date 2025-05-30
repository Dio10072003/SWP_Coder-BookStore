export default function Footer() {
  return (
    <footer className="bg-black text-white text-center text-sm p-4 mt-10">
      <div className="border-t border-gray-700 pt-4">
        <p>© 2024 Neth BookPoint</p>
        <p>Visit our branches in Galle, Kurunegala, Kandy, and Colombo</p>
        <div className="mt-2 flex justify-center gap-3">
          <a href="#" className="hover:text-yellow-400">Fb</a>
          <a href="#" className="hover:text-yellow-400">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
