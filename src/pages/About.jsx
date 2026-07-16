import React from "react";
import { Link } from "react-router-dom";
import { 
  Award, Users, Target, BookOpen, Clock, CheckCircle,
  MapPin, Phone, Mail, Globe, Shield, Star, 
  TrendingUp, Calendar, UserCheck, GraduationCap,
  Heart, Sparkles, Building, Briefcase
} from "lucide-react";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#0B2545] py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(242,169,59,0.15),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(242,169,59,0.08),_transparent_50%)]" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#F2A93B]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F2A93B]/10 border border-[#F2A93B]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-[#F2A93B] rounded-full animate-pulse" />
            <span className="text-[#F2A93B] text-xs font-bold uppercase tracking-wider">
              About Us
            </span>
          </div>
          <h1 className="font-sora font-extrabold text-white text-4xl md:text-5xl lg:text-6xl leading-tight">
            Empowering <span className="text-[#F2A93B]">Careers</span> Through
            <br />Practical <span className="text-[#F2A93B]">Skills</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Jawahar Global Foundation is dedicated to providing industry-aligned vocational training 
            that transforms lives and builds successful careers.
          </p>
          <div className="w-20 h-1 bg-[#F2A93B] rounded-full mx-auto mt-6" />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100">
              <div className="w-14 h-14 bg-[#F2A93B]/10 rounded-xl flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-[#F2A93B]" />
              </div>
              <h3 className="font-sora font-bold text-xl text-[#0B2545] mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To make quality vocational education accessible to everyone, bridging the gap 
                between learning and employment through hands-on training and industry partnerships.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100">
              <div className="w-14 h-14 bg-[#F2A93B]/10 rounded-xl flex items-center justify-center mb-5">
                <Globe className="w-7 h-7 text-[#F2A93B]" />
              </div>
              <h3 className="font-sora font-bold text-xl text-[#0B2545] mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become India's leading vocational training network, creating a skilled workforce 
                that drives economic growth and empowers communities across the nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-[#0B2545]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#F2A93B] text-xs font-bold uppercase tracking-widest bg-[#F2A93B]/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Our Impact
            </span>
            <h2 className="font-sora font-extrabold text-white text-3xl md:text-4xl">
              Making a <span className="text-[#F2A93B]">Difference</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-sora font-extrabold text-[#F2A93B]">4500+</div>
              <div className="text-slate-300 text-sm mt-2">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-sora font-extrabold text-[#F2A93B]">350+</div>
              <div className="text-slate-300 text-sm mt-2">Hiring Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-sora font-extrabold text-[#F2A93B]">12</div>
              <div className="text-slate-300 text-sm mt-2">Training Centres</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-sora font-extrabold text-[#F2A93B]">96%</div>
              <div className="text-slate-300 text-sm mt-2">Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Section - with Parlour Image */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#F2A93B] text-xs font-bold uppercase tracking-widest bg-[#F2A93B]/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Training Programs
            </span>
            <h2 className="font-sora font-extrabold text-3xl md:text-4xl text-[#0B2545]">
              Our <span className="text-[#F2A93B]">Programs</span>
            </h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Industry-aligned vocational training programs designed for career success
            </p>
            <div className="w-16 h-1 bg-[#F2A93B] rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Program 1 - Mechanic */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#F2A93B]/30 hover:-translate-y-2">
              <div className="h-52 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1504222490345-c075b6008014?w=500&auto=format&fit=crop&q=60"
                  alt="Mechanic Training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-bold text-sm">Mechanic Basics</span>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-3">Hands-on workshop with real vehicle practice</p>
                <Link to="/courses/mechanic" className="inline-flex items-center text-[#F2A93B] font-semibold text-sm hover:text-[#0B2545] transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Program 2 - Electrician */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#F2A93B]/30 hover:-translate-y-2">
              <div className="h-52 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80"
                  alt="Electrician Training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-bold text-sm">Electrician Fundamentals</span>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-3">Safety certification with live wiring practice</p>
                <Link to="/courses/electrician" className="inline-flex items-center text-[#F2A93B] font-semibold text-sm hover:text-[#0B2545] transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Program 3 - Parlour (WITH NEW IMAGE) */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#F2A93B]/30 hover:-translate-y-2">
              <div className="h-52 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&q=80"
                  alt="Parlour Training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-bold text-sm">Parlour Skills</span>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-3">Client handling with hygiene & care techniques</p>
                <Link to="/courses/parlour" className="inline-flex items-center text-[#F2A93B] font-semibold text-sm hover:text-[#0B2545] transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Program 4 - Salon */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-[#F2A93B]/30 hover:-translate-y-2">
              <div className="h-52 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80"
                  alt="Salon Training"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white font-bold text-sm">Salon Skills</span>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-3">Styling fundamentals with real client practice</p>
                <Link to="/courses/salon" className="inline-flex items-center text-[#F2A93B] font-semibold text-sm hover:text-[#0B2545] transition-colors">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-[#F2A93B] hover:bg-[#e0993a] text-[#0B2545] px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-[#F2A93B]/30"
            >
              View All Programs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#F2A93B] text-xs font-bold uppercase tracking-widest bg-[#F2A93B]/10 px-4 py-1.5 rounded-full inline-block mb-4">
              Why Choose Us
            </span>
            <h2 className="font-sora font-extrabold text-3xl md:text-4xl text-[#0B2545]">
              Why <span className="text-[#F2A93B]">JGF</span>?
            </h2>
            <div className="w-16 h-1 bg-[#F2A93B] rounded-full mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#F2A93B]/30">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h4 className="font-sora font-bold text-[#0B2545] text-base mb-2">Industry-Aligned Curriculum</h4>
              <p className="text-gray-500 text-sm">Courses designed with input from industry experts to meet current market demands.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#F2A93B]/30">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h4 className="font-sora font-bold text-[#0B2545] text-base mb-2">Expert Trainers</h4>
              <p className="text-gray-500 text-sm">Learn from experienced professionals with years of industry experience.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#F2A93B]/30">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h4 className="font-sora font-bold text-[#0B2545] text-base mb-2">Hands-On Training</h4>
              <p className="text-gray-500 text-sm">Practical, real-world training that builds confidence and competence.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#F2A93B]/30">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h4 className="font-sora font-bold text-[#0B2545] text-base mb-2">Placement Assistance</h4>
              <p className="text-gray-500 text-sm">Dedicated placement support with 350+ hiring partners across India.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#F2A93B]/30">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h4 className="font-sora font-bold text-[#0B2545] text-base mb-2">Recognized Certification</h4>
              <p className="text-gray-500 text-sm">Earn a diploma that is recognized and valued by employers nationwide.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#F2A93B]/30">
              <div className="w-12 h-12 bg-[#F2A93B]/10 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#F2A93B]" />
              </div>
              <h4 className="font-sora font-bold text-[#0B2545] text-base mb-2">Student Support</h4>
              <p className="text-gray-500 text-sm">24/7 support, flexible batches, and personalized guidance for every student.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#0B2545] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="font-sora font-extrabold text-white text-3xl md:text-5xl leading-tight mb-4">
            Ready to Start Your <span className="text-[#F2A93B]">Career</span>?
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Join thousands of students who have transformed their lives through our vocational training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center bg-[#F2A93B] hover:bg-[#e0993a] text-[#0B2545] px-10 py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-[#F2A93B]/30 group"
            >
              Explore Programs
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-xl font-bold text-sm transition-all duration-300 border border-white/20 backdrop-blur-sm"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-delay-1 { animation-delay: 0.1s; }
        .animate-delay-2 { animation-delay: 0.2s; }
        .animate-delay-3 { animation-delay: 0.3s; }
      `}</style>
    </>
  );
};

export default About;