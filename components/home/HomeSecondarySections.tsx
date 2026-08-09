"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Zap,
  MonitorSmartphone,
  Cpu,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock4,
  ShoppingCart,
  Gamepad2,
  ChevronDown,
  MessageSquare,
  Quote,
} from "lucide-react";

// --- DATA STRUCTURES ---
const heroSlides = [
  {
    eyebrow: "GAMING PC SPECIALISTS",
    heading: "Expert Gaming PC Repairs. Built to Perform.",
    content:
      "From hardware faults and overheating to upgrades and performance issues, our technicians diagnose and repair your gaming PC with care.",
    buttons: [
      { text: "Book a Repair", link: "/repair", primary: true },
      { text: "View Services", link: "/repair", primary: false },
    ],
    highlights: ["Expert Technicians", "Quality Parts", "Repair Warranty"],
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215929/pc1_uax7vw.png",
  },
  {
    eyebrow: "GAMING LAPTOP REPAIR",
    heading: "Get Your Gaming Laptop Back in Action.",
    content:
      "Professional repairs for gaming laptops, including display, battery, charging, overheating, motherboard, keyboard and performance issues.",
    buttons: [
      { text: "Book a Repair", link: "/repair", primary: true },
      { text: "Track Repair", link: "/contact", primary: false },
    ],
    highlights: [
      "Fast Diagnostics",
      "Professional Service",
      "Quality Replacement Parts",
    ],
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215936/lp1_zen7mw.png",
  },
  {
    eyebrow: "UPGRADE YOUR SETUP",
    heading: "Power Up Your Gaming Experience.",
    content:
      "Shop gaming PCs, laptops, components, peripherals and accessories to build or upgrade your ultimate gaming setup.",
    buttons: [
      { text: "Shop Products", link: "/shop", primary: true },
      { text: "Explore Gaming", link: "/shop", primary: false },
    ],
    highlights: ["Gaming PCs", "Gaming Laptops", "Accessories"],
    image:
      "https://res.cloudinary.com/dvu9vmcqd/image/upload/v1786215923/key-m_zhfofl.png",
  },
];

const brands = [
  "ASUS ROG",
  "Alienware",
  "MSI",
  "Razer",
  "Corsair",
  "Logitech G",
  "HyperX",
  "Gigabyte",
  "Intel",
  "AMD Ryzen",
  "NVIDIA",
];

const services = [
  {
    title: "Gaming PC Repair",
    desc: "Diagnostics, hardware faults, upgrades, overheating and performance issues.",
    icon: <Cpu className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "Gaming Laptop",
    desc: "Screen, battery, charging, keyboard, cooling and hardware repairs.",
    icon: <MonitorSmartphone className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "PC & Laptop",
    desc: "Hardware, software, Windows, storage, RAM and general troubleshooting.",
    icon: <Wrench className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "GPU Repair",
    desc: "Graphics card diagnostics, cooling and performance-related issues.",
    icon: <Zap className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "Console Repair",
    desc: "Gaming console diagnostics, hardware and software services.",
    icon: <Gamepad2 className="w-7 h-7 text-violet-600" />,
  },
  {
    title: "Maintenance",
    desc: "Deep cleaning, thermal paste replacement and performance maintenance.",
    icon: <CheckCircle2 className="w-7 h-7 text-violet-600" />,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Book Repair",
    desc: "Tell us about your device and the issue online or in-store.",
  },
  {
    step: "02",
    title: "Diagnosis",
    desc: "Our technicians run deep diagnostics to pinpoint the exact fault.",
  },
  {
    step: "03",
    title: "Approval",
    desc: "We provide a transparent quote and proceed only with your approval.",
  },
  {
    step: "04",
    title: "Fix & Test",
    desc: "Professional repair followed by rigorous stress testing.",
  },
  {
    step: "05",
    title: "Collection",
    desc: "Pick up your fully functional device, backed by our warranty.",
  },
];

