// import BlogHero from "../components/Blog/BlogHero";
// import FeaturedPost from "../components/Blog/FeaturedPost";
// import BlogGrid from "../components/Blog/BlogGrid";
// import Sidebar from "../components/Blog/Sidebar";
// import Newsletter from "../components/Blog/Newsletter";
// import Pagination from "../components/Blog/Pagination";
// import { Link } from "react-router-dom";
// import { BookOpen, ArrowRight, GraduationCap, Clock, TrendingUp } from "lucide-react";

// // ✅ Home Page se copy ki gayi course images
// const FEATURED_COURSES = [
//   {
//     id: 1,
//     slug: "mechanic",
//     title: "Mechanic Basics",
//     duration: "Service & Diagnostics",
//     level: "Beginner Friendly",
//     image: "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVjaGFuaWN8ZW58MHx8MHx8fDA%3D",
//     description: "Hands-on workshop with real vehicle practice and placement assistance.",
//   },
//   {
//     id: 2,
//     slug: "electrician",
//     title: "Electrician Fundamentals",
//     duration: "Safety First",
//     level: "Beginner Friendly",
//     image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&q=80",
//     description: "Safety certification with live wiring practice and placement assistance.",
//   },
//   {
//     id: 3,
//     slug: "parlour",
//     title: "Parlour Skills",
//     duration: "Care & Customer Experience",
//     level: "Beginner Friendly",
//     image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80",
//     description: "Client handling practice with hygiene & care techniques.",
//   },
//   {
//     id: 4,
//     slug: "salon",
//     title: "Salon Skills",
//     duration: "Basics to Employability",
//     level: "Beginner Friendly",
//     image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80",
//     description: "Styling fundamentals with real client practice.",
//   },
// ];

// // ✅ Quick Stats Component
// const QuickStats = () => {
//   const stats = [
//     { icon: BookOpen, label: "Articles", value: "50+" },
//     { icon: GraduationCap, label: "Students", value: "1000+" },
//     { icon: Clock, label: "Read Time", value: "5 min" },
//     { icon: TrendingUp, label: "Views", value: "10K+" },
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
//       {stats.map((stat, index) => (
//         <div key={index} className="bg-white rounded-xl p-4 md:p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
//           <div className="w-10 h-10 bg-[#F2A93B]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
//             <stat.icon className="w-5 h-5 text-[#F2A93B]" />
//           </div>
//           <div className="text-xl md:text-2xl font-sora font-extrabold text-[#0B2545]">{stat.value}</div>
//           <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const Blog = () => {
//   return (
//     <>
//       {/* Blog Hero */}
//       <BlogHero />

//       {/* Quick Stats Section */}
//       <section className="py-8 md:py-12 bg-gray-50 border-b border-gray-100">
//         <div className="container mx-auto px-4 lg:px-8">
//           <QuickStats />
//         </div>
//       </section>

//       {/* Featured Courses Section - Professional Design */}
//       <section className="py-16 md:py-24 bg-white">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center mb-14 md:mb-20">
//             <span className="inline-block bg-[#F2A93B]/10 text-[#F2A93B] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
//               Popular Programs
//             </span>
//             <h2 className="text-3xl md:text-4xl font-sora font-extrabold text-[#0B2545]">
//               Popular Training <span className="text-[#F2A93B]">Programs</span>
//             </h2>
//             <div className="w-16 h-1 bg-[#F2A93B] rounded-full mx-auto mt-4" />
//             <p className="text-gray-500 text-sm md:text-base mt-4 max-w-2xl mx-auto">
//               Explore our most sought-after vocational courses designed for career success
//             </p>
//           </div>

//           {/* Course Grid - Professional */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//             {FEATURED_COURSES.map((course) => (
//               <Link
//                 key={course.id}
//                 to={`/courses/${course.slug}`}
//                 className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-[#F2A93B]/40 hover:-translate-y-2"
//               >
//                 {/* Image */}
//                 <div className="relative h-52 overflow-hidden bg-slate-100">
//                   <img
//                     src={course.image}
//                     alt={course.title}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
//                   <span className="absolute top-4 left-4 bg-[#0B2545]/90 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/10">
//                     {course.duration}
//                   </span>
//                   <span className="absolute top-4 right-4 bg-[#F2A93B]/90 backdrop-blur-sm text-[#0B2545] text-[11px] font-bold px-3 py-1.5 rounded-full">
//                     {course.level}
//                   </span>
//                   <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
//                 </div>

//                 {/* Content */}
//                 <div className="p-5 md:p-6">
//                   <h3 className="font-sora font-bold text-[#0B2545] text-base leading-snug mb-2 line-clamp-1 group-hover:text-[#F2A93B] transition-colors">
//                     {course.title}
//                   </h3>
//                   <p className="text-gray-500 text-sm mb-4 line-clamp-2">
//                     {course.description}
//                   </p>
//                   <span className="inline-flex items-center text-[#F2A93B] font-semibold text-sm group-hover:text-[#0B2545] transition-all duration-300">
//                     Learn More
//                     <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Blog Main Content - Professional Design */}
//       <section className="bg-gray-50 py-16 md:py-24">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="text-center mb-12 md:mb-16">
//             <span className="inline-block bg-[#F2A93B]/10 text-[#F2A93B] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
//               Latest Articles
//             </span>
//             <h2 className="text-3xl md:text-4xl font-sora font-extrabold text-[#0B2545]">
//               From Our <span className="text-[#F2A93B]">Blog</span>
//             </h2>
//             <div className="w-16 h-1 bg-[#F2A93B] rounded-full mx-auto mt-4" />
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
//             {/* Left Side - Blog Posts */}
//             <div className="lg:col-span-2">
//               <FeaturedPost />
//               <div className="mt-10">
//                 <BlogGrid />
//               </div>
//               <div className="mt-10">
//                 <Pagination />
//               </div>
//             </div>

//             {/* Right Sidebar */}
//             <div className="lg:col-span-1">
//               <Sidebar />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Section - Professional */}
//       <Newsletter />

//       {/* CTA Section */}
//       <section className="py-16 md:py-20 bg-[#0B2545] relative overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F2A93B]/5 rounded-full blur-3xl" />
//         </div>
        
//         <div className="container mx-auto px-4 lg:px-8 text-center relative">
//           <h3 className="text-2xl md:text-3xl font-sora font-extrabold text-white mb-4">
//             Ready to Start Your <span className="text-[#F2A93B]">Journey</span>?
//           </h3>
//           <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-8">
//             Explore our training programs and build a successful career with practical skills
//           </p>
//           <Link
//             to="/courses"
//             className="inline-flex items-center gap-2 bg-[#F2A93B] hover:bg-[#e0993a] text-[#0B2545] font-bold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#F2A93B]/30 group"
//           >
//             Explore Courses
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Blog;