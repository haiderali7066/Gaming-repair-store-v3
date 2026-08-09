


import Link from "next/link"
import { MapPin, Mail, Phone, Gamepad2, ArrowRight } from "lucide-react"
import { auth } from "@/auth"
import { UserMenu } from "./UserMenu"
import { CartButton } from "./CartButton"
import { AuthButtons } from "./AuthButtons"
import { MobileNavMenu } from "./MobileNavMenu"

const links = [
  ["Shop", "/shop"],
  ["Services", "/services"],
  ["Repairs", "/repair"],
  ["Buy Back", "/buy-back"],
  ["About", "/about"],
  ["Contact", "/contact"],
]

export async function Navbar() {
  const session = await auth()

  return (
    <div className="w-full">
      {/* ================= TOP ANNOUNCEMENT / INFO BAR ================= */}
      <div className="bg-purple-950 text-purple-100 text-xs sm:text-sm py-2 px-4 border-b border-purple-800/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Abu Dhabi & Dubai, UAE</span>
            </span>
            <span className="hidden md:flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>info@aldanagaming.ae</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>+971 50 123 4567</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/repair/track" className="hover:text-white transition-colors">
              Track Repair
            </Link>
            <span className="text-purple-700">|</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVIGATION HEADER ================= */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight block text-foreground leading-none">
                AL DANA <span className="text-purple-600">GAMING</span>
              </span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
                Repairs & Gaming Hub UAE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground transition hover:text-purple-600"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Cart Button */}
            <CartButton />

            {/* Auth Actions */}
            {session ? <UserMenu session={session} /> : <AuthButtons />}

            {/* Book a Repair CTA Button */}
            <Link
              href="/repair"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/20 transition-all active:scale-95"
            >
              Book a Repair
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            {/* Mobile Navigation Menu */}
            <div className="lg:hidden">
              <MobileNavMenu links={links} isAuthenticated={!!session} />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
