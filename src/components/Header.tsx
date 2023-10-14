import Link from "next/link";

export default function Header() {
  return (
    <div className="flex bg-purple-600 px-2 py-2 text-white">
      <nav className="text-sm font-bold hover:underline cursor-pointer md:text-lg lg:text-xl">
        <Link href="/">Next URL Shortener</Link>
      </nav>
    </div>
  );
}
