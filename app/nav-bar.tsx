"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@radix-ui/themes";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";

function NavBar() {
  const path = usePathname();
  const { status, data: session } = useSession();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={classNames({
                "text-zinc-900": href === path,
                "text-zinc-500": href !== path,
                "hover:text-zinc-800": true,
                "transition-colors": true,
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" ? (
          <Link href="/api/auth/signout">Log out</Link>
        ) : null}
        {status === "unauthenticated" ? (
          <Link href="/api/auth/signin">Login</Link>
        ) : null}
      </Box>
    </nav>
  );
}

export default NavBar;
