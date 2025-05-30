import GoogleLoginButton from "./GoogleLoginButton";

export default function LoginForm() {
  return (
    <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center px-8 py-10">
      <h1 className="text-3xl font-bold text-yellow-500 mb-2">Welcome to Coder-BookStore</h1>
      <p className="text-sm text-gray-300 mb-6">
        Discover a seamless way to sell your books and unlock exclusive benefits. Enjoy a hassle-free experience, save valuable time, and take advantage of our amazing offers.
      </p>

      <h2 className="text-xl font-semibold mb-4 text-yellow-400">Login to Your Account!</h2>

      <input type="email" placeholder="Enter Email" className="w-full p-3 mb-4 rounded bg-yellow-100 text-black" />
      <input type="password" placeholder="Enter Password" className="w-full p-3 mb-2 rounded bg-yellow-100 text-black" />

      <div className="text-right text-sm mb-6 text-yellow-300 cursor-pointer hover:underline">Forgot Password?</div>

      <div className="flex justify-between text-sm mb-6">
        <span>Don’t you have an account?</span>
        <span className="text-yellow-400 cursor-pointer hover:underline">Create an account</span>
      </div>

      <GoogleLoginButton />

      <button className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded mt-4">
        LOGIN
      </button>
    </div>
  );
}
