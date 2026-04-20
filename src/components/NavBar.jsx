import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { COLORS, NAV_ITEMS } from "../constants";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .nav-link{background:none;border:none;cursor:pointer;font-family:'Libre Baskerville',serif;font-size:13px;letter-spacing:0.08em;padding:6px 12px;color:${COLORS.cream};transition:color 0.2s;text-transform:uppercase;text-decoration:none}
        .nav-link:hover, .nav-link.active{color:${COLORS.goldLight}}
        .nav-link.active{border-bottom:2px solid ${COLORS.goldLight}}
        .hamburger{background:none;border:none;cursor:pointer;display:none;flex-direction:column;gap:5px;padding:4px}
        .hamburger span{display:block;width:24px;height:2px;background:${COLORS.cream};transition:all 0.3s}
        @media(max-width:900px){.nav-desktop{display:none!important}.hamburger{display:flex!important}}
        .mobile-menu{position:fixed;top:64px;left:0;right:0;background:${COLORS.darkGreen};padding:16px;z-index:999;border-bottom:2px solid ${COLORS.gold};display:flex;flex-direction:column;gap:4px;max-height:calc(100vh - 64px);overflow-y:auto}
      `}</style>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(26,58,42,0.97)" : COLORS.darkGreen, boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none", transition: "all 0.3s", borderBottom: "1px solid rgba(184,151,42,0.3)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link to="/" onClick={closeMenu} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", textDecoration: "none" }}>
            <span style={{ fontFamily: "'Amiri',serif", fontSize: 18, color: COLORS.goldLight, letterSpacing: "0.05em", lineHeight: 1.2 }}>Dr. Muhammad Hammad Lakhvi</span>
            <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 10, color: COLORS.goldLight, opacity: 0.9, letterSpacing: "0.15em", textTransform: "uppercase" }}>Scholar · Professor · President Faith Foundation</span>
          </Link>
          <div className="nav-desktop" style={{ display: "flex", gap: 2 }}>
            {NAV_ITEMS.map(n => (
              <NavLink key={n.id} to={n.path} className="nav-link" onClick={closeMenu}>{n.label}</NavLink>
            ))}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_ITEMS.map(n => (
              <NavLink key={n.id} to={n.path} className="nav-link" onClick={closeMenu} style={{ textAlign: "left", padding: "10px 16px" }}>{n.label}</NavLink>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
