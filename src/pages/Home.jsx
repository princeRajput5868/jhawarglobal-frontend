import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ─── FALLBACK DATA ────────────────────────────────────────────────────────────

const FALLBACK_BANNERS = [
  {
    id: 1,
    title: "Secure Your Tax Benefits While Securing Futures",
    subtitle: "Support children's education, health, and protection across India",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80",
    buttonText: "Donate Now",
    buttonLink: "/donate",
  },
  {
    id: 2,
    title: "Empowering Communities Through Education",
    subtitle: "Together we can ensure no child is left behind",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1400&q=80",
    buttonText: "Know More",
    buttonLink: "/education",
  },
  {
    id: 3,
    title: "Lifesaving Aid Reaching Remote Villages",
    subtitle: "Technology and compassion combined for greater impact",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1400&q=80",
    buttonText: "Read Now",
    buttonLink: "/blogs",
  },
  {
    id: 4,
    title: "Working With the Government to Drive Change",
    subtitle: "Partnerships that create lasting transformation for children",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&q=80",
    buttonText: "Learn More",
    buttonLink: "/government",
  },
];

const FALLBACK_FIELDS = [
  {
    id: 1,
    title: "Education",
    tagline: "SHIKSHA ki RAKSHA, BHAVISHYA ki RAKSHA!",
    description:
      "From early childhood to adolescence, quality education unlocks human potential. Jawahar Global Foundation champions the cause of India's underserved since its inception, aligning inclusive learning with national ethos. Safe classrooms, girls' participation, digital access — our interventions remove barriers spanning from urban slums to rural communities. Uplifting thousands of students, we have seeded future innovation and powered sustainable solutions.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    link: "/education",
  },
  {
    id: 2,
    title: "Health & Nutrition",
    tagline: "AROGYA ki RAKSHA, BHAVISHYA ki RAKSHA!",
    description:
      "Jawahar Global Foundation aims to guarantee healthcare and nutrition for children across India. Through awareness drives, health system strengthening, and tackling health issues, we empower underserved communities through key partnerships with Health Ministry and NITI Aayog to further access and support major schemes. Our on-ground collaboration backs initiatives like Poshan Abhiyan to sustainably better children's health.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    link: "/health",
  },
  {
    id: 3,
    title: "Resilience",
    tagline: "TANAAV SE RAKSHA, BHAVISHYA ki RAKSHA!",
    description:
      "With climate change and disasters disproportionately impacting children, Jawahar Global Foundation strives to build their resilience through community-centred adaptation — from strengthening local governance and schools to providing green livelihoods and building technologies like early warning systems for communities. Our digital inclusion initiatives enable rural areas for healthcare, education and more.",
    image: "https://images.unsplash.com/photo-1518817490741-1bf6d3f32abf?w=800&q=80",
    link: "/resilience",
  },
  {
    id: 4,
    title: "Livelihood",
    tagline: "POSHAN ki RAKSHA, BHAVISHYA RAKSHA!",
    description:
      "Despite progress, swathes of India's youth still confront poverty and economic challenges, lacking pathways of empowerment. Jawahar Global Foundation has championed ways to upskill women and girls and boost the incomes of vulnerable families from rural communities. Our programmes offer digital literacy, vocational training, and access to government schemes, supporting thousands towards self-reliance.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    link: "/livelihood",
  },
  {
    id: 5,
    title: "Child Protection",
    tagline: "SHOSHAN SE RAKSHA, BHAVISHYA ki RAKSHA!",
    description:
      "As front-runners to safeguarding India's children from exploitation, Jawahar Global Foundation tirelessly fights trafficking, child labour, early marriage and more. From cementing legislation to system reforms, our interventions span awareness drives, psychosocial support, online safety training and beyond. Our initiatives have eased thousands of at-risk youth through partnerships with national child protection bodies.",
    image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&q=80",
    link: "/protection",
  },
  {
    id: 6,
    title: "Humanitarian",
    tagline: "SAMAANTA KI RAKSHA, BHAVISHYA ki RAKSHA!",
    description:
      "Jawahar Global Foundation has tirelessly worked to aid communities across emergencies as early responders — being the first to reach and last to leave. From cyclones to floods, our response includes providing supplies, rebuilding efforts and creating child-friendly spaces — ensuring education, protection and care with children at the centre of all our response work.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    link: "/humanitarian",
  },
];

