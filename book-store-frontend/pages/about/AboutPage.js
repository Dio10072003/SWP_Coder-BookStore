import Header from "../components/Header";
import BranchCard from "../components/BranchCard";
import Footer from "../components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      <Header />

      {/* Banner */}
      <div className="relative h-[300px]">
        <Image
          src="/images/bookstore-banner.jpg"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
        />
      </div>

      {/* About Us */}
      <section className="px-8 py-10">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">About Us</h2>
        <p className="text-gray-300 leading-relaxed">
          Welcome to Neth BookPoint, your trusted source for a diverse range of books catering to every reader’s taste...
        </p>
      </section>

      {/* Branches */}
      <section className="px-8 py-10 bg-gray-900">
        <h2 className="text-xl text-yellow-500 font-bold mb-6">Our Branches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <BranchCard city="Kurunegala" contact="123-456-7890" />
          <BranchCard city="Kandy" contact="123-456-7890" />
          <BranchCard city="Colombo" contact="123-456-7890" />
        </div>
      </section>

      {/* Commitment */}
      <section className="px-8 py-10">
        <h2 className="text-xl font-bold text-yellow-500 mb-4">Our Commitment</h2>
        <p className="text-gray-300 leading-relaxed">
          At Neth BookPoint, we are committed to providing a welcoming and inspiring environment for all book enthusiasts...
        </p>
      </section>

      <Footer />
    </div>
  );
}
