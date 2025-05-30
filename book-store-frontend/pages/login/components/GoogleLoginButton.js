import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  return (
    <button className="w-full border border-gray-300 rounded py-2 px-4 flex items-center justify-center gap-2 bg-white text-black mb-2">
      <FcGoogle size={24} />
      <span>Login with Google</span>
    </button>
  );
}
