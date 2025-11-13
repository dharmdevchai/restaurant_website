"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import restaurantConfig from "@/config/restaurant";
import ReservationModal from "./ReservationModal";
import { useNavbarScroll } from "@/hooks/useScrollAnimation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  
  useNavbarScroll();

  const isActive = (path) => pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <h1>{restaurantConfig.name}</h1>
          </div>
          <ul id="navMenu" className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <li><Link href="/" className={isActive("/") ? "active" : ""}>Home</Link></li>
            <li><Link href="/menu" className={isActive("/menu") ? "active" : ""}>Menu</Link></li>
            <li><Link href="/about" className={isActive("/about") ? "active" : ""}>About</Link></li>
            <li><Link href="/gallery" className={isActive("/gallery") ? "active" : ""}>Gallery</Link></li>
            <li><Link href="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link></li>
            <li><ReservationModal /></li>
          </ul>
          <button
            className="menu-toggle"
            id="menuToggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span style={{
              transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
            }}></span>
            <span style={{
              opacity: menuOpen ? '0' : '1'
            }}></span>
            <span style={{
              transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
            }}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
