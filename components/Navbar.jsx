"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, Menu, PackagePlus, Boxes, X } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/items", label: "Items" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Avatar({ user, size = "h-9 w-9" }) {
  const initial = (user.displayName || user.email || "?").trim().charAt(0).toUpperCase();
  if (user.photoURL) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.photoURL}
        alt=""
        referrerPolicy="no-referrer"
        className={cn("rounded-full object-cover", size)}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn("flex items-center justify-center rounded-full bg-cobalt text-sm font-bold text-white", size)}
    >
      {initial}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close menus whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!dropdownOpen) return undefined;
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You have been logged out.");
      setDropdownOpen(false);
      setMenuOpen(false);
      router.push("/");
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  };

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Account";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                isActive(link.href) ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-200/70 hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-2 md:flex">
          {loading ? (
            <span className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" aria-hidden="true" />
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
                className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3 transition-colors hover:border-slate-300"
              >
                <Avatar user={user} size="h-8 w-8" />
                <span className="max-w-[9rem] truncate text-sm font-semibold">{displayName}</span>
                <ChevronDown
                  className={cn("h-4 w-4 text-muted transition-transform", dropdownOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>

              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-line bg-white shadow-xl shadow-slate-900/10"
                >
                  <div className="border-b border-line px-4 py-3">
                    <p className="truncate text-sm font-semibold">{displayName}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      role="menuitem"
                      href="/items/add"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100"
                    >
                      <PackagePlus className="h-4 w-4 text-muted" aria-hidden="true" />
                      Add product
                    </Link>
                    <Link
                      role="menuitem"
                      href="/items/manage"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100"
                    >
                      <Boxes className="h-4 w-4 text-muted" aria-hidden="true" />
                      Manage products
                    </Link>
                  </div>
                  <div className="border-t border-line p-1.5">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline">
                Log in
              </Link>
              <Link href="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-paper md:hidden">
          <div className="page-container space-y-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-base font-semibold",
                  isActive(link.href) ? "bg-ink text-white" : "text-slate-700 hover:bg-slate-200/70"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-3 border-t border-line pt-4">
              {loading ? null : user ? (
                <div className="space-y-1">
                  <div className="mb-2 flex items-center gap-3 px-3">
                    <Avatar user={user} size="h-10 w-10" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{displayName}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/items/add" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-medium hover:bg-slate-200/70">
                    <PackagePlus className="h-5 w-5 text-muted" aria-hidden="true" />
                    Add product
                  </Link>
                  <Link href="/items/manage" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-medium hover:bg-slate-200/70">
                    <Boxes className="h-5 w-5 text-muted" aria-hidden="true" />
                    Manage products
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" aria-hidden="true" />
                    Log out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" className="btn btn-outline">
                    Log in
                  </Link>
                  <Link href="/register" className="btn btn-primary">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