const FALLBACK_STORIES = [
  {
    id: 1,
    title: "Breaking The Silo: From Hesitation To Confidence",
    quote: "When girls are given the right information and a safe space to speak, silence turns into strength.",
    excerpt:
      "At a government residential school in Uttar Pradesh, menstrual health awareness changed the lives of hundreds of young girls, turning hesitation into leadership and confidence.",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&q=80",
    slug: "breaking-the-silo",
  },
  {
    id: 2,
    title: "From Nagole To New Horizons: A Teen's Journey of Leadership",
    quote: "Jawahar Global Foundation has given him the confidence and direction to help others.",
    excerpt:
      "At just 17, Abhishek from Sai Nagar had always wanted to help others. Today, he leads youth groups and advocates for child rights in his community.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    slug: "nagole-to-new-horizons",
  },
  {
    id: 3,
    title: "Ram Kumar's Journey: From Addiction To Social Change",
    quote: "Change begins the moment you decide to fight your own battles — within yourself.",
    excerpt:
      "In the quiet lanes of a village in Shravasti district, a young man's transformation from addiction to becoming a community health worker is inspiring a generation.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80",
    slug: "ram-kumar-journey",
  },
  {
    id: 4,
    title: "Nourishing the Future: A Path to Recovery and Hope",
    quote: "Every child deserves the chance to grow healthy and strong.",
    excerpt:
      "Born underweight in a community health centre, Shadab's path to recovery through our nutrition programme is a testament to what consistent care can achieve.",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&q=80",
    slug: "nourishing-the-future",
  },
];

const FALLBACK_AWARDS = [
  { id: 1, title: "CSR Times Awards 2024 – Silver: Best NGO in Rural Development", image: "https://picsum.photos/seed/award1/220/160" },
  { id: 2, title: "ET Shark Awards 2024 – Bronze in Plants Projects", image: "https://picsum.photos/seed/award2/220/160" },
  { id: 3, title: "Certificate of Appreciation for TB Support", image: "https://picsum.photos/seed/award3/220/160" },
  { id: 4, title: "5th ICC Social Impact Awards 2023 – Runners Up", image: "https://picsum.photos/seed/award4/220/160" },
  { id: 5, title: "Radio City Delhi Icon Award 2023", image: "https://picsum.photos/seed/award5/220/160" },
  { id: 6, title: "10th National CSR Times Awards 2023", image: "https://picsum.photos/seed/award6/220/160" },
  { id: 7, title: "Best 'Not-for-Profit of the Year' 2021", image: "https://picsum.photos/seed/award7/220/160" },
  { id: 8, title: "#AllyUp Campaign – Gold in Best Not for Profit", image: "https://picsum.photos/seed/award8/220/160" },
];

