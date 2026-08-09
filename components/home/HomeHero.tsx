"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ChevronDown, Laptop, Gamepad2, Wrench, Zap, ArrowRight, Cpu, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer, itemVariants } from "@/lib/home-animations"

gsap.registerPlugin(ScrollTrigger)

// Hero + services sections of the homepage. Split out from the page so the
// page itself can stay a Server Component and render the real, database-backed
// FeaturedProductsSection alongside these animated client sections.
export function HomeHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const circles = heroRef.current.querySelectorAll(".float-circle")
    circles.forEach((circle, index) => {
      gsap.to(circle, {
        y: Math.sin(index) * 80,
        x: Math.cos(index) * 80,
        duration: 8 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    gsap.to(heroRef.current.querySelectorAll(".parallax-element"), {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 200,
    })
  }, [])

  const scrollToSection = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <>
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-primary/8 via-white to-secondary/5 overflow-hidden flex items-center justify-center pt-20"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="float-circle parallax-element absolute top-10 right-20 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="float-circle parallax-element absolute bottom-0 left-10 w-80 h-80 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          />
          <motion.div
            className="float-circle absolute top-1/2 left-1/3 w-60 h-60 bg-gradient-to-br from-cyan-accent/10 to-transparent rounded-full blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="text-accent font-bold text-sm uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-full">
                  Gaming Excellence
                </span>
              </motion.div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary leading-tight">
                Gaming
                <br />
                <span className="relative">
                  <span className="text-secondary">Laptop</span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent to-cyan-accent rounded-full"></span>
                </span>
                <br />
                & PC Experts
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xl text-foreground/70 max-w-lg leading-relaxed">
              Expert repairs, performance upgrades, and cutting-edge gaming systems. Trade in your old device and
              level up with Al Dana Gaming.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Button
                render={<Link href="/repair-booking" />}
                className="bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Book a Repair <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                render={<Link href="/shop" />}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg font-semibold"
              >
                Shop New Systems
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-8">
              {[
                { value: "5000+", label: "Happy Gamers" },
                { value: "24-48h", label: "Quick Fixes" },
                { value: "2 Yrs", label: "Warranty" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-full flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            <div className="relative w-full max-w-md">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-cyan-accent rounded-3xl blur-2xl opacity-30"
              />

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="relative bg-gradient-to-br from-white to-slate-light rounded-3xl p-8 shadow-2xl border-2 border-white/50"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-primary">Gaming PC</h3>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Cpu className="w-8 h-8 text-accent" />
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    {["GPU", "CPU", "RAM"].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: i * 0.2, duration: 0.8 }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-semibold text-foreground">{item}</span>
                          <span className="text-sm text-accent font-bold">100%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${i === 0 ? "bg-gradient-to-r from-accent to-orange-500" : i === 1 ? "bg-gradient-to-r from-secondary to-primary" : "bg-gradient-to-r from-cyan-accent to-secondary"}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ delay: i * 0.2 + 0.3, duration: 1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    animate={{ boxShadow: ["0 0 0 0 rgba(255, 107, 53, 0.7)", "0 0 0 10px rgba(255, 107, 53, 0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 text-accent font-semibold"
                  >
                    <Flame className="w-5 h-5" />
                    Peak Performance Ready
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          onClick={scrollToSection}
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-gradient-to-b from-white via-slate-light to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <span className="text-accent font-bold text-sm uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-full inline-block mb-4">
              Our Expertise
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">Gaming Device Specialists</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Specialized repairs and upgrades for gaming laptops and high-performance PCs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Laptop, label: "Gaming Laptops", color: "from-secondary to-primary" },
              { icon: Gamepad2, label: "Gaming PCs", color: "from-accent to-orange-500" },
              { icon: Zap, label: "Performance Upgrades", color: "from-cyan-accent to-secondary" },
              { icon: Wrench, label: "Component Repair", color: "from-primary to-cyan-accent" },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.08 }}
                  className={`bg-gradient-to-br ${item.color} p-0.5 rounded-2xl group cursor-pointer`}
                >
                  <div className="bg-white rounded-2xl p-8 text-center h-full transition-all duration-300 group-hover:bg-slate-light">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-bold text-foreground text-lg">{item.label}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}
