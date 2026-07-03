"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function PatternTile({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      className={`absolute rounded-sm overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className="w-full h-full"
        style={{
          background: `
            conic-gradient(from 45deg at 50% 50%,
              #1c1b0b 0deg 90deg,
              #e8dfd6 90deg 180deg,
              #2a1407 180deg 270deg,
              #f5ede4 270deg 360deg
            )
          `,
        }}
      />
    </motion.div>
  );
}

export default function NotFoundContent() {
  const router = useRouter();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FCF8F5]">
      {/* Woven grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(28, 27, 11, 0.04) 39px,
              rgba(28, 27, 11, 0.04) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 39px,
              rgba(28, 27, 11, 0.04) 39px,
              rgba(28, 27, 11, 0.04) 40px
            )
          `,
        }}
        aria-hidden
      />

      {/* Diagonal thread lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              135deg,
              transparent,
              transparent 18px,
              rgba(42, 20, 7, 0.06) 18px,
              rgba(42, 20, 7, 0.06) 19px
            )
          `,
        }}
        aria-hidden
      />

      {/* Floating pattern accents */}
      <PatternTile
        className="w-16 h-16 md:w-24 md:h-24 top-[12%] left-[8%] rotate-12 opacity-20"
        delay={0.3}
      />
      <PatternTile
        className="w-20 h-20 md:w-28 md:h-28 bottom-[18%] right-[10%] -rotate-6 opacity-15"
        delay={0.5}
      />
      <PatternTile
        className="w-12 h-12 md:w-16 md:h-16 top-[20%] right-[15%] rotate-45 opacity-10 hidden md:block"
        delay={0.7}
      />
      <PatternTile
        className="w-14 h-14 md:w-20 md:h-20 bottom-[25%] left-[12%] -rotate-12 opacity-10 hidden md:block"
        delay={0.9}
      />

      {/* Soft vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#FCF8F5_75%)]"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-satoshi text-xs md:text-sm uppercase tracking-[0.35em] text-[#2A1407]/70 mb-6"
        >
          Pattern not found
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="relative mb-8 md:mb-10"
        >
          <h1
            className="font-rose font-extralight text-[120px] md:text-[200px] leading-none tracking-tight text-[#1c1b0b] select-none"
            aria-label="404"
          >
            404
          </h1>
          <div
            className="absolute inset-0 font-rose font-extralight text-[120px] md:text-[200px] leading-none tracking-tight text-transparent pointer-events-none select-none"
            style={{ WebkitTextStroke: "1px rgba(42, 20, 7, 0.15)" }}
            aria-hidden
          >
            404
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="font-rose text-[28px] md:text-[42px] font-light leading-tight text-[#230D06] mb-4"
        >
          This thread has come unraveled
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="font-satoshi text-sm md:text-base text-[#4E5157] max-w-md mx-auto leading-relaxed mb-10 md:mb-12"
        >
          The page you&apos;re looking for isn&apos;t in our collection. It may
          have been moved, renamed, or never existed — but there&apos;s plenty
          more to explore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Button
            onClick={() => router.push("/")}
            className="relative overflow-hidden border px-8 font-satoshi text-sm
              bg-black border-black text-white hover:text-white rounded-none py-3
              transition-all duration-300 group w-full sm:w-auto min-w-[180px]"
          >
            <span className="relative z-10 flex items-center justify-center">
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </span>
            <span className="absolute inset-0 bg-[#2A1407] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Button>

          <Button
            onClick={() => router.push("/shop")}
            className="relative overflow-hidden border px-8 font-satoshi text-sm
              bg-white border-black text-black hover:text-white rounded-none py-3
              transition-all duration-300 group w-full sm:w-auto min-w-[180px]"
          >
            <span className="relative z-10 flex items-center justify-center">
              Browse the Shop
              <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </span>
            <span className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Button>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          aria-label="Quick links"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-satoshi text-sm text-[#4E5157] hover:text-[#1c1b0b] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#1c1b0b] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
