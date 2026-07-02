import { Calendar, ArrowRight } from "lucide-react";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300">

      <img
        src={blog.image}
        alt=""
        className="h-60 w-full object-cover"
      />

      <div className="p-7">

        <div className="flex items-center gap-2 text-red-700 mb-3">

          <Calendar size={18} />

          {blog.date}

        </div>

        <h3 className="text-2xl font-semibold mb-4">

          {blog.title}

        </h3>

        <p className="text-gray-600 mb-6">

          {blog.desc}

        </p>

        <button className="text-red-700 flex items-center gap-2 font-semibold">

          Read More

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
};

export default BlogCard;