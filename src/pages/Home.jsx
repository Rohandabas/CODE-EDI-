// import React from "react";

// export default function Home() {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#111827] to-[#1f2937] text-white mt-0">
//         <h1 className="text-5xl font-bold">Code-Edi</h1>
//         <p className="mt-4 text-lg max-w-2xl">
//           Code-Edi is a Code Editor for those who want to learn web development with many other features.
//         </p>
        
//         <div className="mt-6 flex gap-4">
//           <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg flex items-center gap-2">
//             🚀 Let's Code
//           </button>
//           <button className="bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded-lg text-lg flex items-center gap-2">
//             🛠 Tools
//           </button>
//         </div>
//       </div>
//     );
//   }
  





// import React from "react";

// export default function Home() {
//   return (
//     <div className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#0a0f1a] to-[#1f2937] text-white">
      
//       {/* Animated Background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-purple-800 to-black opacity-60 blur-2xl"></div>

//       <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg">
//         🚀 Code-Edi
//       </h1>
      
//       <p className="mt-4 text-lg max-w-2xl text-gray-300">
//         A futuristic code editor for developers. Learn, build, and collaborate with an intuitive interface and powerful features.
//       </p>

//       <div className="mt-6 flex gap-6">
//         <button className="relative px-8 py-3 rounded-lg text-lg bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/50 transform hover:scale-110">
//           🚀 Let's Code
//         </button>
//         <button className="relative px-8 py-3 rounded-lg text-lg bg-gray-700 hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-gray-500/50 transform hover:scale-110">
//           🛠 Tools
//         </button>
//       </div>

//       {/* Animated Floating Glow */}
//       <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
//     </div>
//   );
// }







import React from "react";
import { SignedIn, SignedOut, UserButton, SignInButton, useUser } from "@clerk/clerk-react";

export default function Home() {
  const { user } = useUser(); // Fetch the user details

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#0a0f1a] to-[#1f2937] text-white">
      
      {/* Fixed Navbar */}
      <nav className="fixed top-0 inset-x-0 w-full bg-black/30 backdrop-blur-md px-8 py-4 flex justify-between items-center text-white z-50 border-b border-white/20 shadow-lg">
        
        <h1 className="text-2xl font-bold tracking-widest bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
          Code-Edi
        </h1>

        {/* Authentication Section */}
        <div>
          <SignedIn>
            <div className="flex items-center gap-3">
              <span className="text-gray-300">Hi, {user?.firstName}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:scale-105 transform transition-all duration-300 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-12m9-3l3 3-3 3"/>
                </svg>
                Login
              </button>
            </SignInButton>
          </SignedOut>
        </div>

      </nav>

      {/* Page Content */}
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
  <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 drop-shadow-lg">
  Code-Edi🚀 
  </h1>

  <p className="mt-4 text-lg max-w-2xl text-gray-300">
    A futuristic code editor for developers. Learn, build, and collaborate with an intuitive interface and powerful features.
  </p>

  <div className="mt-6 flex gap-6">
    <button className="relative px-10 py-3 rounded-lg text-lg bg-green-600 hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-green-100/10 transform hover:scale-110">
      🚀 Let's Code
    </button>
    <button className="relative px-13 py-3 rounded-lg text-lg bg-gray-700 hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-gray-100/10 transform hover:scale-110">
      🛠 Tools
    </button>
  </div>
</div>


      {/* Animated Floating Glow */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
}
