import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoSrc from "@/imports/ChatGPT_Image_wode_Dec_19__2025__11_54_21_PM__2_-removebg-preview.png";
import {
  Satellite, Brain, Cloud, Globe, Layers, Cpu, Shield, Zap,
  ChevronRight, Mail, Linkedin, Github, Twitter, ArrowRight,
  Menu, X, Star, Activity, BarChart3, Database, Lock, Rocket,
  Users, Target, TrendingUp, Radio, MapPin, Phone, Send,
  Calendar, ChevronDown,
  Award, Briefcase, Code2, Server, Network, Eye, Crosshair,
  Atom, Gauge, Binary, ScanLine, GitBranch, Terminal
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page = "home" | "about" | "technology" | "team" | "careers" | "contact";

// ─── Starfield Canvas ────────────────────────────────────────────────────────
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      o: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,211,94,${s.o})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
}

// ─── Shared Components ───────────────────────────────────────────────────────
function GoldButton({ children, onClick, variant = "primary", className = "" }: {
  children: React.ReactNode; onClick?: () => void; variant?: "primary" | "outline"; className?: string;
}) {
  return (
    <button onClick={onClick}
      className={`relative group inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer
        ${variant === "primary"
          ? "bg-gradient-to-r from-[#E8B800] to-[#FFD700] text-[#050505] hover:shadow-[0_0_30px_rgba(232,184,0,0.6)] hover:scale-105"
          : "border border-[#E8B800]/50 text-[#E8B800] hover:border-[#E8B800] hover:bg-[#E8B800]/10 hover:shadow-[0_0_20px_rgba(232,184,0,0.3)]"
        } ${className}`}
      style={{ fontFamily: "Rajdhani, sans-serif" }}>
      {children}
    </button>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#E8B800]" />
      <span className="text-[#E8B800] text-xs tracking-[0.3em] uppercase font-semibold" style={{ fontFamily: "JetBrains Mono, monospace" }}>{children}</span>
      <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#E8B800]" />
    </div>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-4xl md:text-5xl font-bold text-white leading-tight ${className}`}
      style={{ fontFamily: "Orbitron, monospace" }}>
      {children}
    </h2>
  );
}

function GlassCard({ children, className = "", glowColor = "gold" }: {
  children: React.ReactNode; className?: string; glowColor?: "gold" | "subtle";
}) {
  return (
    <div className={`relative rounded-lg border bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06]
      ${glowColor === "gold" ? "border-[#E8B800]/20 hover:border-[#E8B800]/50 hover:shadow-[0_0_30px_rgba(232,184,0,0.15)]" : "border-white/5 hover:border-white/10"}
      ${className}`}>
      {children}
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ activePage, setPage }: { activePage: Page; setPage: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks: { label: string; page: Page }[] = [
    { label: "Home", page: "home" }, { label: "About", page: "about" },
    { label: "Technology", page: "technology" }, { label: "Team", page: "team" },
    { label: "Careers", page: "careers" }, { label: "Contact", page: "contact" },
  ];
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#050505]/90 backdrop-blur-md border-b border-[#E8B800]/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => setPage("home")} className="flex items-center cursor-pointer group">
          <ImageWithFallback
            src={logoSrc}
            alt="SKYVONYX logo"
            className="h-9 w-auto object-contain transition-opacity group-hover:opacity-80"
          />
        </button>
        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ label, page }) => (
            <button key={page} onClick={() => setPage(page)}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer font-semibold
                ${activePage === page ? "text-[#E8B800]" : "text-white/60 hover:text-white"}`}
              style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {label}
            </button>
          ))}
        </div>
        <div className="hidden lg:block">
          <GoldButton onClick={() => setPage("technology")}>
            <Rocket className="w-3.5 h-3.5" /> Explore Intelligence
          </GoldButton>
        </div>
        <button className="lg:hidden text-white p-2 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-[#050505]/98 border-b border-[#E8B800]/10 px-6 pb-6">
            {navLinks.map(({ label, page }) => (
              <button key={page} onClick={() => { setPage(page); setMobileOpen(false); }}
                className="block w-full text-left py-3 text-sm text-white/70 hover:text-[#E8B800] tracking-widest uppercase cursor-pointer"
                style={{ fontFamily: "Rajdhani, sans-serif" }}>
                {label}
              </button>
            ))}
            <GoldButton onClick={() => { setPage("technology"); setMobileOpen(false); }} className="mt-4 w-full justify-center">
              Explore Intelligence
            </GoldButton>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="relative border-t border-[#E8B800]/10 bg-[#050505] pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="mb-4">
              <ImageWithFallback
                src={logoSrc}
                alt="SKYVONYX logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              Deep-tech startup building AI-powered satellite intelligence and 2D-to-3D spatial reconstruction systems.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.linkedin.com/company/skyvonyx" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#E8B800]/20 flex items-center justify-center text-[#E8B800]/60 hover:text-[#E8B800] hover:border-[#E8B800]/60 hover:shadow-[0_0_12px_rgba(232,184,0,0.3)] transition-all cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/skyvonyx" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#E8B800]/20 flex items-center justify-center text-[#E8B800]/60 hover:text-[#E8B800] hover:border-[#E8B800]/60 hover:shadow-[0_0_12px_rgba(232,184,0,0.3)] transition-all cursor-pointer">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://github.com/skyvonyx" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-[#E8B800]/20 flex items-center justify-center text-[#E8B800]/60 hover:text-[#E8B800] hover:border-[#E8B800]/60 hover:shadow-[0_0_12px_rgba(232,184,0,0.3)] transition-all cursor-pointer">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-[#E8B800] text-xs tracking-widest uppercase font-semibold mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>Navigation</p>
            {(["home", "about", "technology", "team", "careers", "contact"] as Page[]).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className="block text-white/50 hover:text-[#E8B800] text-sm py-1.5 capitalize tracking-wide transition-colors cursor-pointer"
                style={{ fontFamily: "Rajdhani, sans-serif" }}>
                {p}
              </button>
            ))}
          </div>
          <div>
            <p className="text-[#E8B800] text-xs tracking-widest uppercase font-semibold mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>Contact</p>
            <div className="space-y-3 text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E8B800]/60" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=skyvonyx@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8B800] transition-colors cursor-pointer">skyvonyx@gmail.com</a>
              </div>
              {/* <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#E8B800]/60" /><span>ganesh@skyvonyx.com</span></div> */}
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#E8B800]/60" /><span>Global — Remote First</span></div>
            </div>
          </div>
        </div>
        <div className="border-t border-[#E8B800]/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs tracking-wider" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            © 2026 SKYVONYX. All rights reserved.
          </p>
          <p className="text-white/20 text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Satellite Intelligence · AI/ML · Geospatial Analytics
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const stats = [
    { label: "AI Labeling Accuracy", value: "99.4%", icon: Target, delta: "+2.1%" },
    { label: "Satellite Detection", value: "12,847", icon: Satellite, delta: "Active" },
    { label: "3D Reconstruction", value: "4.2ms", icon: Layers, delta: "Latency" },
    { label: "Cloud AI Processing", value: "98.7%", icon: Cloud, delta: "Uptime" },
  ];
  const techCards = [
    { icon: Satellite, title: "Satellite Image Labeling", desc: "Automated multi-class annotation of high-resolution satellite imagery using transformer-based detection models." },
    { icon: Layers, title: "2D to 3D Reconstruction", desc: "Neural depth estimation pipelines converting flat imagery into rich 3D spatial models at scale." },
    { icon: Brain, title: "AI / ML Models", desc: "Custom-trained foundation models optimized for geospatial feature extraction and classification." },
    { icon: Cloud, title: "Cloud Infrastructure", desc: "Elastic Kubernetes clusters across multi-cloud environments with sub-second auto-scaling." },
    { icon: Globe, title: "Geospatial Intelligence", desc: "Real-time GIS analytics fusing satellite data streams with terrain and atmospheric overlays." },
    { icon: Cpu, title: "Deep Learning Pipelines", desc: "End-to-end MLOps pipelines from raw sensor data to production-grade inference endpoints." },
  ];
  const features = [
    { icon: Zap, title: "AI-Powered Automation", desc: "Eliminate manual workflows with autonomous labeling, annotation, and classification at planetary scale." },
    { icon: Cloud, title: "Scalable Cloud Systems", desc: "Dynamic infrastructure that grows with your mission — from prototype to enterprise deployment in hours." },
    { icon: Crosshair, title: "Precision Satellite Analytics", desc: "Sub-meter accuracy in object detection, change detection, and terrain classification." },
    { icon: Activity, title: "Real-Time Processing", desc: "Stream satellite imagery through our inference APIs with latency measured in milliseconds." },
    { icon: Shield, title: "Enterprise Security", desc: "SOC 2 aligned data pipelines with end-to-end encryption and role-based access control." },
    { icon: Rocket, title: "Future-Ready Architecture", desc: "Modular microservices designed to integrate seamlessly with next-generation satellite constellations." },
  ];
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-radial from-[#E8B800]/5 via-transparent to-transparent" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(232,184,0,0.08) 0%, transparent 70%)" }} />
        {/* Orbit lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[340, 480, 620].map((size, i) => (
            <div key={i} className="absolute rounded-full border border-[#E8B800]/8"
              style={{ width: size, height: size, animation: `spin ${20 + i * 8}s linear infinite` }} />
          ))}
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-[#E8B800]/10 border border-[#E8B800]/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E8B800] animate-pulse" />
              <span className="text-[#E8B800] text-xs tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>Deep-Tech · AI · Satellite Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.05]" style={{ fontFamily: "Orbitron, monospace" }}>
              Transforming<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8B800] to-[#FFD700]">Satellite</span><br />
              Intelligence
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
              SKYVONYX builds advanced deep-tech solutions for satellite image labeling and intelligent 2D-to-3D spatial reconstruction.
            </p>
            <div className="flex flex-wrap gap-4">
              <GoldButton onClick={() => setPage("technology")} variant="primary">
                <Cpu className="w-4 h-4" /> View Technology
              </GoldButton>
              <GoldButton onClick={() => setPage("team")} variant="outline">
                <Users className="w-4 h-4" /> Meet The Team
              </GoldButton>
            </div>
          </motion.div>
          {/* Floating stats cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value, icon: Icon, delta }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <GlassCard className="p-5" glowColor="gold">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-md bg-[#E8B800]/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#E8B800]" />
                    </div>
                    <span className="text-xs text-[#E8B800]/70 font-mono">{delta}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Orbitron, monospace" }}>{value}</div>
                  <div className="text-xs text-white/40 leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>{label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <SectionTitle className="mb-6">Pioneering the<br /><span className="text-[#E8B800]">Next Frontier</span></SectionTitle>
            <p className="text-white/60 leading-relaxed mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              SKYVONYX is a deep-tech startup focused on AI-powered satellite image labeling and 2D-to-3D spatial intelligence systems. We develop scalable technologies that combine artificial intelligence, cloud computing, and geospatial analytics to enable next-generation satellite communication and intelligent data systems.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { icon: Target, title: "Mission", body: "Democratize access to satellite intelligence through AI-driven automation that reduces cost, increases accuracy, and accelerates geospatial insights at global scale." },
              { icon: Eye, title: "Vision", body: "A world where every satellite data stream is instantly understood, labeled, and transformed into actionable 3D intelligence." },
              { icon: Atom, title: "Innovation", body: "We operate at the intersection of deep learning, orbital mechanics, and cloud-native infrastructure — where no established playbook exists." },
            ].map(({ icon: Icon, title, body }, i) => (
              <GlassCard key={i} className="p-5 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#E8B800]/10 flex items-center justify-center mt-0.5">
                  <Icon className="w-5 h-5 text-[#E8B800]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 text-sm tracking-widest uppercase" style={{ fontFamily: "Rajdhani, sans-serif" }}>{title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{body}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="py-24 border-y border-[#E8B800]/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Core Technologies</SectionLabel>
            <SectionTitle>Built for the<br /><span className="text-[#E8B800]">Intelligence Age</span></SectionTitle>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techCards.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <GlassCard className="p-6 h-full group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8B800]/15 to-[#E8B800]/5 border border-[#E8B800]/20 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(232,184,0,0.3)] transition-all">
                    <Icon className="w-6 h-6 text-[#E8B800]" />
                  </div>
                  <h3 className="text-white font-bold mb-2 tracking-wide" style={{ fontFamily: "Rajdhani, sans-serif" }}>{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#E8B800]/60 text-xs group-hover:text-[#E8B800] transition-colors" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    Learn more <ChevronRight className="w-3 h-3" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why SKYVONYX */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <SectionLabel>Why SKYVONYX</SectionLabel>
          <SectionTitle>The Edge That<br /><span className="text-[#E8B800]">Matters</span></SectionTitle>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <GlassCard key={i} className="p-6 flex gap-4" glowColor="subtle">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg border border-[#E8B800]/20 bg-[#E8B800]/5 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#E8B800]" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1.5 text-sm tracking-wide" style={{ fontFamily: "Rajdhani, sans-serif" }}>{title}</h4>
                <p className="text-white/45 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="py-24 bg-[#080808] border-y border-[#E8B800]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel>Leadership</SectionLabel>
            <SectionTitle>Founder<br /><span className="text-[#E8B800]">Spotlight</span></SectionTitle>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Harish Raj Balraj", role: "Founder", initials: "HRB",
                strengths: ["AI/ML", "Product Strategy", "Cloud Architecture"],
                bio: "I am passionate about driving innovation in satellite communication and creating scalable technologies that shape the future of space-based connectivity.",
                linkedin: "https://www.linkedin.com/in/harish-raj-balraj-6b554b351", email: "harishrajb2007@gmail.com",
              },
              {
                name: "Ganesh Gitaka", role: "Co-Founder", initials: "GG",
                strengths: ["AI/ML", "Full Stack Dev", "DevOps"],
                bio: "I focus on engineering scalable and future-ready technologies that aim to transform satellite communication and data transfer systems.",
                linkedin: "www.linkedin.com/in/ganesh-gitaka-64b38034b", email: "ganesh.gitaka@gmail.com",
              },
            ].map((f, i) => (
              <GlassCard key={i} className="p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#E8B800] to-[#FFD700] flex items-center justify-center text-[#050505] font-black text-lg flex-shrink-0" style={{ fontFamily: "Orbitron, monospace" }}>
                    {f.initials}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: "Orbitron, monospace" }}>{f.name}</h3>
                    <p className="text-[#E8B800] text-sm tracking-widest uppercase mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>{f.role}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {f.strengths.map(s => (
                        <span key={s} className="text-xs bg-[#E8B800]/10 text-[#E8B800]/80 border border-[#E8B800]/20 px-2 py-0.5 rounded-sm" style={{ fontFamily: "JetBrains Mono, monospace" }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-5" style={{ fontFamily: "Inter, sans-serif" }}>"{f.bio}"</p>
                <div className="flex gap-3 border-t border-white/5 pt-5">
                  <a href={f.linkedin.startsWith('http') ? f.linkedin : `https://${f.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#E8B800] transition-colors cursor-pointer" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                  <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${f.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#E8B800] transition-colors cursor-pointer" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    <Mail className="w-3.5 h-3.5" /> Email
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative rounded-2xl border border-[#E8B800]/20 bg-gradient-to-br from-[#E8B800]/8 to-transparent overflow-hidden p-12 text-center">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(232,184,0,0.12) 0%, transparent 60%)" }} />
          <div className="relative z-10">
            <SectionLabel>Join The Mission</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-5 mt-2" style={{ fontFamily: "Orbitron, monospace" }}>
              Building The Future<br />of <span className="text-[#E8B800]">Satellite Intelligence</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Be part of the team redefining how humanity understands the Earth from orbit.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <GoldButton onClick={() => setPage("careers")} variant="primary"><Rocket className="w-4 h-4" /> Join SKYVONYX</GoldButton>
              <GoldButton onClick={() => setPage("contact")} variant="outline"><Send className="w-4 h-4" /> Contact Team</GoldButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  const timeline = [
    { year: "2023", title: "Company Founded", desc: "Harish Raj Balraj and Ganesh Gitaka establish SKYVONYX with a vision to transform satellite intelligence through AI." },
    { year: "2024 Q1", title: "Core AI Engine", desc: "Deployed first production-grade satellite image labeling model achieving 98% accuracy on multi-class detection benchmarks." },
    { year: "2024 Q2", title: "3D Pipeline Launch", desc: "Released patent-pending 2D-to-3D spatial reconstruction pipeline capable of processing 1TB of imagery per hour." },
    { year: "2024 Q3", title: "Cloud Scale", desc: "Migrated infrastructure to multi-cloud Kubernetes clusters, achieving 99.9% uptime across all inference endpoints." },
    { year: "2025", title: "Global Expansion", desc: "Expanding team and technology reach globally, targeting enterprise satellite operators, defense agencies, and smart city platforms." },
  ];
  const metrics = [
    { label: "Model Accuracy", value: "99.4%", icon: Target },
    { label: "Datasets Processed", value: "2.1 PB", icon: Database },
    { label: "AI Models Deployed", value: "47", icon: Brain },
    { label: "Team Members", value: "12+", icon: Users },
  ];
  return (
    <div className="pt-28 max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <SectionLabel>Our Story</SectionLabel>
        <SectionTitle className="mb-5">The SKYVONYX<br /><span className="text-[#E8B800]">Journey</span></SectionTitle>
        <p className="text-white/50 max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
          From a bold idea to a pioneering deep-tech company — our story is one of relentless engineering, scientific curiosity, and an unwavering belief in satellite intelligence.
        </p>
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {metrics.map(({ label, value, icon: Icon }, i) => (
          <GlassCard key={i} className="p-6 text-center">
            <Icon className="w-6 h-6 text-[#E8B800] mx-auto mb-3" />
            <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "Orbitron, monospace" }}>{value}</div>
            <div className="text-xs text-white/40 tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>{label}</div>
          </GlassCard>
        ))}
      </div>
      {/* Timeline */}
      <div className="mb-20">
        <div className="text-center mb-12"><SectionLabel>Roadmap</SectionLabel><SectionTitle><span className="text-[#E8B800]">Innovation</span> Timeline</SectionTitle></div>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#E8B800]/60 to-transparent" />
          {timeline.map((item, i) => (
            <div key={i} className={`relative flex gap-8 mb-10 ${i % 2 === 0 ? "flex-row-reverse text-right" : ""}`}>
              <div className="flex-1 max-w-md">
                <GlassCard className="p-5">
                  <div className="text-[#E8B800] text-xs font-mono mb-2 tracking-widest">{item.year}</div>
                  <h4 className="text-white font-bold mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>{item.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{item.desc}</p>
                </GlassCard>
              </div>
              <div className="relative z-10 flex-shrink-0 w-4 h-4 mt-5 rounded-full bg-[#E8B800] shadow-[0_0_12px_rgba(232,184,0,0.8)]" />
              <div className="flex-1 max-w-md" />
            </div>
          ))}
        </div>
      </div>
      {/* Research */}
      <div className="border-t border-[#E8B800]/10 pt-20 mb-20">
        <div className="text-center mb-12"><SectionLabel>Research Focus</SectionLabel><SectionTitle>AI <span className="text-[#E8B800]">Research Highlights</span></SectionTitle></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: ScanLine, title: "Neural Depth Estimation", desc: "Novel monocular depth estimation architecture tuned for nadir-view satellite imagery across varied altitude ranges." },
            { icon: Binary, title: "Multi-Modal Fusion", desc: "Combining optical, SAR, and LiDAR modalities into unified feature representations for superior scene understanding." },
            { icon: GitBranch, title: "Few-Shot Learning", desc: "Rapid model adaptation to new geographic regions and sensor configurations with fewer than 50 labeled examples." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <GlassCard key={i} className="p-6">
              <Icon className="w-7 h-7 text-[#E8B800] mb-4" />
              <h4 className="text-white font-bold mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>{title}</h4>
              <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TECHNOLOGY PAGE ──────────────────────────────────────────────────────────
function TechnologyPage() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    "Image Labeling", "3D Reconstruction", "ML Workflow", "Cloud Infra", "Data Annotation", "Analytics"
  ];
  const tabContent = [
    {
      title: "Satellite Image Labeling System",
      desc: "Our transformer-based labeling engine processes multi-spectral satellite imagery at scale, outputting structured GeoJSON annotations with semantic class labels, confidence scores, and bounding polygons.",
      steps: ["Ingest raw satellite tiles via GeoTIFF / COG", "Pre-process: normalize, cloud-mask, calibrate", "Run multi-scale object detection", "Post-process: merge, filter, convert to GeoJSON", "Push to annotation review queue"],
      metrics: [{ label: "Throughput", value: "8 TB/hr" }, { label: "Classes", value: "240+" }, { label: "mAP Score", value: "0.94" }]
    },
    {
      title: "2D to 3D Conversion Pipeline",
      desc: "Proprietary depth estimation models transform single-view nadir imagery into dense 3D point clouds, meshes, and textured DEMs suitable for downstream GIS, simulation, and AR/VR applications.",
      steps: ["Input: single or stereo satellite frames", "Extract epipolar features + self-supervised depth cues", "Dense disparity estimation via multi-scale CNN", "Point cloud fusion + surface reconstruction", "Export: OBJ, PLY, GeoTIFF DEM"],
      metrics: [{ label: "Accuracy", value: "±0.3m" }, { label: "Latency", value: "4.2ms" }, { label: "Resolution", value: "0.1m GSD" }]
    },
    {
      title: "Machine Learning Workflow",
      desc: "End-to-end MLOps framework covering data versioning, distributed training, experiment tracking, model registry, and automated A/B deployment to edge inference nodes.",
      steps: ["Data versioning with DVC + S3 backend", "Distributed training on A100 GPU clusters", "Experiment tracking via MLflow", "Model registry with staging/production gates", "Canary rollout to inference endpoints"],
      metrics: [{ label: "Training Time", value: "-60%" }, { label: "Model Versions", value: "47" }, { label: "Deploy Freq", value: "Daily" }]
    },
    {
      title: "Cloud Infrastructure",
      desc: "Multi-cloud Kubernetes architecture spanning AWS, GCP, and Azure zones. Event-driven autoscaling, zero-trust networking, and automated disaster recovery deliver enterprise-grade reliability.",
      steps: ["Multi-region Kubernetes clusters (EKS/GKE)", "Event-driven autoscaling via KEDA", "Zero-trust service mesh with Istio", "GitOps deployment with ArgoCD", "Automated DR with <15min RTO"],
      metrics: [{ label: "Uptime", value: "99.97%" }, { label: "Scale-Out", value: "<30s" }, { label: "Cost Opt.", value: "-35%" }]
    },
    {
      title: "Data Annotation Systems",
      desc: "Human-in-the-loop annotation platform combining AI pre-labeling, expert review queues, and quality consensus scoring to maintain gold-standard dataset integrity.",
      steps: ["AI pre-label batch with confidence threshold", "Route low-confidence samples to expert queue", "Consensus scoring across 3 annotators", "Quality audit with inter-annotator agreement", "Version-controlled dataset release"],
      metrics: [{ label: "Label Speed", value: "10x" }, { label: "Agreement", value: "97.2%" }, { label: "Dataset Size", value: "14M+" }]
    },
    {
      title: "Geospatial Analytics Engine",
      desc: "Real-time GIS analytics platform fusing multi-source satellite observations with ground-truth databases, delivering actionable intelligence dashboards for enterprise operators.",
      steps: ["Stream ingestion: Sentinel, WorldView, Planet", "Spatial indexing via H3 / GeoParquet", "Change detection delta analysis", "Temporal trend modeling", "Dashboard rendering + API delivery"],
      metrics: [{ label: "Sources", value: "12+" }, { label: "Latency", value: "<2s" }, { label: "Coverage", value: "Global" }]
    },
  ];
  const current = tabContent[activeTab];
  return (
    <div className="pt-28 max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <SectionLabel>Technology Stack</SectionLabel>
        <SectionTitle>Deep-Tech<br /><span className="text-[#E8B800]">Architecture</span></SectionTitle>
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all cursor-pointer
              ${activeTab === i ? "border-[#E8B800] text-[#E8B800] bg-[#E8B800]/10 shadow-[0_0_15px_rgba(232,184,0,0.2)]" : "border-white/10 text-white/50 hover:border-white/30 hover:text-white/80"}`}
            style={{ fontFamily: "JetBrains Mono, monospace" }}>
            {t}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="grid lg:grid-cols-2 gap-8 mb-20">
        <GlassCard className="p-8">
          <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "Orbitron, monospace" }}>{current.title}</h3>
          <p className="text-white/55 leading-relaxed mb-6 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{current.desc}</p>
          <div className="space-y-3">
            {current.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-[#E8B800]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#E8B800] text-xs font-mono">{i + 1}</span>
                </div>
                <span className="text-white/60 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{step}</span>
              </div>
            ))}
          </div>
        </GlassCard>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-4">
            {current.metrics.map(({ label, value }, i) => (
              <GlassCard key={i} className="p-5 text-center">
                <div className="text-2xl font-black text-[#E8B800] mb-1" style={{ fontFamily: "Orbitron, monospace" }}>{value}</div>
                <div className="text-xs text-white/40 tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>{label}</div>
              </GlassCard>
            ))}
          </div>
          {/* Architecture visual */}
          <GlassCard className="p-6 flex-1">
            <div className="text-xs text-[#E8B800]/60 mb-4 tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>System Architecture</div>
            <div className="space-y-3">
              {["Data Ingestion Layer", "Processing & Inference", "Storage & Indexing", "API & Delivery"].map((layer, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 flex-1 rounded border border-[#E8B800]/20 bg-[#E8B800]/5 flex items-center px-3">
                    <span className="text-xs text-white/60" style={{ fontFamily: "JetBrains Mono, monospace" }}>{layer}</span>
                  </div>
                  {i < 3 && <ChevronDown className="w-4 h-4 text-[#E8B800]/40 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// ─── TEAM PAGE ────────────────────────────────────────────────────────────────
function TeamPage({ setPage }: { setPage: (p: Page) => void }) {
  const employees = [
    { name: "Alex Chen", role: "Senior ML Engineer", skills: ["PyTorch", "Computer Vision", "CUDA"], initials: "AC" },
    { name: "Priya Nair", role: "Cloud Architect", skills: ["Kubernetes", "AWS", "Terraform"], initials: "PN" },
    { name: "Marcus Liu", role: "Full Stack Developer", skills: ["React", "FastAPI", "PostgreSQL"], initials: "ML" },
    { name: "Sara Ahmed", role: "Geospatial Analyst", skills: ["QGIS", "GeoParquet", "H3"], initials: "SA" },
    { name: "Dev Krishnan", role: "DevOps Engineer", skills: ["ArgoCD", "Istio", "Helm"], initials: "DK" },
    { name: "Lena Müller", role: "Data Scientist", skills: ["Statistical Modeling", "R", "Spark"], initials: "LM" },
  ];
  return (
    <div className="pt-28 max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <SectionLabel>Our People</SectionLabel>
        <SectionTitle>The <span className="text-[#E8B800]">SKYVONYX</span> Team</SectionTitle>
      </div>
      {/* Founders */}
      <div className="mb-20">
        <div className="text-center mb-10"><SectionLabel>Leadership</SectionLabel></div>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            { name: "Harish Raj Balraj", role: "Founder", initials: "HRB", skills: ["AI/ML", "Product", "Cloud Architecture"], bio: "Passionate about driving innovation in satellite communication and creating scalable technologies." },
            { name: "Ganesh Gitaka", role: "Co-Founder", initials: "GG", skills: ["AI/ML", "Full Stack", "DevOps"], bio: "Focused on engineering scalable and future-ready technologies for satellite communication." },
          ].map((f, i) => (
            <GlassCard key={i} className="p-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E8B800] to-[#FFD700] flex items-center justify-center text-[#050505] font-black text-xl mx-auto mb-5" style={{ fontFamily: "Orbitron, monospace" }}>{f.initials}</div>
              <div className="text-center mb-4">
                <h3 className="text-white font-bold text-lg" style={{ fontFamily: "Orbitron, monospace" }}>{f.name}</h3>
                <p className="text-[#E8B800] text-xs tracking-widest uppercase mt-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>{f.role}</p>
              </div>
              <p className="text-white/50 text-sm text-center mb-4 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{f.bio}</p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {f.skills.map(s => <span key={s} className="text-xs bg-[#E8B800]/10 text-[#E8B800]/80 border border-[#E8B800]/20 px-2 py-0.5 rounded-sm" style={{ fontFamily: "JetBrains Mono, monospace" }}>{s}</span>)}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      {/* Join banner */}
      <div className="rounded-xl border border-[#E8B800]/20 bg-gradient-to-r from-[#E8B800]/5 to-transparent p-10 text-center mb-16">
        <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "Orbitron, monospace" }}>Join Our Team</h3>
        <p className="text-white/50 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>We're building the future of satellite intelligence. Come build it with us.</p>
        <GoldButton onClick={() => setPage("careers")} variant="primary"><Briefcase className="w-4 h-4" /> View Open Roles</GoldButton>
      </div>
    </div>
  );
}

// ─── CAREERS PAGE ─────────────────────────────────────────────────────────────
function CareersPage() {
  const roles = [
    { title: "AI Engineer", dept: "Engineering", type: "Full-Time · Remote", desc: "Design and implement production ML systems for satellite image analysis at scale.", tags: ["PyTorch", "CUDA", "Kubernetes"] },
    { title: "ML Researcher", dept: "Research", type: "Full-Time · Remote", desc: "Advance the state-of-the-art in monocular depth estimation and multi-modal geospatial fusion.", tags: ["Research", "PyTorch", "Publication"] },
    { title: "Full Stack Developer", dept: "Engineering", type: "Full-Time · Remote", desc: "Build the internal tooling, APIs, and dashboards that power our AI data pipelines.", tags: ["React", "FastAPI", "PostgreSQL"] },
    { title: "Cloud Architect", dept: "Infrastructure", type: "Full-Time · Remote", desc: "Design the next generation of our multi-cloud Kubernetes platform for petabyte-scale processing.", tags: ["AWS/GCP", "Terraform", "K8s"] },
    { title: "DevOps Engineer", dept: "Infrastructure", type: "Full-Time · Remote", desc: "Own CI/CD, GitOps, and observability infrastructure across our production systems.", tags: ["ArgoCD", "Prometheus", "Helm"] },
    { title: "Geospatial Analyst", dept: "Data", type: "Full-Time · Remote", desc: "Bridge satellite data science and engineering — turning raw imagery into structured intelligence.", tags: ["GDAL", "QGIS", "Python"] },
  ];
  const benefits = [
    { icon: Globe, title: "100% Remote", desc: "Work from anywhere in the world. Async-first culture." },
    { icon: Brain, title: "AI Research Budget", desc: "$5,000/yr for papers, courses, and conferences." },
    { icon: Rocket, title: "Equity Package", desc: "Early-stage equity in a space-tech company building the future." },
    { icon: Shield, title: "Health Coverage", desc: "Comprehensive health, dental, and vision for you and dependents." },
    { icon: Star, title: "Deep Tech Culture", desc: "Work alongside world-class researchers and engineers." },
    { icon: Zap, title: "Fast-Track Growth", desc: "Grow fast in a startup environment where your work ships immediately." },
  ];
  return (
    <div className="pt-28 max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <SectionLabel>Join SKYVONYX</SectionLabel>
        <SectionTitle>Shape the Future of<br /><span className="text-[#E8B800]">Satellite Intelligence</span></SectionTitle>
        <p className="text-white/50 mt-5 max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
          We're a remote-first, research-driven team building deep technology for the next era of satellite communication.
        </p>
      </div>
      {/* Open positions hidden */}
      {/* Benefits */}
      <div className="mb-20">
        <div className="text-center mb-10"><SectionLabel>Benefits</SectionLabel><SectionTitle>Why <span className="text-[#E8B800]">Join Us</span></SectionTitle></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map(({ icon: Icon, title, desc }, i) => (
            <GlassCard key={i} className="p-5 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#E8B800]/10 border border-[#E8B800]/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#E8B800]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1" style={{ fontFamily: "Rajdhani, sans-serif" }}>{title}</h4>
                <p className="text-white/45 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create email body with form data
    const subject = encodeURIComponent(`New Message from ${form.name} - ${form.company}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}`);
    // Open user's default email client
    window.location.href = `mailto:skyvonyx@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };
  return (
    <div className="pt-28 max-w-7xl mx-auto px-6 pb-20">
      <div className="text-center mb-14">
        <SectionLabel>Get In Touch</SectionLabel>
        <SectionTitle>Contact<br /><span className="text-[#E8B800]">SKYVONYX</span></SectionTitle>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Form */}
        <GlassCard className="p-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-10">
              <div className="w-16 h-16 rounded-full bg-[#E8B800]/20 border border-[#E8B800]/40 flex items-center justify-center">
                <Send className="w-7 h-7 text-[#E8B800]" />
              </div>
              <h4 className="text-white font-bold text-xl" style={{ fontFamily: "Orbitron, monospace" }}>Message Sent</h4>
              <p className="text-white/50 text-center text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                We'll get back to you within 24 hours. Thank you for reaching out.
              </p>
              <button onClick={() => setSent(false)} className="text-[#E8B800] text-sm hover:underline cursor-pointer">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-white font-bold text-xl mb-6" style={{ fontFamily: "Orbitron, monospace" }}>Send a Message</h3>
              <h6 className="text-white font-bold text-x6 mb-6" style={{ fontFamily: "Orbitron, monospace" }}>(You will be redirected to mail once "SEND MESSAGE" is clicked.)</h6>
              {[
                { label: "Your Name", field: "name", type: "text", placeholder: "ex: John Smith" },
                { label: "Email Address", field: "email", type: "email", placeholder: "ex: john@company.com" },
                { label: "Company", field: "company", type: "text", placeholder: "ex: ABC Corp" },
              ].map(({ label, field, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs text-white/50 tracking-widest uppercase mb-1.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>{label}</label>
                  <input type={type} value={(form as any)[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm rounded focus:border-[#E8B800]/50 focus:outline-none focus:bg-white/8 transition-all"
                    style={{ fontFamily: "Inter, sans-serif" }} />
                </div>
              ))}
              <div>
                <label className="block text-xs text-white/50 tracking-widest uppercase mb-1.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>Message</label>
                <textarea rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project or inquiry..."
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/25 px-4 py-3 text-sm rounded focus:border-[#E8B800]/50 focus:outline-none resize-none transition-all"
                  style={{ fontFamily: "Inter, sans-serif" }} />
              </div>
              <GoldButton variant="primary" className="w-full justify-center">
                <Send className="w-4 h-4" /> Send Message
              </GoldButton>
            </form>
          )}
        </GlassCard>
        {/* Contact info */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h4 className="text-white font-bold mb-4" style={{ fontFamily: "Rajdhani, sans-serif" }}>Direct Contact</h4>
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Harish Raj (Founder)", value: "harishrajb2007@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=harishrajb2007@gmail.com" },
                { icon: Mail, label: "Ganesh Gitaka (Co-Founder)", value: "ganesh.gitaka@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=ganesh.gitaka@gmail.com" },
                { icon: Mail, label: "skyvonyx", value: "skyvonyx@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=skyvonyx@gmail.com" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/company/skyvonyx", href: "https://linkedin.com/company/skyvonyx" },
                { icon: MapPin, label: "Location", value: "Global — Remote First", href: "" },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8B800]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-[#E8B800]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs mb-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-[#E8B800] text-sm transition-colors cursor-pointer" style={{ fontFamily: "Inter, sans-serif" }}>{value}</a>
                    ) : (
                      <div className="text-white/80 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <h4 className="text-white font-bold mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>Business Inquiries</h4>
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              For enterprise partnerships, licensing, and strategic collaborations, please include your organization's name and a brief project description in your message.
            </p>
          </GlassCard>
          <GlassCard className="p-6">
            <div className="text-xs text-[#E8B800]/60 mb-2 tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>Response Time</div>
            <div className="text-3xl font-black text-white" style={{ fontFamily: "Orbitron, monospace" }}>&lt; 24hrs</div>
            <div className="text-white/40 text-xs mt-1" style={{ fontFamily: "Inter, sans-serif" }}>We respond to all inquiries within one business day</div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}


// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const mainRef = useRef<HTMLDivElement>(null);

  const navigate = (p: Page) => {
    setPage(p);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageComponents: Record<Page, React.ReactNode> = {
    home: <HomePage setPage={navigate} />,
    about: <AboutPage />,
    technology: <TechnologyPage />,
    team: <TeamPage setPage={navigate} />,
    careers: <CareersPage />,
    contact: <ContactPage />,
  };

  return (
    <HelmetProvider>
      <Helmet>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4857877397305724" crossorigin="anonymous"></script>
      </Helmet>
      <div className="relative min-h-screen bg-[#050505] overflow-x-hidden" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(232,184,0,0.2) transparent" }}>
        <StarField />
        <Navbar activePage={page} setPage={navigate} />
        <main ref={mainRef}>
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              {pageComponents[page]}
            </motion.div>
          </AnimatePresence>
          <Footer setPage={navigate} />
        </main>
        {/* Page nav dots */}
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2.5 hidden xl:flex">
          {(["home", "about", "technology", "team", "careers", "contact"] as Page[]).map(p => (
            <button key={p} onClick={() => navigate(p)} title={p}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${page === p ? "bg-[#E8B800] shadow-[0_0_8px_rgba(232,184,0,0.8)]" : "bg-white/15 hover:bg-white/40"}`} />
          ))}
        </div>
      </div>
    </HelmetProvider>
  );
}