const FALLBACK_BLOGS = [
  {
    id: 1,
    title: "A Guide To The POCSO Act: Legal Provisions & Child Safety",
    category: "Child Protection",
    excerpt:
      "Every child deserves to grow up in a safe, supportive, and protected environment where they can reach their full potential.",
    image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=400&q=80",
    slug: "pocso-act-guide",
    createdAt: "2024-03-15T00:00:00.000Z",
  },
  {
    id: 2,
    title: "How The Right To Education Act Changed India — 15 Years Later",
    category: "Education",
    excerpt:
      "Education is one of the most powerful tools for social and economic development. India introduced the RTE Act in 2009, marking an important step.",
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=400&q=80",
    slug: "rte-act-15-years",
    createdAt: "2024-02-20T00:00:00.000Z",
  },
  {
    id: 3,
    title: "How Corporate Social Responsibility (CSR) Supports NGOs in India",
    category: "Partnership",
    excerpt:
      "NGOs play a vital role in supporting social development across India. As businesses increasingly focus on CSR, partnerships are transforming communities.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80",
    slug: "csr-supports-ngos",
    createdAt: "2024-01-10T00:00:00.000Z",
  },
  {
    id: 4,
    title: "Why Choosing The Right NGO For Education Can Change A Child's Future",
    category: "Education",
    excerpt:
      "Education has the power to transform lives. It helps children build knowledge, confidence, skills and opportunities for a brighter future.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80",
    slug: "right-ngo-for-education",
    createdAt: "2023-12-05T00:00:00.000Z",
  },
];

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    donorName: "Bhavesh N. Parmar",
    location: "Gujarat",
    message:
      "I truly appreciate Jawahar Global Foundation for the incredible work they do in standing up for those in need. It's heartening to see how small acts of kindness can bring real change. When each of us contributes in our own way, we help build a more caring and united world. Jai Hind, Jai Bharat!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 2,
    donorName: "Pola Venkatappaiah",
    location: "Telangana",
    message:
      "It's a simple contribution from my end, but it brings me immense happiness and fulfillment. I truly admire the heartfelt efforts of your organization in uplifting children in need. Your selfless service is inspiring, and I hope more people come forward to support this cause.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 3,
    donorName: "Rajesh Kumar",
    location: "Delhi",
    message:
      "Being associated with Jawahar Global Foundation has been a transformative experience. The work they do for children's education and health is phenomenal. Every rupee donated here goes directly to making a child's life better. Highly recommend supporting this cause.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
];

const FALLBACK_PARTNERS = [
  { id: 1, name: "Tata", logo: "https://picsum.photos/seed/tata/200/80" },
  { id: 2, name: "Samsung", logo: "https://picsum.photos/seed/samsung/200/80" },
  { id: 3, name: "Honda", logo: "https://picsum.photos/seed/honda/200/80" },
  { id: 4, name: "HCL", logo: "https://picsum.photos/seed/hcl/200/80" },
  { id: 5, name: "Salesforce", logo: "https://picsum.photos/seed/salesforce/200/80" },
  { id: 6, name: "ZEE", logo: "https://picsum.photos/seed/zee/200/80" },
  { id: 7, name: "L&T", logo: "https://picsum.photos/seed/lt/200/80" },
  { id: 8, name: "Marico", logo: "https://picsum.photos/seed/marico/200/80" },
];

const FAQ_DATA = [
  {
    q: "Are there any tax benefits involved while donating to Jawahar Global Foundation?",
    a: "All donations made to Jawahar Global Foundation are 50% tax-exempt under section 80G of the Income Tax Act 1961. Section 80G allows tax exemptions for individuals, HUFs, companies, and partnership firms.",
  },
  {
    q: "What is the process to avail tax exemption certificate?",
    a: "Jawahar Global Foundation will provide your details to the Income Tax department by May 31 following the financial year in which the donation was received. We will share your Full Name, PAN number, and Complete Address to issue a Tax Exemption Certificate (10BE).",
  },
  {
    q: "How can I donate online?",
    a: "Visit the Jawahar Global Foundation donation page, where you will find two options: One-Time Donation and Monthly Donation. Select your preferred payment method and provide your full name, address, and PAN number to claim tax exemption.",
  },
  {
    q: "Is it safe to give my credit card details online?",
    a: "We will never share your information. We also do not store any sensitive information like your credit card or bank details. We make stringent efforts to require all third-party service providers to hold personal information in strict confidence.",
  },
  {
    q: "How do I contact you regarding my donation?",
    a: "Reach out to us at info@jawaharglobalfoundation.org or call us at 011-40538140. You may also write to us at our registered office address.",
  },
];

// ─── HELPER ──────────────────────────────────────────────────────────────────