const faqs = [
  {
    q: "How long does a typical gaming PC repair take?",
    a: "Most standard repairs and upgrades are completed within 24-48 hours. Complex motherboard or GPU component repairs might take 3-5 days depending on parts availability.",
  },
  {
    q: "Do you offer a warranty on your repairs?",
    a: "Yes, we offer a 90-day warranty on all repairs and replacement parts. If the same issue occurs within this period, we fix it free of charge.",
  },
  {
    q: "How does the Buy-Back program work?",
    a: "Simply bring your old device to our store or fill out the form online. We'll evaluate its condition and specifications, and offer you instant store credit or cash.",
  },
  {
    q: "Do you use original replacement parts?",
    a: "Absolutely. We source high-quality, original (OEM) or premium aftermarket parts designed specifically for high-performance gaming hardware.",
  },
];

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export function HomeSecondarySections() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-violet-600 selection:text-white">
      {/* 1. HERO SECTION */}
      {/* <section className="relative w-full min-h-[90vh] flex items-center bg-white overflow-hidden">
        <div
          className="absolute top-0 right-0 h-full w-[60%] lg:w-[50%] bg-gradient-to-bl from-violet-600 to-violet-800 z-0 origin-top-right transition-all duration-700 hidden md:block"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-violet-50 md:hidden z-0" />

        <div className="container mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center h-full relative z-10 py-24 md:py-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-w-xl z-10 text-center md:text-left"
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-violet-100 text-violet-700 font-bold tracking-wider text-xs uppercase mb-6 shadow-sm">
                {heroSlides[currentSlide].eyebrow}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] text-slate-900 mb-6 tracking-tight">
                {heroSlides[currentSlide].heading}
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
                {heroSlides[currentSlide].content}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 justify-center md:justify-start">
                <Link href={heroSlides[currentSlide].buttons[0].link}>
                  <button className="w-full sm:w-auto bg-violet-700 hover:bg-violet-800 text-white px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-violet-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                    {heroSlides[currentSlide].buttons[0].text}
                  </button>
                </Link>
                <Link href={heroSlides[currentSlide].buttons[1].link}>
                  <button className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 border-2 border-slate-200 transform hover:-translate-y-1 shadow-sm">
                    {heroSlides[currentSlide].buttons[1].text}{" "}
                    <ArrowRight className="w-5 h-5 text-violet-600" />
                  </button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-3 items-center justify-center md:justify-start text-sm font-bold text-slate-700">
                {heroSlides[currentSlide].highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-slate-50 md:bg-transparent px-3 py-1 md:p-0 rounded-full"
                  >
                    <CheckCircle2 className="w-5 h-5 text-violet-600" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative h-[300px] md:h-[500px] lg:h-[650px] w-full flex items-center justify-center drop-shadow-2xl z-10"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt="Gaming Device"
                className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 md:left-12 -translate-x-1/2 md:translate-x-0 flex gap-3 z-20">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? "bg-violet-700 w-10" : "bg-slate-300 md:bg-slate-300/50 w-3 hover:bg-violet-400"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-6 overflow-hidden border-y border-slate-800">
        <div className="flex w-[200%] md:w-max">
          <motion.div
            className="flex items-center gap-12 md:gap-24 px-6 md:px-12 w-1/2 justify-around"
            animate={{ x: [0, "-100%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...brands, ...brands].map((brand, idx) => (
              <span
                key={idx}
                className="text-slate-400 font-black text-xl md:text-2xl uppercase tracking-widest whitespace-nowrap opacity-50 hover:opacity-100 hover:text-white transition-opacity cursor-default"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="container mx-auto px-6 -mt-8 relative z-30">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 md:p-8 flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-between gap-6 md:gap-8 items-start md:items-center border border-slate-100"
        >
          <div className="w-full lg:w-auto text-slate-500 font-black uppercase tracking-widest text-xs">
            Why Customers Choose Us
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-50 rounded-xl">
              <Clock className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900">Fast Turnaround</h4>
              <p className="text-sm text-slate-500 font-medium">
                Get your device back sooner
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-50 rounded-xl">
              <Wrench className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900">
                Expert Technicians
              </h4>
              <p className="text-sm text-slate-500 font-medium">
                Skilled hardware specialists
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-50 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900">Quality Parts</h4>
              <p className="text-sm text-slate-500 font-medium">
                Reliable replacement components
              </p>
            </div>
          </div>
        </motion.div>
      </section> */}



      {/* 4. OUR REPAIR SERVICES */}
      <section className="py-24 md:py-32 container mx-auto px-6 lg:px-12 bg-slate-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-black font-extrabold tracking-widest text-sm uppercase bg-black/5 px-4 py-1.5 rounded-full border border-black/10">
            OUR SERVICES
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-black mt-6 mb-6">
            What We Repair
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            Professional repair and upgrade services for gaming systems, laptops
            and electronics.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, idx) => (
            <Link href="/repair" key={idx} className="group block h-full">
              <motion.div
                variants={fadeUp}
                className="bg-violet-700 p-8 md:p-10 rounded-[2rem] shadow-xl border border-violet-600 hover:shadow-2xl hover:shadow-violet-600/40 transition-all duration-300 h-full flex flex-col items-start transform hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Modern glass decorative element */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 backdrop-blur-2xl rounded-bl-full -z-10 group-hover:scale-125 transition-transform duration-700"></div>

                {/* High-contrast black/white icon container */}
                <div className="w-16 h-16 bg-black shadow-lg border border-black rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white text-white group-hover:text-black transition-colors duration-300 z-10">
                  {React.cloneElement(service.icon, {
                    className: "w-8 h-8 transition-colors",
                  })}
                </div>

                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-violet-100 leading-relaxed font-medium mb-8 flex-grow">
                  {service.desc}
                </p>

                {/* Upgraded black/white button inside the card */}
                <span className="bg-black text-white font-bold flex items-center gap-2 group-hover:gap-4 transition-all mt-auto px-6 py-3 rounded-full group-hover:bg-white group-hover:text-black border border-transparent">
                  Learn More <ArrowRight className="w-5 h-5" />
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Link href="/repair">
            <button className="bg-black border-2 border-black text-white font-black px-10 py-4 rounded-full hover:bg-violet-700 hover:border-violet-700 transition-all inline-flex items-center gap-3 shadow-lg">
              View All Repair Services <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>


      
      {/* 5. HOW OUR REPAIR PROCESS WORKS (Clean & Modern) */}
      <section className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
        {/* Subtle Tech Grid Background (Replacing the noisy dot pattern) */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 10%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, #000 10%, transparent 100%)",
          }}
        ></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-24 md:mb-32"
          >
            <span className="inline-block text-violet-400 font-bold tracking-widest text-sm uppercase bg-violet-700/10 px-5 py-2 rounded-full border border-violet-700/30 mb-6">
              How It Works
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
              Simple. Transparent. Reliable.
            </h2>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Desktop Connecting Line (Perfectly centered on the 80px circles using top-10) */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-slate-800 z-0"></div>

            <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 relative">
              {/* Mobile Vertical Line (Perfectly centered on the 80px circles using left-10) */}
              <div className="lg:hidden absolute top-[5%] bottom-[5%] left-10 w-[2px] bg-slate-800 z-0"></div>

              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative z-10 flex lg:flex-col items-start lg:items-center text-left lg:text-center w-full lg:flex-1 group"
                >
                  {/* Step Circle Indicator */}
                  <div className="w-20 h-20 bg-slate-950 border-2 border-slate-700 rounded-full flex items-center justify-center text-2xl font-bold text-slate-400 group-hover:bg-violet-700 group-hover:border-violet-700 group-hover:text-white transition-all duration-300 flex-shrink-0 z-10 relative shadow-lg group-hover:shadow-[0_0_40px_-10px_rgba(109,40,217,0.7)]">
                    {step.step}
                  </div>

                  {/* Step Content */}
                  <div className="ml-8 lg:ml-0 lg:mt-10 pt-2 lg:pt-0">
                    <h4 className="font-bold text-xl md:text-2xl mb-4 text-white group-hover:text-violet-300 transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed max-w-xs mx-auto lg:max-w-none">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 6. GAMING SPECIALIST SECTION */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[650px] rounded-[3rem] overflow-hidden group shadow-2xl border-4 border-slate-50"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-pyfsrFJP67a87KOWuoISpfeiP5kFstVJJe-5JgADZA&s=10"
              alt="Specialist Setup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="text-violet-600 font-extrabold tracking-widest text-sm uppercase bg-violet-100 px-4 py-1.5 rounded-full">
              GAMING SPECIALISTS
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-6 mb-6 leading-tight">
              We Keep Your Gaming Setup Running at Its Best.
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
              Whether your gaming PC is overheating, your laptop is slowing
              down, or you're looking for a massive performance upgrade, Al Dana
              Gaming provides professional solutions to get you back to the
              lobby, faster.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 mb-12">
              {[
                "Performance upgrades",
                "Thermal paste replacement",
                "RAM & SSD upgrades",
                "Cooling solutions",
                "GPU upgrades",
                "Windows & software setup",
                "CPU upgrades",
                "Gaming PC maintenance",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-slate-800 font-bold"
                >
                  <div className="bg-violet-100 p-1.5 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-violet-700 flex-shrink-0" />
                  </div>{" "}
                  {item}
                </div>
              ))}
            </div>
            <Link href="/about">
              <button className="bg-slate-900 hover:bg-violet-700 text-white px-10 py-4 rounded-full font-black transition-all shadow-xl hover:shadow-violet-700/30 inline-flex items-center gap-3 transform hover:-translate-y-1">
                Learn More About Us <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* 7. BUY BACK SECTION */}
      <section className="py-12 container mx-auto px-6 lg:px-12">
        <div className="bg-gradient-to-br from-violet-800 via-violet-900 to-slate-900 rounded-[3rem] p-8 md:p-12 lg:p-20 relative overflow-hidden shadow-2xl border border-slate-700/50">
          {/* Decorative shapes */}
          <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-violet-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
          <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
            {/* Left Content Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="max-w-2xl"
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md text-white font-extrabold tracking-widest text-xs uppercase mb-6 border border-white/20 shadow-sm">
                SELL OR TRADE
              </span>

              {/* Explicit text-white added for visibility */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-2 mb-6 leading-tight text-white drop-shadow-md">
                Turn Your Old Gaming Device Into Value.
              </h2>

              {/* Explicit text-violet-100 for high-contrast readability */}
              <p className="text-violet-50 text-lg md:text-xl mb-10 font-medium max-w-xl leading-relaxed opacity-90">
                Have a gaming PC, laptop or electronic device you're no longer
                using? Get it evaluated and receive a competitive buy-back offer
                instantly.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4 mb-10">
                {[
                  "Gaming PCs",
                  "Gaming Laptops",
                  "Standard Laptops",
                  "Mobile Phones",
                  "Gaming Consoles",
                ].map((cat, idx) => (
                  <span
                    key={idx}
                    // Explicit text-white added to mapping elements
                    className="bg-white/10 backdrop-blur-md border border-white/20 px-4 md:px-5 py-2.5 rounded-full text-sm font-bold shadow-sm text-white transition-colors hover:bg-white/20 cursor-default"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <Link href="/buy-back">
                <button className="bg-white text-violet-950 hover:bg-slate-100 px-8 md:px-10 py-4 md:py-5 rounded-full font-black transition-all shadow-xl hover:shadow-white/25 text-lg inline-flex items-center gap-3 transform hover:-translate-y-1 w-full sm:w-auto justify-center">
                  Get a Buy Back Quote{" "}
                  <ArrowRight className="w-5 h-5 text-violet-700" />
                </button>
              </Link>
            </motion.div>

            {/* Right Image Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative w-full h-full flex justify-center items-center min-h-[300px] lg:min-h-[450px]"
            >
              {/* Image Glow/Backdrop Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-white/5 rounded-full blur-3xl transform scale-75"></div>

              <img
                src="https://www.jouleperformance.com/media/.renditions/JoulePerformance/Categories/gamingpc/gamingpc-setup.png"
                alt="Trade in your gaming hardware"
                className="relative z-20 max-w-full max-h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* 8. SHOP PRODUCTS */}
      <section className="py-24 md:py-32 bg-slate-50 border-y border-slate-200/60">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          >
            <div>
              <span className="text-violet-600 font-extrabold tracking-widest text-sm uppercase bg-violet-100 px-4 py-1.5 rounded-full">
                SHOP GAMING
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-6">
                Upgrade Your Setup
              </h2>
            </div>
            <Link href="/shop">
              <button className="text-violet-700 font-black hover:text-violet-800 flex items-center gap-2 bg-white border-2 border-violet-100 hover:border-violet-300 px-6 py-3.5 rounded-full transition-all shadow-sm hover:shadow-md">
                View All Products <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-[2rem] p-6 hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col transform hover:-translate-y-1"
              >
                <div className="h-48 md:h-56 bg-slate-50 rounded-[1.5rem] mb-6 overflow-hidden relative flex items-center justify-center">
                  <img
                    src={`https://placehold.co/400x300/transparent/64748b?text=Product+${item}`}
                    alt="Product"
                    className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                  />
                  <div className="absolute top-4 left-4 bg-violet-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-md">
                    -15%
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  High-End RTX Graphics Card
                </h3>
                <p className="text-sm text-slate-500 font-medium mb-6">
                  16GB VRAM, DLSS 3.0
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-50">
                  <span className="font-black text-2xl text-slate-900">
                    AED 3,499
                  </span>
                  <Link href="/shop">
                    <button className="bg-slate-100 text-slate-900 p-3.5 rounded-xl hover:bg-violet-700 hover:text-white transition-colors shadow-sm">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      Featured
      {/* 9. TESTIMONIALS (New) */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-violet-600 font-extrabold tracking-widest text-sm uppercase bg-violet-100 px-4 py-1.5 rounded-full">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-6 mb-6">
              Trusted by Gamers in UAE
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: "Ahmed K.",
                role: "Esports Player",
                text: "My liquid cooler leaked and ruined my motherboard. Al Dana fixed it in 2 days and saved my GPU. Legends.",
              },
              {
                name: "Sarah M.",
                role: "Content Creator",
                text: "Traded in my old MSI laptop for a custom build. The buy-back price was fair, and the new PC runs Premiere Pro and Warzone flawlessly.",
              },
              {
                name: "Tariq R.",
                role: "Casual Gamer",
                text: "Fast, transparent, and fairly priced. They even cleaned up my cable management for free. Highly recommended repair shop.",
              },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-slate-100 relative"
              >
                <Quote className="w-10 h-10 text-violet-200 absolute top-8 right-8 rotate-180" />
                <div className="flex text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 font-medium mb-8 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-violet-200 rounded-full flex items-center justify-center text-violet-700 font-black text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">
                      {review.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 10. FAQ SECTION (New) */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-violet-600 font-extrabold tracking-widest text-sm uppercase bg-violet-100 px-4 py-1.5 rounded-full">
              FAQ
            </span>
            <h2 className="text-4xl font-black text-slate-900 mt-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                  }
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-lg text-slate-900 pr-8">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-violet-600 transition-transform duration-300 flex-shrink-0 ${openFaqIndex === idx ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-slate-600 font-medium leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 11. CONTACT / REPAIR REQUEST FORM */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row max-w-7xl mx-auto">
            {/* Left Info */}
            <div className="lg:w-2/5 bg-slate-900 text-white p-10 md:p-16 lg:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/30 rounded-full filter blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full filter blur-[80px]"></div>

              <h3 className="text-3xl md:text-4xl text-white mb-6 relative z-10 leading-tight">
                Need Help With Your Device?
              </h3>
              <p className="text-slate-400 mb-12 md:mb-16 text-lg relative z-10 font-medium">
                Tell us what's wrong with your gaming PC, laptop or other device
                and our team will get back to you quickly.
              </p>

              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-violet-600 transition-colors">
                    <MapPin className="w-6 h-6 text-violet-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">UAE Location</h5>
                    <p className="text-slate-400 font-medium">
                      Abu Dhabi, United Arab Emirates
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-violet-600 transition-colors">
                    <Phone className="w-6 h-6 text-violet-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Phone</h5>
                    <p className="text-slate-400 font-medium">
                      +971 50 123 4567
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-violet-600 transition-colors">
                    <Mail className="w-6 h-6 text-violet-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg">Email</h5>
                    <p className="text-slate-400 font-medium">
                      info@aldanagaming.ae
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:w-3/5 p-10 md:p-16 lg:p-20 bg-slate-50/50">
              <h3 className="text-3xl font-black text-slate-900 mb-10">
                Request a Service
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-900">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-900">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="+971 50 000 0000"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-900">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-900">
                    Device Type
                  </label>
                  <select className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium appearance-none shadow-sm cursor-pointer">
                    <option>Gaming PC</option>
                    <option>Gaming Laptop</option>
                    <option>Console</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-bold text-slate-900">
                    Brand / Model
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium shadow-sm"
                    placeholder="e.g. ASUS ROG Strix G15"
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-bold text-slate-900">
                    Describe the Problem
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10 transition-all font-medium resize-none shadow-sm"
                    placeholder="Tell us exactly what's happening..."
                  ></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-violet-700 hover:bg-violet-800 text-white font-black py-5 rounded-2xl transition-all shadow-xl hover:shadow-violet-600/30 text-lg transform hover:-translate-y-1 flex items-center justify-center gap-3"
                  >
                    Submit Service Request <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
