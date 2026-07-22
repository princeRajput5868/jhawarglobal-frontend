import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, QrCode, Copy, CheckCircle, AlertCircle,
  Phone, Mail, MapPin, Clock, Shield, Award,
  Users, TrendingUp, Star, ArrowRight,
  CreditCard, Wallet, Smartphone, Banknote
} from "lucide-react";

const Donate = () => {
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [upiId] = useState("jawaharglobal@upi");
  const [donationSuccess, setDonationSuccess] = useState(false);

  const presetAmounts = [500, 1000, 2000, 5000];

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDonate = (e) => {
    e.preventDefault();
    const amount = selectedAmount || customAmount;
    if (!amount || amount < 1) {
      alert("Please select or enter a donation amount");
      return;
    }
    setDonationSuccess(true);
    setTimeout(() => setDonationSuccess(false), 5000);
  };

  const stats = [
    { number: "4500+", label: "Students Supported" },
    { number: "350+", label: "Partner Organizations" },
    { number: "12", label: "Training Centers" },
    { number: "96%", label: "Success Rate" },
  ];

  const impactAreas = [
    "Vocational Training for Youth",
    "Women Empowerment Programs",
    "Skill Development Workshops",
    "Education & Literacy Initiatives",
    "Community Development Projects",
    "Employment Generation Support",
  ];

  return (
    <main className="bg-gray-50 min-h-screen font-inter">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0B2545] to-[#1a3a6e] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2A93B]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F2A93B]/3 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative text-center">
          <div className="inline-flex items-center gap-2 bg-[#F2A93B]/20 border border-[#F2A93B]/30 rounded-full px-4 py-1.5 mb-6">
            <Heart className="w-4 h-4 text-[#F2A93B] fill-[#F2A93B]" />
            <span className="text-[#F2A93B] text-xs font-bold uppercase tracking-wider">Support a Cause</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-extrabold text-white leading-tight">
            Make a <span className="text-[#F2A93B]">Difference</span>
          </h1>
          
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-4">
            Your generous donation helps us provide quality vocational training and 
            create employment opportunities for underserved communities.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 text-white/80 text-sm bg-white/10 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-[#F2A93B]" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm bg-white/10 px-4 py-2 rounded-full">
              <Award className="w-4 h-4 text-[#F2A93B]" />
              <span>80G Tax Exemption</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm bg-white/10 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 text-[#F2A93B]" />
              <span>Trusted by 4500+ Students</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-sora font-extrabold text-[#C62828]">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Donation Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left - Donation Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-sora font-bold text-[#0B2545] flex items-center gap-2 mb-2">
                  <Heart className="w-6 h-6 text-[#C62828]" />
                  Make a Donation
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Choose an amount and complete your donation securely.
                </p>

                {/* Donation Success Message */}
                {donationSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-fadeIn">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-700 font-semibold">Thank You for Your Donation!</p>
                      <p className="text-green-600 text-sm">
                        Your support helps us continue our mission. You will receive a confirmation email shortly.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleDonate}>
                  {/* Preset Amounts */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Amount (₹)
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {presetAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                          className={`py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                            selectedAmount === amount
                              ? "bg-[#C62828] text-white shadow-lg shadow-[#C62828]/30"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Or Enter Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Enter amount..."
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className="w-full border border-gray-300 rounded-xl px-10 py-3 outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 transition bg-gray-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                        <QrCode className="w-5 h-5 text-[#C62828]" />
                        <span className="text-sm font-medium">QR Code</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                        <CreditCard className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Card</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                        <Wallet className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Wallet</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                        <Banknote className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-400">Net Banking</span>
                      </div>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#C62828] hover:bg-[#8E0000] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#C62828]/30 transform hover:-translate-y-0.5 text-base flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Donate Now
                  </button>

                  <p className="text-xs text-gray-400 text-center mt-3">
                    🔒 Your donation is secure and encrypted. 80G tax exemption available.
                  </p>
                </form>
              </div>
            </div>

            {/* Right - QR Code Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 sticky top-24">
                <h3 className="text-lg font-sora font-bold text-[#0B2545] flex items-center gap-2 mb-4">
                  <QrCode className="w-5 h-5 text-[#C62828]" />
                  Scan to Pay
                </h3>
                
                {/* QR Code */}
                <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-center mb-4">
                  <div className="w-48 h-48 bg-white rounded-xl border-2 border-gray-200 flex items-center justify-center flex-col">
                    <img 
                      src="/assets/qr-code.png" 
                      alt="UPI QR Code" 
                      className="w-40 h-40 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        document.getElementById('qrFallback').style.display = 'flex';
                      }}
                    />
                    <div id="qrFallback" className="w-40 h-40 flex items-center justify-center flex-col" style={{ display: 'none' }}>
                      <QrCode className="w-16 h-16 text-[#0B2545]" />
                      <span className="text-xs text-gray-400 mt-2">Scan QR Code</span>
                    </div>
                  </div>
                </div>

                {/* UPI ID */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">UPI ID</p>
                      <p className="font-mono text-sm font-semibold text-[#0B2545]">{upiId}</p>
                    </div>
                    <button
                      onClick={handleCopyUPI}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        copied
                          ? "bg-green-100 text-green-700"
                          : "bg-[#C62828]/10 text-[#C62828] hover:bg-[#C62828]/20"
                      }`}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Other Payment Methods */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
                    <Smartphone className="w-4 h-4 text-[#C62828]" />
                    <span>Google Pay / PhonePe / Paytm</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
                    <Banknote className="w-4 h-4 text-[#C62828]" />
                    <span>Bank Transfer: Contact us for details</span>
                  </div>
                </div>

                {/* Impact Message */}
                <div className="mt-6 p-4 bg-[#F2A93B]/10 rounded-xl border border-[#F2A93B]/20">
                  <p className="text-sm text-[#0B2545] font-medium flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#F2A93B] fill-[#F2A93B]" />
                    Your donation supports:
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li className="text-xs text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#F2A93B] rounded-full" />
                      Vocational training for 500+ youth annually
                    </li>
                    <li className="text-xs text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#F2A93B] rounded-full" />
                      Skill development workshops in rural areas
                    </li>
                    <li className="text-xs text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-[#F2A93B] rounded-full" />
                      Placement support and career guidance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas Section */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#F2A93B]/10 text-[#F2A93B] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Impact
            </span>
            <h2 className="text-3xl font-sora font-extrabold text-[#0B2545]">
              Where Your <span className="text-[#C62828]">Donation</span> Goes
            </h2>
            <div className="w-16 h-1 bg-[#C62828] rounded-full mx-auto mt-4" />
            <p className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto">
              Every contribution helps us create lasting change in communities through education and skill development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4 hover:bg-[#F2A93B]/5 transition-all duration-300 border border-gray-100 hover:border-[#F2A93B]/30">
                <div className="w-2 h-2 bg-[#C62828] rounded-full flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-[#0B2545]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-sora font-extrabold text-white mb-4">
            Every Contribution <span className="text-[#F2A93B]">Counts</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Whether it's ₹500 or ₹5000, your donation helps transform lives and build a better tomorrow.
          </p>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-[#F2A93B] hover:bg-[#e0993a] text-[#0B2545] font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#F2A93B]/30 transform hover:-translate-y-0.5"
          >
            <Heart className="w-5 h-5" />
            Donate Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </main>
  );
};

export default Donate;