function useFetch(endpoint, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    fetch(`${API}${endpoint}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data?.length > 0) setData(res.data);
      })
      .catch(() => {});
  }, [endpoint]);
  return data;
}

// ─── SECTION COMPONENTS ───────────────────────────────────────────────────────

// 1. HERO SLIDER
function HeroSlider({ banners }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [banners.length]);

  const goTo = (idx) => {
    clearInterval(timerRef.current);
    setCurrent(idx);
    startTimer();
  };

  const prev = () => goTo((current - 1 + banners.length) % banners.length);
  const next = () => goTo((current + 1) % banners.length);

  return (
    <div className="relative w-full h-[420px] sm:h-[520px] md:h-[600px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {banners.map((banner, i) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {/* Text */}
          <div className="absolute bottom-16 left-0 right-0 px-6 md:px-16 max-w-4xl">
            <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl leading-tight drop-shadow-lg mb-3">
              {banner.title}
            </h2>
            {banner.subtitle && (
              <p className="text-gray-200 text-sm sm:text-base mb-5 max-w-xl">{banner.subtitle}</p>
            )}
            <Link
              to={banner.buttonLink || "/donate"}
              className="inline-block bg-red-700 hover:bg-red-800 text-white px-7 py-2.5 font-bold text-sm transition-colors rounded-sm"
            >
              {banner.buttonText || "Read Now"}
            </Link>
          </div>
        </div>
      ))}

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// 2. ANNUAL REPORT STRIP
function AnnualReportStrip() {
  return (
    <div className="bg-red-700 py-5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="text-red-200 text-xs font-semibold uppercase tracking-widest">Annual Report 2025</span>
          <h3 className="text-white font-extrabold text-xl sm:text-2xl">Unlocking Potentials</h3>
        </div>
        <a
          href="/annual-reports"
          className="shrink-0 bg-white text-red-700 hover:bg-gray-100 px-6 py-2.5 font-bold text-sm rounded-sm transition-colors"
        >
          Read Now
        </a>
      </div>
    </div>
  );
}

// 3. ABOUT SECTION
function AboutSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
          JGF, BHAVISHYA RAKSHA
        </h2>
        <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-4 text-[15px]">
          <p>
            At Jawahar Global Foundation, nurturing children is nurturing the promise of India. We have made it our
            mission to transform childhood landscapes nationwide through compassion, care and relentless efforts. We are
            steadfast in our resolve to help the children of India build a <strong>Secure Childhood</strong> and thus a{" "}
            <strong>Secure Future</strong>.
          </p>
          <p>
            Our approach at Jawahar Global Foundation is <strong>HOLISTIC</strong> as we address numerous aspects of
            childhood: access to health and nutrition, quality education, protection from harm, supporting with
            psychosocial needs and driving a well-rounded development of children.
          </p>

          {expanded && (
            <>
              <p>
                We, at Jawahar Global Foundation, pledge to make every impact holistic for India's children — but we
                cannot walk alone, because shaping young lives cannot happen in isolation. It calls for unified effort
                from communities, government and supporters. Collaborating with on-ground workers, policymakers and
                donors, we build an ecosystem where children can flourish.
              </p>
              <p>
                Our education programs have assisted thousands of children. Healthcare support has been provided to
                countless children. Our humanitarian drives have reached children in disaster-hit zones with urgent aid
                and long-term rehabilitation. Each milestone fuels our conviction that we can transform childhood with
                compassion, care and unity.
              </p>
              <p>
                We pledge to continue to reach more and more children in need and ensure that no child is left behind.
                We are committed to help bridge the gap between the childhood some children endure and the one they
                deserve.{" "}
                <Link to="/donate" className="text-red-700 font-semibold hover:underline">
                  Donate now
                </Link>{" "}
                to Jawahar Global Foundation to create lasting change — child by child.
              </p>
            </>
          )}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-red-700 hover:text-red-800 font-semibold text-sm border border-red-700 px-5 py-2 rounded-sm hover:bg-red-50 transition-colors"
          >
            {expanded ? "Read Less" : "Read More..."}
          </button>
        </div>
      </div>
    </section>
  );
}

// 4. FIELDS OF WORK TABS
function FieldsOfWork({ fields }) {
  const [activeTab, setActiveTab] = useState(0);
  const active = fields[activeTab];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Our Fields of Work
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">
          We work across multiple domains to ensure every child gets what they deserve.
        </p>

        {/* Tab Buttons */}
        <div className="flex overflow-x-auto gap-1 mb-8 pb-1 scrollbar-hide">
          {fields.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                i === activeTab
                  ? "border-red-700 text-red-700 bg-white shadow-sm"
                  : "border-transparent text-gray-500 hover:text-red-700 hover:border-red-300 bg-white"
              }`}
            >
              {f.title}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        {active && (
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-8">
              <span className="text-red-700 text-xs font-bold uppercase tracking-widest">Fields of Work</span>
              <h3 className="text-red-800 font-extrabold text-lg mt-1 mb-3 italic">{active.tagline}</h3>
              <p className="text-gray-600 leading-relaxed text-[15px] mb-5">{active.description}</p>
              <Link
                to={active.link || "#"}
                className="inline-flex items-center gap-2 text-red-700 font-bold text-sm hover:gap-3 transition-all group"
              >
                Know More
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="h-72 md:h-full min-h-[280px]">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// 5. IMPACT STATS
function ImpactStats() {
  const stats = [
    { number: "1 Crore+", label: "Children Reached" },
    { number: "15+", label: "States Covered" },
    { number: "40+", label: "Emergencies Responded" },
    { number: "20+", label: "Years of Service" },
  ];
  return (
    <section
      className="py-14 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=60')",
      }}
    >
      <div className="absolute inset-0 bg-red-800/85" />
      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-white text-center font-extrabold text-2xl md:text-3xl mb-10">
          Our Impact Last Year
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-white font-extrabold text-4xl md:text-5xl mb-2">{s.number}</div>
              <div className="text-red-200 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. SUCCESS STORIES
function SuccessStories({ stories }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 text-center">
          Success Stories
        </h2>
        <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto mb-10">
          Our interventions have empowered countless marginalised children to transform their own lives. From the cities
          to remote rural reaches, we witness stories of triumph every day.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((s) => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-44 overflow-hidden">
                <img
                  src={s.image || "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=400&q=80"}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <Link
                  to={`/success-stories/${s.slug}`}
                  className="font-bold text-gray-800 text-sm hover:text-red-700 transition-colors leading-snug block mb-2"
                >
                  {s.title}
                </Link>
                {s.quote && (
                  <p className="text-red-700 text-xs italic mb-2 line-clamp-2">"{s.quote}"</p>
                )}
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{s.excerpt}</p>
                <Link
                  to={`/success-stories/${s.slug}`}
                  className="text-red-700 text-xs font-bold hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/success-stories"
            className="inline-block border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white px-7 py-2.5 font-bold text-sm transition-colors rounded-sm"
          >
            Read More Stories
          </Link>
        </div>
      </div>
    </section>
  );
}

// 7. AWARDS
function AwardsSection({ awards }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 text-center">
          Recent Awards & Recognitions
        </h2>
        <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto mb-10">
          From allyship to health outreach, our awards recognise our unrelenting efforts to transform young lives.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {awards.map((a) => (
            <div
              key={a.id}
              title={a.title}
              className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-3"
            >
              <img src={a.image} alt={a.title} className="w-full h-28 object-cover rounded" />
              <p className="text-xs text-gray-600 text-center leading-snug">{a.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 8. DONATION CAMPAIGNS
function DonationCampaigns() {
  const campaigns = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
      heading: "Every child deserves to learn. Help them thrive.",
      text: "Education empowers every future. Support quality learning for children everywhere. Together, let's ensure no child is left behind.",
      link: "/donate",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
      heading: "Join us in making a difference.",
      text: "We have partnered with the Government of India to empower millions of children. Your support allows us to reach even more children.",
      link: "/donate",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80",
      heading: "Let's use technology to ignite young minds.",
      text: "Donate to the 'Making Schools Smart' project and equip schools with STEM labs and smart classrooms, fostering scientific thinking.",
      link: "/donate",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10 text-center">
          Ongoing Campaigns Which Need Your Support
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <div key={c.id} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-52 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.heading}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 bg-white border border-gray-100 border-t-0">
                <h3 className="font-extrabold text-gray-800 text-base mb-2">{c.heading}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{c.text}</p>
                <Link
                  to={c.link}
                  className="inline-block bg-red-700 hover:bg-red-800 text-white px-5 py-2 text-sm font-bold transition-colors rounded-sm"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 9. BLOGS
function BlogSection({ blogs }) {
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 text-center">Blogs</h2>
        <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto mb-10">
          The Jawahar Global Foundation blog brings to life our commitment to child welfare, protection, and
          empowerment.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((b) => (
            <div key={b.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-44 overflow-hidden">
                <img
                  src={b.image || "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=400&q=80"}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                {b.category && (
                  <span className="inline-block text-xs font-bold text-red-700 uppercase tracking-wide mb-1">
                    {b.category}
                  </span>
                )}
                <Link
                  to={`/blogs/${b.slug}`}
                  className="font-bold text-gray-800 text-sm hover:text-red-700 transition-colors leading-snug block mb-2"
                >
                  {b.title}
                </Link>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{b.excerpt}</p>
                <div className="flex items-center justify-between">
                  {b.createdAt && (
                    <span className="text-gray-400 text-xs">{formatDate(b.createdAt)}</span>
                  )}
                  <Link to={`/blogs/${b.slug}`} className="text-red-700 text-xs font-bold hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 10. TAKE ACTION
function TakeAction() {
  const actions = [
    {
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
      label: "Become a Supporter",
      link: "/support-children",
    },
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      label: "Give One Time or Monthly",
      link: "/donate",
    },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10 text-center">Take Action</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {actions.map((a) => (
            <Link
              key={a.label}
              to={a.link}
              className="relative rounded-lg overflow-hidden h-56 group block"
            >
              <img
                src={a.image}
                alt={a.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
                <span className="text-white font-extrabold text-lg">{a.label}</span>
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// 11. TESTIMONIALS / DONOR SAYS
function TestimonialsSection({ testimonials }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-16 bg-red-700">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white font-extrabold text-2xl md:text-3xl mb-3 text-center">What Donor Says</h2>
        <p className="text-red-200 text-sm text-center max-w-2xl mx-auto mb-10">
          Donors across the country share our commitment to providing every child with a safe and nurturing environment.
        </p>
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-white rounded-lg p-8 shadow-xl text-center">
            <img
              src={t.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"}
              alt={t.donorName}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-red-100"
            />
            <p className="text-gray-600 text-sm leading-relaxed italic mb-5">"{t.message}"</p>
            <p className="font-extrabold text-gray-800 text-sm">{t.donorName}</p>
            {t.location && <p className="text-gray-400 text-xs mt-0.5">{t.location}</p>}
          </div>

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-red-700 hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-red-700 hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 12. CORPORATE PARTNERS MARQUEE
function PartnersMarquee({ partners }) {
  const doubled = [...partners, ...partners]; // loop seamlessly
  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Corporate Partnership</h2>
      </div>
      <div className="overflow-hidden relative">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {doubled.map((p, i) => (
            <div
              key={i}
              className="shrink-0 w-40 h-16 bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center px-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img src={p.logo} alt={p.name} className="max-h-10 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 13. VIDEO SECTION
function VideoSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 text-center">
          Our Commitment to Be the Rakshaks of Children's Future
        </h2>
        <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto mb-10">
          We invite you behind the scenes to witness the transformations made possible by donors like you.
        </p>
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            {!playing ? (
              <div
                className="relative cursor-pointer group"
                onClick={() => setPlaying(true)}
              >
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80"
                  alt="Video Thumbnail"
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 bg-red-700 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/CKxOZpl1jDM?autoplay=1"
                title="JGF Mission Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-72 md:h-96"
              />
            )}
          </div>
          <div className="mt-6 text-center">
            <h3 className="font-extrabold text-gray-800 text-lg mb-2">
              Jawahar Global Foundation's Ongoing Mission to Empower Children!
            </h3>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              At Jawahar Global Foundation, we believe in creating a secure future by ensuring every child has a secure
              childhood. Join us in building a world where every child has access to equal opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 14. FAQ ACCORDION
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10 text-center">FAQs</h2>
        <div className="space-y-3">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors text-sm"
              >
                <span className="pr-4">{faq.q}</span>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    openIdx === i
                      ? "border-red-700 bg-red-700 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {openIdx === i ? (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </span>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-4 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-gray-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN HOME PAGE ───────────────────────────────────────────────────────────

export default function Home() {
  // Courses-first home page.
  const courses = useFetch(
    "/api/courses",
    []
  );

  const featured = Array.isArray(courses) ? courses.slice(0, 4) : [];

  return (
    <main>
      <section className="relative bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#C62828]/30 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
                Learn with impact. Earn your certificate.
              </h1>
              <p className="text-gray-300 mt-4 text-sm sm:text-base leading-relaxed max-w-xl">
                Explore our curated online courses, complete modules at your pace, and receive a
                completion certificate—directly within the platform.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center bg-[#C62828] hover:bg-[#8E0000] text-white px-7 py-3 rounded-full font-bold transition-colors"
                >
                  Browse Courses
                </Link>
                <Link
                  to="/certificates"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white px-7 py-3 rounded-full font-bold transition-colors border border-white/20"
                >
                  View Certificates
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-white/90">
                  <div className="text-2xl font-extrabold">{courses.length}</div>
                  <div className="text-xs text-gray-400">Active Courses</div>
                </div>
                <div className="text-white/90">
                  <div className="text-2xl font-extrabold">100%</div>
                  <div className="text-xs text-gray-400">Completion Based</div>
                </div>
                <div className="text-white/90">
                  <div className="text-2xl font-extrabold">Self</div>
                  <div className="text-xs text-gray-400">Paced Learning</div>
                </div>
                <div className="text-white/90">
                  <div className="text-2xl font-extrabold">Cert</div>
                  <div className="text-xs text-gray-400">On Completion</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7 backdrop-blur">
              <h2 className="text-white font-extrabold text-lg">Featured Courses</h2>
              <p className="text-gray-400 text-sm mt-1">
                Start learning in seconds—choose a course and proceed to modules.
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                {featured.length ? (
                  featured.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/courses/${c.slug}`}
                      className="block bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-xl overflow-hidden"
                    >
                      <div className="h-28 bg-gray-900">
                        {c.coverImageUrl ? (
                          <img
                            src={c.coverImageUrl}
                            alt={c.title}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="p-3">
                        <div className="text-sm font-extrabold text-white line-clamp-2">{c.title}</div>
                        {c.level ? <div className="text-xs text-gray-400 mt-1">{c.level}</div> : null}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-gray-300 text-sm py-8 text-center">
                    No active courses found.
                  </div>
                )}
              </div>

              <div className="mt-5 flex justify-end">
                <Link to="/courses" className="text-white font-bold text-sm hover:underline">
                  View all →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
            How it works
          </h2>
          <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto mt-3">
            Simple learning flow: pick a course, complete modules, then get your certificate.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-red-50 text-[#C62828] flex items-center justify-center font-extrabold">1</div>
              <h3 className="mt-4 font-extrabold text-gray-900">Choose a course</h3>
              <p className="text-sm text-gray-600 mt-2">
                Browse active courses and open any course to see its syllabus.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-red-50 text-[#C62828] flex items-center justify-center font-extrabold">2</div>
              <h3 className="mt-4 font-extrabold text-gray-900">Complete modules</h3>
              <p className="text-sm text-gray-600 mt-2">
                Learn through content (and quizzes where available) module-by-module.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-red-50 text-[#C62828] flex items-center justify-center font-extrabold">3</div>
              <h3 className="mt-4 font-extrabold text-gray-900">Get your certificate</h3>
              <p className="text-sm text-gray-600 mt-2">
                Click complete to receive a certificate and view it anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
            Impact Highlights
          </h2>
          <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto mt-3">
            Learning creates measurable outcomes—skills, access, and a stronger future.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <span className="text-[#C62828] font-extrabold text-lg">★</span>
              </div>
              <h3 className="mt-4 font-extrabold text-gray-900">Certificate On Completion</h3>
              <p className="text-sm text-gray-600 mt-2">
                Verify your progress and earn a completion certificate directly in-platform.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <span className="text-[#C62828] font-extrabold text-lg">◎</span>
              </div>
              <h3 className="mt-4 font-extrabold text-gray-900">Learn at Your Pace</h3>
              <p className="text-sm text-gray-600 mt-2">
                Move through modules when it suits you—stay consistent without pressure.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <span className="text-[#C62828] font-extrabold text-lg">⚡</span>
              </div>
              <h3 className="mt-4 font-extrabold text-gray-900">Practical Course Content</h3>
              <p className="text-sm text-gray-600 mt-2">
                Structured lessons built to help you apply knowledge—not just read it.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <span className="text-[#C62828] font-extrabold text-lg">♥</span>
              </div>
              <h3 className="mt-4 font-extrabold text-gray-900">Skills for Real Change</h3>
              <p className="text-sm text-gray-600 mt-2">
                Every course supports a broader mission: empowering children through education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Voices */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Donor Voices
              </h2>
              <p className="text-gray-500 text-sm mt-3 max-w-2xl">
                Hear from supporters who believe education should be safe, accessible, and transformative.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#C62828] font-extrabold text-sm hover:underline"
            >
              Read more in Blog
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Anita R.",
                place: "Uttar Pradesh",
                quote:
                  "The best part is seeing learners complete modules and earn certificates. It proves impact can be structured and real.",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
              },
              {
                name: "Karthik S.",
                place: "Karnataka",
                quote:
                  "I love how the platform keeps learning simple. The journey is clear—finish, verify, and share progress with confidence.",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
              },
              {
                name: "Meera P.",
                place: "Delhi",
                quote:
                  "Supporters want results. This model delivers outcomes through consistent learning and completion milestones.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-red-50"
                  />
                  <div>
                    <div className="font-extrabold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.place}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mt-4 italic">“{t.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Featured Blogs</h2>
              <p className="text-center md:text-left text-gray-500 text-sm max-w-2xl mt-3">
                Stories, insights, and updates on education, protection, and community empowerment.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#C62828] font-extrabold text-sm hover:underline"
            >
              View all
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FALLBACK_BLOGS.slice(0, 3).map((b) => (
              <Link
                key={b.id}
                to={`/blogs/${b.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-xs font-extrabold text-red-700 uppercase tracking-wide">
                      {b.category}
                    </span>
                  </div>
                  <div className="mt-2 font-extrabold text-gray-900 text-sm leading-snug line-clamp-2">
                    {b.title}
                  </div>
                  <div className="mt-3 text-gray-600 text-xs line-clamp-2">{b.excerpt}</div>
                  <div className="mt-4 text-red-700 text-xs font-extrabold group-hover:underline">
                    Read more →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center">
            Ready to start?
          </h2>
          <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto mt-3">
            Take the next step today—open your dashboard, enroll in a course, and complete your learning.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center bg-[#C62828] hover:bg-[#8E0000] text-white px-10 py-3 rounded-full font-bold transition-colors"
            >
              Enroll Now
            </Link>
            <Link
              to="/certificates"
              className="inline-flex items-center justify-center bg-white border border-gray-200 hover:border-red-700 hover:text-[#C62828] text-gray-800 px-10 py-3 rounded-full font-bold transition-colors"
            >
              My Certificates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
