import Image from "next/image";

export default function LoginIllustration() {
  return (
    <div className="w-1/2 hidden md:block relative">
      <Image
        src="/images/shopping-boy.png"
        alt="Shopping Illustration"
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
}
