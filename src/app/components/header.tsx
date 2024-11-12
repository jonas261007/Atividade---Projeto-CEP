import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-300 bg-white py-4 shadow-sm flex justify-between items-center px-6 md:px-12">
      <nav className="hidden md:block">
        <ul className="flex justify-center gap-8">
          <li>
            <Link
              href="/"
              className="text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
            >
              Página Home
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
            >
              Página Register
            </Link>
          </li>
          <li>
            <Link
              href="/sign-in"
              className="text-gray-700 font-semibold hover:text-blue-600 transition duration-200"
            >
              Página SignIn
            </Link>
          </li>
        </ul>
      </nav>

      <div className="bg-blue-600 text-white p-2 rounded-md md:hidden cursor-pointer hover:bg-blue-700 transition duration-200">
        Menu
      </div>
    </header>
  );
}
