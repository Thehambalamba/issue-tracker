import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

function NavBar() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
