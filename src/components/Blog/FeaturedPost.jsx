import { ArrowRight } from "lucide-react";

const FeaturedPost = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <img
            src="https://images.unsplash.com/photo-1516245834210-c4c6f3f0d6b7?w=1200"
            alt=""
            className="rounded-3xl shadow-xl"
          />

          <div>
            <span className="bg-red-700 text-white px-4 py-2 rounded-full text-sm">
              Featured Story
            </span>

            <h2 className="text-4xl font-bold mt-6 mb-5">
              Skills That Create Livelihoods—From Safety to Employability
            </h2>

            <p className="text-gray-600 leading-8 mb-8">
              Explore our course modules and learn practical, job-ready training—whether it’s salon hygiene, customer experience, electrical safety, or workshop diagnostics.
              Every learning journey is designed to build confidence and real-world competence.
            </p>

            <button className="bg-red-700 text-white px-8 py-4 rounded-full hover:bg-red-800 duration-300 flex items-center gap-2">
              Learn More
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;

