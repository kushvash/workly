// export default function Home() {
//     return (
//       <div>
//         <h1>Welcome to Workly</h1>
//         <a href="/login">Login</a>
//       </div>
//     );
//   }


// client/pages/index.js

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="w-full py-5 bg-white shadow-md">
        <nav className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold text-blue-600">Workly</h1>
          <div className="space-x-6">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
            <Link href="/signup" className="text-gray-700 hover:text-blue-600 font-medium">
              Signup
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-grow w-full max-w-7xl mx-auto px-6 py-16">
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-snug">
            Boost Your Productivity with <span className="text-blue-600">Workly</span>
          </h2>
          <p className="text-lg text-gray-600">
            Track tasks, stay focused with the Pomodoro timer, connect with your team in real-time, and stay productive—wherever you work.
          </p>
          <div className="space-x-4">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
          <img
            src="https://source.unsplash.com/600x400/?teamwork,productivity"
            alt="Productivity Illustration"
            className="rounded-lg shadow-lg max-w-full h-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/600x400?text=Workly+Image";
            }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-200 text-center">
        © {new Date().getFullYear()} Workly. All rights reserved.
      </footer>
    </div>
  );
}