export default function StatsSection() {
  return (
    <section className="bg-black text-white text-center py-16 px-6">
      <h2 className="text-2xl font-bold mb-6">
        Your favourite <span className="text-yellow-500">Reads</span> Are Here!
      </h2>
      <p className="max-w-xl mx-auto mb-6 text-gray-300">
        Buy discounted books online with us! Enjoy curated collections, bestsellers, and timeless classics.
      </p>
      <div className="flex justify-center gap-8 text-lg font-semibold">
        <div><span className="text-yellow-500">800+</span><br />Books</div>
        <div><span className="text-yellow-500">1.1K</span><br />Registered Members</div>
        <div><span className="text-yellow-500">50+</span><br />Team Members</div>
      </div>
      <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded">
        Explore More
      </button>
    </section>
  )
}
