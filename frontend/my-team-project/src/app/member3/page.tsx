import Link from 'next/link';

export default function Member3() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Member 1</h1>
      <p className="text-lg text-gray-700 max-w-md text-center mb-6">
        Hi, I'm Member 3! I'm passionate about coding and building awesome web applications.
      </p>
      <Link href="/">
        <div className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Back to Team
        </div>
      </Link>
    </div>
  );
}