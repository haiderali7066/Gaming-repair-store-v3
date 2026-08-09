import Link from "next/link"
import { auth } from "@/auth"
import { UserMenu } from "./UserMenu"
import { CartButton } from "./CartButton"
import { AuthButtons } from "./AuthButtons"
import { MobileNavMenu } from "./MobileNavMenu"

const links = [
  ["Shop", "/shop"],
  ["Repairs", "/repair"],
  ["Buy Back", "/buy-back"],
  ["About", "/about"],
  ["Contact", "/contact"],
]

export async function Navbar() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
            AD
          </span>
          <span>
            AL DANA <span className="text-primary">GAMING</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-muted-foreground transition hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <CartButton />

          {/* Auth Actions */}
          {session ? <UserMenu session={session} /> : <AuthButtons />}

          {/* Mobile Menu */}
          <MobileNavMenu links={links} isAuthenticated={!!session} />
        </div>
      </div>
    </header>
  )
}
