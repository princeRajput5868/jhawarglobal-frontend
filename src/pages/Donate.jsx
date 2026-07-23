import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, QrCode, Copy, CheckCircle, AlertCircle,
  Shield, Award, Users, Star, ArrowRight,
  Banknote, X, Printer
} from "lucide-react";

function generateReceiptNumber() {
  const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
  const now = Date.now().toString().slice(-6);
  return `JGF-DON-${now}-${rand}`;
}

function formatReceiptDate(d) {
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

/* ── Printable donation receipt slip ── */
function DonationReceipt({ receipt, onClose }) {
  if (!receipt) return null;

  const handlePrint = () => window.print();

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4 print:hidden-backdrop">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #donation-receipt, #donation-receipt * { visibility: visible; }
          #donation-receipt {
            position: fixed; top: 0; left: 0; width: 100%;
            margin: 0; padding: 24px;
          }
          #receipt-backdrop { background: none !important; position: static !important; }
          .print\\:hidden { display: none !important; }
          @page { size: A5; margin: 0; }
        }
      `}</style>

      <div id="receipt-backdrop" className="w-full max-w-md">
        <div id="donation-receipt" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B2545] to-[#1a3a6e] px-6 py-6 text-center relative">
            <button
              onClick={onClose}
              className="print:hidden absolute top-3 right-3 text-white/70 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-white font-sora font-extrabold text-lg">Donation Successful</h2>
            <p className="text-slate-300 text-xs mt-1">Thank you for supporting Jawahar Global Foundation</p>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            <div className="text-center mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Amount Donated</p>
              <p className="text-3xl font-sora font-extrabold text-[#C62828] mt-1">₹{receipt.amount}</p>
            </div>

            <div className="border-t border-dashed border-gray-200 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Receipt No.</span>
                <span className="font-mono font-semibold text-[#0B2545]">{receipt.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold text-[#0B2545]">{formatReceiptDate(receipt.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Donor Name</span>
                <span className="font-semibold text-[#0B2545]">{receipt.name}</span>
              </div>
              {receipt.email && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-semibold text-[#0B2545] break-all text-right">{receipt.email}</span>
                </div>
              )}
              {receipt.phone && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-semibold text-[#0B2545]">{receipt.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-semibold text-[#0B2545]">{receipt.paymentMethod}</span>
              </div>
              {receipt.upiId && (
                <div className="flex justify-between">
                  <span className="text-gray-500">UPI ID</span>
                  <span className="font-mono font-semibold text-[#0B2545]">{receipt.upiId}</span>
                </div>
              )}
              {receipt.bankDetails && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Bank Account</span>
                  <span className="font-semibold text-[#0B2545]">{receipt.bankDetails}</span>
                </div>
              )}
            </div>

            <div className="mt-5 bg-[#F2A93B]/10 border border-[#F2A93B]/20 rounded-xl p-3 text-center">
              <p className="text-xs text-[#0B2545] font-medium">
                🔒 This donation is eligible for 80G tax exemption. An official receipt will also be emailed to you.
              </p>
            </div>

            <p className="text-center text-[11px] text-gray-400 mt-4">
              Jawahar Global Foundation &nbsp;•&nbsp; Together For A Better Tomorrow
            </p>
          </div>

          {/* Actions */}
          <div className="print:hidden flex gap-3 px-6 pb-6">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0B2545] hover:bg-[#122f5c] text-white font-bold py-3 rounded-xl transition"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Donate = () => {
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [upiId] = useState("jawaharglobal@upi");
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [formError, setFormError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");

  // Bank Account Details
  const bankDetails = {
    accountName: "Jawahar Global Foundation",
    accountNumber: "1234567890",
    bankName: "State Bank of India",
    ifscCode: "SBIN0001234",
    branch: "New Delhi Main Branch"
  };

  const presetAmounts = [500, 1000, 2000, 5000];

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyBankDetails = () => {
    const text = `Account Name: ${bankDetails.accountName}\nAccount Number: ${bankDetails.accountNumber}\nBank: ${bankDetails.bankName}\nIFSC: ${bankDetails.ifscCode}\nBranch: ${bankDetails.branch}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDonate = (e) => {
    e.preventDefault();
    setFormError("");

    const amount = selectedAmount || Number(customAmount);
    if (!amount || amount < 1) {
      setFormError("Please select or enter a donation amount.");
      return;
    }
    if (!donorName.trim()) {
      setFormError("Please enter your full name for the receipt.");
      return;
    }
    if (!donorEmail.trim() && !donorPhone.trim()) {
      setFormError("Please provide at least an email or phone number.");
      return;
    }

    const newReceipt = {
      receiptNo: generateReceiptNumber(),
      date: new Date(),
      amount,
      name: donorName.trim(),
      email: donorEmail.trim(),
      phone: donorPhone.trim(),
      paymentMethod: paymentMethod === "upi" ? "UPI" : "Bank Transfer",
      upiId: paymentMethod === "upi" ? upiId : undefined,
      bankDetails: paymentMethod === "bank" ? `${bankDetails.accountNumber} (${bankDetails.bankName})` : undefined,
    };

    setReceipt(newReceipt);
    setDonationSuccess(true);
  };

  const closeReceipt = () => {
    setReceipt(null);
    setDonationSuccess(false);
    setSelectedAmount(null);
    setCustomAmount("");
    setDonorName("");
    setDonorEmail("");
    setDonorPhone("");
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

                {formError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm font-medium">{formError}</p>
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

                  {/* Donor Details */}
                  <div className="mb-6 grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 transition bg-gray-50/50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 transition bg-gray-50/50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#C62828] focus:ring-2 focus:ring-[#C62828]/20 transition bg-gray-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* ✅ Payment Options - Only UPI and Bank Transfer */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                          paymentMethod === "upi"
                            ? "bg-[#C62828] text-white shadow-lg shadow-[#C62828]/30"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <QrCode className="w-5 h-5" />
                        UPI / QR Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("bank")}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                          paymentMethod === "bank"
                            ? "bg-[#C62828] text-white shadow-lg shadow-[#C62828]/30"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <Banknote className="w-5 h-5" />
                        Bank Transfer
                      </button>
                    </div>
                  </div>

                  {/* ✅ UPI Details */}
                  {paymentMethod === "upi" && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
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
                      <div className="mt-3 bg-white rounded-xl p-4 flex items-center justify-center">
                        <div className="w-40 h-40 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center flex-col">
                          <img 
                            src="/assets/qr-code.png" 
                            alt="UPI QR Code" 
                            className="w-32 h-32 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              document.getElementById('qrFallback').style.display = 'flex';
                            }}
                          />
                          <div id="qrFallback" className="w-32 h-32 flex items-center justify-center flex-col" style={{ display: 'none' }}>
                            <QrCode className="w-16 h-16 text-[#0B2545]" />
                            <span className="text-xs text-gray-400 mt-2">Scan QR Code</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 text-center mt-2">
                        Scan QR code with any UPI app (Google Pay, PhonePe, Paytm)
                      </p>
                    </div>
                  )}

                  {/* ✅ Bank Transfer Details */}
                  {paymentMethod === "bank" && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-gray-500">Bank Account Details</p>
                        <button
                          onClick={handleCopyBankDetails}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                            copied
                              ? "bg-green-100 text-green-700"
                              : "bg-[#C62828]/10 text-[#C62828] hover:bg-[#C62828]/20"
                          }`}
                        >
                          {copied ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copy All
                            </>
                          )}
                        </button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Account Name</span>
                          <span className="font-semibold text-[#0B2545]">{bankDetails.accountName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Account Number</span>
                          <span className="font-mono font-semibold text-[#0B2545]">{bankDetails.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Bank Name</span>
                          <span className="font-semibold text-[#0B2545]">{bankDetails.bankName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">IFSC Code</span>
                          <span className="font-mono font-semibold text-[#0B2545]">{bankDetails.ifscCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Branch</span>
                          <span className="font-semibold text-[#0B2545]">{bankDetails.branch}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 text-center mt-3">
                        Please use your name as reference while transferring.
                      </p>
                    </div>
                  )}

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

            {/* Right - Impact Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 sticky top-24">
                <h3 className="text-lg font-sora font-bold text-[#0B2545] flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-[#F2A93B] fill-[#F2A93B]" />
                  Your Impact
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-[#F2A93B]/10 rounded-xl border border-[#F2A93B]/20">
                    <p className="text-sm text-[#0B2545] font-medium">
                      Your donation supports:
                    </p>
                    <ul className="mt-2 space-y-2">
                      <li className="text-xs text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#F2A93B] rounded-full mt-1.5 flex-shrink-0" />
                        Vocational training for 500+ youth annually
                      </li>
                      <li className="text-xs text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#F2A93B] rounded-full mt-1.5 flex-shrink-0" />
                        Skill development workshops in rural areas
                      </li>
                      <li className="text-xs text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#F2A93B] rounded-full mt-1.5 flex-shrink-0" />
                        Placement support and career guidance
                      </li>
                      <li className="text-xs text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#F2A93B] rounded-full mt-1.5 flex-shrink-0" />
                        Women empowerment programs
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-700 font-medium">
                      💡 All donations are eligible for 80G tax exemption under Section 80G of the Income Tax Act.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-xs text-green-700 font-medium">
                      🤝 Your contribution helps build a skilled and employable India.
                    </p>
                  </div>
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

      {/* Donation Receipt Slip */}
      {donationSuccess && receipt && (
        <DonationReceipt receipt={receipt} onClose={closeReceipt} />
      )}

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