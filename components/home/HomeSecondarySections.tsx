"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import {
  Wrench,
  Zap,
  Shield,
  Award,
  Star,
  Send,
  Play,
  Users,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Flame,
  Smartphone,
  Gamepad2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, staggerContainer, itemVariants } from "@/lib/home-animations"

gsap.registerPlugin(ScrollTrigger)

// Every homepage section after Featured Products: issues, process timeline,
// about, why-choose-us, trade-in, testimonials, contact, and newsletter.
export function HomeSecondarySections() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!timelineRef.current) return

    const items = timelineRef.current.querySelectorAll(".timeline-item")
    gsap.from(items, {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    })
  }, [])

  return (
    <>
      {/* ISSUES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <span className="text-accent font-bold text-sm uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-full inline-block mb-4">
              Common Issues
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">
              Gaming Laptop <span className="text-accent">Overheating?</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl">
              We fix the most common gaming device issues with precision and expertise
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "Thermal Issues", desc: "2800+ cooling system repairs", icon: Flame },
              { title: "Performance Drop", desc: "3200+ GPU/CPU optimizations", icon: Zap },
              { title: "Hardware Damage", desc: "Screen & motherboard repairs", icon: Wrench },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, translateY: -8 }}
                  className="bg-gradient-to-br from-slate-light to-white rounded-2xl p-8 border-2 border-border hover:border-accent/50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-2xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section ref={timelineRef} className="py-24 bg-gradient-to-b from-slate-light to-white">
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
              Process
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">Repair Process</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Quick, transparent, and reliable gaming device repairs
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: "1", title: "Drop Off & Diagnostics", desc: "Free professional analysis", icon: Play },
              { step: "2", title: "Repair Quote", desc: "Transparent pricing breakdown", icon: Award },
              { step: "3", title: "Expert Repair", desc: "Fix in 24-48 hours", icon: Wrench },
              { step: "4", title: "Quality Testing", desc: "Full performance verification", icon: Shield },
              { step: "5", title: "Ready to Game", desc: "2-year warranty included", icon: Gamepad2 },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  className="timeline-item flex gap-8 items-start group"
                  whileInView={{ x: [idx % 2 === 0 ? -40 : 40, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="flex-shrink-0 relative">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    {idx < 4 && (
                      <div className="absolute top-16 left-8 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                    )}
                  </div>
                  <motion.div
                    className="flex-1 pt-2 bg-white rounded-xl p-6 shadow-md group-hover:shadow-lg transition-all border border-border group-hover:border-primary/30"
                    whileHover={{ translateX: 8 }}
                  >
                    <p className="text-accent font-bold text-sm uppercase">Step {item.step}</p>
                    <h3 className="text-2xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-foreground/70">{item.desc}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ABOUT TEAM SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-accent font-bold text-sm uppercase tracking-widest bg-accent/10 px-4 py-2 rounded-full inline-block">
                About Us
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-primary">Meet The Team</h2>
            </div>

            <p className="text-lg text-foreground/70 leading-relaxed">
              Al Dana Gaming brings together certified technicians with 10+ years of expertise in gaming device
              repairs and optimization. Our passion for gaming drives our commitment to excellence.
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { icon: Users, value: "50+", label: "Expert Team" },
                { icon: TrendingUp, value: "15 Yrs", label: "Industry Exp" },
                { icon: Award, value: "99.8%", label: "Satisfaction" },
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-gradient-to-br from-slate-light to-white rounded-xl p-4 text-center border border-border hover:border-primary/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Icon className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="font-bold text-primary text-lg">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-3xl blur-3xl opacity-20" />
            <div className="relative bg-gradient-to-br from-slate-light to-white rounded-3xl p-12 shadow-2xl border border-border">
              <Briefcase className="w-24 h-24 text-accent mx-auto mb-8 opacity-80" />
              <p className="text-center text-foreground/70 text-lg leading-relaxed">
                Every gaming device is handled with precision using state-of-the-art equipment and industry best
                practices. Your gaming setup deserves nothing but excellence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-24 bg-gradient-to-b from-slate-light to-white">
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
              Benefits
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">Why Choose Us</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Gamepad2, title: "Gaming Focused", desc: "Only gaming devices" },
              { icon: Zap, title: "Fast Service", desc: "24-48 hour turnaround" },
              { icon: Award, title: "2-Year Warranty", desc: "All repairs covered" },
              { icon: Shield, title: "Genuine Parts", desc: "Certified & authentic" },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.05 }}
                  className={`bg-gradient-to-br ${["from-accent/10 to-orange-500/10", "from-secondary/10 to-primary/10", "from-cyan-accent/10 to-secondary/10", "from-primary/10 to-accent/10"][idx]} border-2 border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300`}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${["from-accent to-orange-500", "from-secondary to-primary", "from-cyan-accent to-secondary", "from-primary to-accent"][idx]} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* TRADE-IN SECTION */}
      <section className="py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
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
              Upgrade Program
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">Trade-In Your Old Device</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Get top value for your old gaming device and upgrade to cutting-edge systems
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { icon: TrendingUp, title: "Fair Valuation", desc: "Instant expert quotes" },
              { icon: Zap, title: "Quick Process", desc: "30-minute turnaround" },
              { icon: Award, title: "Best Prices", desc: "Competitive rates" },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`bg-gradient-to-br ${["from-accent/20 to-orange-500/20", "from-secondary/20 to-primary/20", "from-cyan-accent/20 to-secondary/20"][idx]} border-2 border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-all`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${["from-accent to-orange-500", "from-secondary to-primary", "from-cyan-accent to-secondary"][idx]} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <Button
              render={<Link href="/trade-in" />}
              className="bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-600 text-white px-8 py-3 font-semibold text-lg shadow-lg"
            >
              Get Trade-In Quote <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              render={<Link href="/repair-booking" />}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-3 font-semibold text-lg"
            >
              Book a Repair
            </Button>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 bg-white">
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
              Reviews
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6">What Gamers Say</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { name: "Ahmed Al Mazrouei", role: "Pro Gamer", text: "Fixed my RTX 4090 issue in 24 hours!" },
              { name: "Fatima Mohammed", role: "Content Creator", text: "Best service in Abu Dhabi. Highly recommended!" },
              { name: "Hassan Al Mansoori", role: "Student", text: "Affordable pricing and excellent quality." },
              { name: "Layla Al Kaabi", role: "Esports Enthusiast", text: "Professional diagnostics, transparent pricing!" },
              { name: "Muhammad Khan", role: "Gamer", text: "Quick turnaround, PC runs better than before!" },
              { name: "Sarah Johnson", role: "Tech Blogger", text: "Exceptional service and quality work!" },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -4 }}
                className="bg-gradient-to-br from-slate-light to-white rounded-2xl p-8 border-2 border-border hover:border-accent/50 transition-all shadow-md hover:shadow-lg"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                  className="flex gap-1 mb-4"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </motion.div>
                <p className="text-foreground mb-6 leading-relaxed">&quot;{review.text}&quot;</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-r from-primary via-secondary to-accent text-white relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-8"
          >
            <h2 className="text-6xl md:text-7xl font-bold">Ready to Level Up?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Whether you need repairs, upgrades, or a new gaming system, we&apos;re here to help
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 justify-center pt-8"
            >
              <Button
                render={<Link href="/repair-booking" />}
                className="bg-white text-primary hover:bg-slate-light px-10 py-4 text-lg font-semibold shadow-xl"
              >
                Book Repair <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                render={<Link href="/trade-in" />}
                className="bg-accent hover:bg-accent/90 text-white px-10 py-4 text-lg font-semibold shadow-xl"
              >
                Trade-In <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                render={<Link href="/shop" />}
                className="bg-secondary hover:bg-secondary/90 text-white px-10 py-4 text-lg font-semibold shadow-xl"
              >
                Shop Systems <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Contact Al Dana Gaming</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Have questions? Our gaming specialists are here to help
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { icon: Smartphone, title: "Phone", detail: "+971 50 123 4567" },
              { icon: Send, title: "Email", detail: "info@aldanagaming.ae" },
              { icon: Briefcase, title: "Location", detail: "Abu Dhabi, UAE" },
            ].map((contact, idx) => {
              const Icon = contact.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                  <p className="opacity-90">{contact.detail}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-light">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl font-bold text-primary mb-4"
          >
            Stay Gaming
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg text-foreground/70 mb-8"
          >
            Get exclusive gaming tips, new products, and special repair offers
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex gap-2 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 rounded-full border-2 border-primary text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg"
            >
              <Send className="w-5 h-5" />
            </Button>
          </motion.form>

          <p className="text-sm text-muted-foreground mt-4">Gaming updates only. No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  )
}
