"use client"

import { useState, useEffect } from "react"
import {
  Scale,
  Users,
  Shield,
  Award,
  ChevronDown,
  Globe,
  Play,
  Star,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Zap,
  Heart,
  Target,
  BookOpen,
  MessageSquare,
  UserCheck,
  TrendingUp,
  FileText,
  Gavel,
  Building,
  Handshake,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react"
import { Link } from "react-router-dom"
import FAQSection from './FAQSection';

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা", flag: "🇮🇳" },
  { code: "gu", label: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", label: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "mr", label: "मराठी", flag: "🇮🇳" },
]

// Professional Navbar Component
const ProfessionalNavbar = ({
  language,
  setLanguage,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollY,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50
        ? `${darkMode ? "bg-black/90" : "bg-white/90"} backdrop-blur-md border-b ${darkMode ? "border-gray-800" : "border-gray-200"} shadow-lg`
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 ${darkMode ? "bg-white" : "bg-black"} rounded-lg flex items-center justify-center`}
            >
              <Scale className={`w-6 h-6 ${darkMode ? "text-black" : "text-white"}`} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>LawEase</h1>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Legal Solutions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { name: "Home", href: "#home" },
              { name: "Services", href: "#services" },
              { name: "Lawyers", href: "#lawyers" },
              { name: "About", href: "#about" },
              { name: 'FAQ', href: '#faq' }, // <- New section
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
                  }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language Selector */}
            <div className="relative group">
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-black"
                  }`}
              >
                <Globe className="w-4 h-4" />
                <span>{LANGUAGES.find((l) => l.code === language)?.label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* CTA Button */}
            <Link
              to="/login"
              className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${darkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                }`}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-black"
                }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function ProfessionalLawEaseLanding() {
  const [language, setLanguage] = useState("en")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const heroContent = [
    {
      title: "Legal Solutions Made Simple",
      subtitle: "India's Most Trusted Legal Platform",
      description:
        "Connect with expert lawyers, get instant legal advice, and resolve disputes efficiently. From property matters to family law, we've got you covered with affordable, accessible legal services in your language.",
      cta: "Get Free Legal Consultation",
      secondaryCta: "Watch How It Works",
      image: "/placeholder.svg?height=600&width=800",
      stats: { cases: "25,000+", lawyers: "1,200+", satisfaction: "99.2%" },
    },
    {
      title: "Empowering Rural India",
      subtitle: "Justice Without Barriers",
      description:
        "Breaking down geographical and language barriers to legal services. Our platform connects farmers, small business owners, and families with qualified lawyers who understand local customs and laws.",
      cta: "Find Your Lawyer",
      secondaryCta: "Explore Services",
      image: "/placeholder.svg?height=600&width=800",
      stats: { villages: "3,500+", languages: "12+", experience: "15 Years" },
    },
    {
      title: "AI-Powered Legal Intelligence",
      subtitle: "Smart Solutions, Better Outcomes",
      description:
        "Our advanced AI analyzes your case, matches you with the right lawyer, and predicts case outcomes. Get personalized legal strategies backed by data from thousands of successful cases.",
      cta: "Try AI Legal Assistant",
      secondaryCta: "See Success Stories",
      image: "/placeholder.svg?height=600&width=800",
      stats: { accuracy: "96%", "time saved": "70%", "cost reduced": "60%" },
    },
  ]

  const services = [
    {
      icon: Building,
      title: "Property Law",
      description: "Land disputes, property registration, and real estate matters",
      cases: "8,500+",
    },
    {
      icon: Users,
      title: "Family Law",
      description: "Marriage, divorce, custody, and inheritance cases",
      cases: "6,200+",
    },
    {
      icon: Handshake,
      title: "Business Law",
      description: "Company registration, contracts, and commercial disputes",
      cases: "4,800+",
    },
    {
      icon: Gavel,
      title: "Criminal Law",
      description: "Criminal defense, bail applications, and legal representation",
      cases: "3,200+",
    },
    {
      icon: FileText,
      title: "Civil Law",
      description: "Civil disputes, consumer rights, and legal documentation",
      cases: "5,100+",
    },
    {
      icon: Shield,
      title: "Labor Law",
      description: "Employment disputes, worker rights, and labor contracts",
      cases: "2,900+",
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Haryana Farmer",
      text: "LawEase helped me resolve my 5-year land dispute in just 4 months. The lawyer spoke perfect Hindi and guided me through every step. I saved lakhs compared to city lawyers!",
      rating: 5,
      image: "/placeholder.svg?height=150&width=150",
      case: "Land Dispute Resolution",
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra Small Business Owner",
      text: "Starting my textile business seemed impossible with all the legal paperwork. LawEase made company registration so simple and affordable. Now my business is thriving!",
      rating: 5,
      image: "/placeholder.svg?height=150&width=150",
      case: "Business Registration",
    },
    {
      name: "Suresh Patel",
      location: "Gujarat Village Head",
      text: "Our entire village uses LawEase now. From property issues to government schemes, they provide clear guidance in Gujarati. It's like having a lawyer in our village!",
      rating: 5,
      image: "/placeholder.svg?height=150&width=150",
      case: "Community Legal Support",
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Instant Legal Advice",
      description:
        "Get immediate answers to your legal questions from qualified lawyers through our AI-powered chat system.",
      benefit: "24/7 availability",
    },
    {
      icon: Heart,
      title: "Affordable Pricing",
      description: "Legal services starting from ₹299. No hidden fees, transparent pricing for all income levels.",
      benefit: "70% cost reduction",
    },
    {
      icon: Target,
      title: "Expert Matching",
      description:
        "Our AI matches you with lawyers who specialize in your specific legal issue and speak your language.",
      benefit: "96% success rate",
    },
    {
      icon: BookOpen,
      title: "Legal Education",
      description: "Free legal literacy programs, webinars, and resources to help you understand your rights.",
      benefit: "500+ free resources",
    },
  ]

  const stats = [
    { icon: Users, number: "50,000+", label: "Happy Clients" },
    { icon: Scale, number: "25,000+", label: "Cases Resolved" },
    { icon: Award, number: "1,200+", label: "Expert Lawyers" },
    { icon: TrendingUp, number: "99.2%", label: "Success Rate" },
  ]

  useEffect(() => {
    setIsVisible(true)
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length)
    }, 8000)
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(slideInterval)
      clearInterval(featureInterval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const currentContent = heroContent[currentSlide]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
    >
      {/* Professional Navigation */}
      <ProfessionalNavbar
        language={language}
        setLanguage={setLanguage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollY={scrollY}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-40 lg:hidden ${darkMode ? "bg-black/95" : "bg-white/95"} backdrop-blur-md`}>
          <div className="flex flex-col justify-center items-center h-full gap-8">
            {[
              { name: "Home", href: "#home", icon: Scale },
              { name: "Services", href: "#services", icon: Shield },
              { name: "Find Lawyers", href: "#lawyers", icon: Users },
              { name: "About Us", href: "#about", icon: Award },
              { name: 'FAQ', href: '#faq', icon: BookOpen }, // <- New section
              { name: "Success Stories", href: "#testimonials", icon: Star },
              { name: "Contact", href: "#contact", icon: Phone },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 text-2xl font-semibold transition-colors duration-200 ${darkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-7 h-7" />
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-20 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
            {/* Left Content */}
            <div
              className={`space-y-8 lg:space-y-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
            >
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm lg:text-base font-medium border ${darkMode ? "bg-gray-900 border-gray-700 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
              >
                <Star className="w-5 h-5 fill-current" />
                <span>India's #1 Legal Platform</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Main Headlines */}
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                  <span className={darkMode ? "text-white" : "text-black"}>
                    {currentContent.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <br />
                  <span className={`${darkMode ? "text-gray-400" : "text-gray-600"} font-light`}>
                    {currentContent.title.split(" ").slice(2).join(" ")}
                  </span>
                </h1>

                <p
                  className={`text-xl lg:text-2xl xl:text-3xl font-medium leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  {currentContent.subtitle}
                </p>
              </div>

              {/* Description */}
              <p
                className={`text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-2xl ${darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                {currentContent.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  className={`group px-8 py-4 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 ${darkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                    }`}
                >
                  {currentContent.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/login"
                  className={`px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${darkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-8 py-4 border-2 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${darkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-900"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  Sign Up
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-6 lg:pt-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    100% Secure & Confidential
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    24/7 Support Available
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-purple-500" />
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Verified Lawyers Only
                  </span>
                </div>
              </div>

              {/* Dynamic Stats */}
              <div
                className={`grid grid-cols-3 gap-8 pt-8 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}
              >
                {Object.entries(currentContent.stats).map(([key, value]) => (
                  <div key={key} className="text-center group cursor-pointer">
                    <div
                      className={`text-3xl lg:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform ${darkMode ? "text-white" : "text-black"
                        }`}
                    >
                      {value}
                    </div>
                    <div
                      className={`text-sm lg:text-base capitalize font-medium ${darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
            >
              {/* Main Image Container */}
              <div className="relative">
                <div
                  className={`relative rounded-3xl p-3 border shadow-2xl ${darkMode ? "bg-gray-900/50 border-gray-700" : "bg-gray-50/50 border-gray-200"
                    } backdrop-blur-sm`}
                >
                  <img
                    src={currentContent.image || "/placeholder.svg"}
                    alt="Legal Services"
                    className="w-full h-96 lg:h-[600px] object-cover rounded-2xl"
                  />

                  {/* Video Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group ${darkMode ? "bg-white/90" : "bg-black/90"
                        }`}
                    >
                      <Play
                        className={`w-8 h-8 ml-1 group-hover:scale-110 transition-transform ${darkMode ? "text-black" : "text-white"
                          }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Floating Success Card */}
                <div
                  className={`absolute -top-8 -left-8 rounded-2xl p-6 shadow-2xl border animate-bounce max-w-xs ${darkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200"
                    } backdrop-blur-md`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>Case Won!</div>
                      <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>2 minutes ago</div>
                    </div>
                  </div>
                  <div className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                    Property dispute resolved successfully
                  </div>
                </div>

                {/* Floating Testimonial */}
                <div
                  className={`absolute -bottom-8 -right-8 rounded-2xl p-6 shadow-2xl border max-w-sm ${darkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200"
                    } backdrop-blur-md`}
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className={`text-sm mb-3 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    "{testimonials[currentSlide]?.text.substring(0, 80)}..."
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonials[currentSlide]?.image || "/placeholder.svg"}
                      alt={testimonials[currentSlide]?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
                    />
                    <div className="text-xs">
                      <div className={`font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                        {testimonials[currentSlide]?.name}
                      </div>
                      <div className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        {testimonials[currentSlide]?.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform ${darkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                >
                  <stat.icon className={`w-8 h-8 lg:w-10 lg:h-10 ${darkMode ? "text-white" : "text-black"}`} />
                </div>
                <div
                  className={`text-3xl lg:text-4xl font-bold mb-2 transition-colors ${darkMode ? "text-white group-hover:text-gray-300" : "text-black group-hover:text-gray-700"
                    }`}
                >
                  {stat.number}
                </div>
                <div className={`text-sm lg:text-base font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className={`text-4xl lg:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>
              Our <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Legal Services</span>
            </h2>
            <p className={`text-xl lg:text-2xl max-w-3xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Comprehensive legal solutions for individuals, families, and businesses across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group rounded-3xl p-8 border transition-all duration-300 hover:scale-105 ${darkMode
                  ? "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                  : "bg-gray-50/50 border-gray-200 hover:border-gray-300"
                  } backdrop-blur-sm`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${darkMode ? "bg-white" : "bg-black"
                    }`}
                >
                  <service.icon className={`w-8 h-8 ${darkMode ? "text-black" : "text-white"}`} />
                </div>
                <h3
                  className={`text-2xl font-bold mb-4 transition-colors ${darkMode ? "text-white group-hover:text-gray-300" : "text-black group-hover:text-gray-700"
                    }`}
                >
                  {service.title}
                </h3>
                <p className={`text-lg mb-6 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {service.cases} cases handled
                  </span>
                  <ChevronRight
                    className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <h2 className={`text-4xl lg:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>
                Why <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Choose LawEase</span>
              </h2>
              <p
                className={`text-xl lg:text-2xl mb-12 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                We're revolutionizing legal services in India with technology and human expertise
              </p>

              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${activeFeature === index
                      ? darkMode
                        ? "bg-gray-800/50 border-gray-600"
                        : "bg-gray-100/50 border-gray-300"
                      : darkMode
                        ? "bg-gray-900/30 hover:bg-gray-800/30 border-gray-800"
                        : "bg-gray-50/30 hover:bg-gray-100/30 border-gray-200"
                      }`}
                  >
                    <div className="flex items-start gap-6">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${activeFeature === index
                          ? darkMode
                            ? "bg-white"
                            : "bg-black"
                          : darkMode
                            ? "bg-gray-700"
                            : "bg-gray-200"
                          }`}
                      >
                        <feature.icon
                          className={`w-6 h-6 ${activeFeature === index
                            ? darkMode
                              ? "text-black"
                              : "text-white"
                            : darkMode
                              ? "text-gray-300"
                              : "text-gray-600"
                            }`}
                        />
                      </div>
                      <div>
                        <h3
                          className={`text-xl lg:text-2xl font-bold mb-2 ${activeFeature === index
                            ? darkMode
                              ? "text-white"
                              : "text-black"
                            : darkMode
                              ? "text-gray-300"
                              : "text-gray-700"
                            }`}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={`text-lg ${activeFeature === index
                            ? darkMode
                              ? "text-gray-300"
                              : "text-gray-600"
                            : darkMode
                              ? "text-gray-500"
                              : "text-gray-500"
                            }`}
                        >
                          {feature.description}
                        </p>
                        {activeFeature === index && (
                          <div
                            className={`mt-4 flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">{feature.benefit}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className={`relative rounded-3xl p-8 border shadow-2xl h-full ${darkMode ? "bg-gray-900/50 border-gray-700" : "bg-gray-50/50 border-gray-200"
                  } backdrop-blur-sm`}
              >
                <div className="aspect-w-16 aspect-h-9 w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=500&width=800"
                    alt="Legal Technology"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`absolute -bottom-6 -right-6 rounded-2xl p-6 shadow-2xl w-3/4 ${darkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${darkMode ? "bg-white" : "bg-black"
                        }`}
                    >
                      <Zap className={`w-6 h-6 ${darkMode ? "text-black" : "text-white"}`} />
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg ${darkMode ? "text-white" : "text-black"}`}>
                        AI Legal Assistant
                      </h4>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Instant case analysis & predictions
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute -top-6 -left-6 rounded-2xl p-6 shadow-2xl w-3/4 ${darkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200"
                    } backdrop-blur-md border`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? "bg-white" : "bg-black"
                        }`}
                    >
                      <MessageSquare className={`w-5 h-5 ${darkMode ? "text-black" : "text-white"}`} />
                    </div>
                    <div>
                      <h4 className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>Live Chat Support</h4>
                      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Connect instantly with lawyers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-20 lg:py-32 ${darkMode ? "bg-gray-900/30" : "bg-gray-50/30"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className={`text-4xl lg:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>
              Success <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Stories</span>
            </h2>
            <p className={`text-xl lg:text-2xl max-w-3xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Hear from our clients across India who found justice through LawEase
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group rounded-3xl p-8 border transition-all duration-300 ${darkMode
                  ? "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                  : "bg-white/50 border-gray-200 hover:border-gray-300"
                  } backdrop-blur-sm`}
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`text-lg mb-8 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  "{testimonial.text}"
                </p>
                <div
                  className={`flex items-center gap-4 border-t pt-6 ${darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                >
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                  />
                  <div>
                    <h4 className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>{testimonial.name}</h4>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{testimonial.location}</p>
                    <div className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                      {testimonial.case}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl p-8 lg:p-16 text-center ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <h2 className={`text-3xl lg:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>
              Ready to Resolve Your Legal Matter?
            </h2>
            <p
              className={`text-xl lg:text-2xl mb-10 max-w-3xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Get started with a free consultation from our legal experts today
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                className={`px-8 py-4 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 ${darkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                  }`}
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className={`px-8 py-4 border-2 font-semibold text-lg rounded-xl transition-all duration-300 flex items-center justify-center gap-3 ${darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <Phone className="w-6 h-6" />
                <span>Call Now: 1800-LAW-EASE</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
        <section id="faq" className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 lg:mb-20">
          <h2 className={`text-4xl lg:text-6xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>
            Frequently Asked <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Questions</span>
          </h2>
          <p className={`text-xl lg:text-2xl max-w-3xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Get answers to common questions about our legal services
          </p>
            </div>
            <FAQSection darkMode={darkMode} />
          </div>
        </section>

      <footer
        id="contact"
        className={`border-t pt-20 pb-12 ${darkMode ? "bg-gray-900/50 border-gray-800" : "bg-gray-50/50 border-gray-200"
          } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${darkMode ? "bg-white" : "bg-black"
                    }`}
                >
                  <Scale className={`w-7 h-7 ${darkMode ? "text-black" : "text-white"}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>LawEase</h1>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Legal Solutions Simplified
                  </p>
                </div>
              </div>
              <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                India's most trusted legal platform connecting people with expert lawyers across 12+ languages.
              </p>
              <div className="flex items-center gap-4">
                {["twitter", "facebook", "linkedin", "instagram"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
                      }`}
                  >
                    <span className="sr-only">{social}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Services</h3>
              <ul className="space-y-3">
                {["Property Law", "Family Law", "Business Law", "Criminal Law", "Civil Law", "Labor Law"].map(
                  (service) => (
                    <li key={service}>
                      <a
                        href="#"
                        className={`transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                          }`}
                      >
                        {service}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Blog", "Press", "Partners", "Success Stories"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                        }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Contact</h3>
              <ul className="space-y-4">
                <li className={`flex items-center gap-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <Phone className="w-5 h-5" />
                  <span>1800-LAW-EASE</span>
                </li>
                <li className={`flex items-center gap-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <Mail className="w-5 h-5" />
                  <span>help@lawease.in</span>
                </li>
                <li className={`flex items-center gap-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  <MapPin className="w-5 h-5" />
                  <span>Bangalore, India</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${darkMode ? "border-gray-800" : "border-gray-200"
              }`}
          >
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              © 2023 LawEase. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className={`text-sm transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`text-sm transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className={`text-sm transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
