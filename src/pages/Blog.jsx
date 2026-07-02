import BlogHero from "../components/Blog/BlogHero";
import FeaturedPost from "../components/Blog/FeaturedPost";
import BlogGrid from "../components/Blog/BlogGrid";
import Sidebar from "../components/Blog/Sidebar";
import Newsletter from "../components/Blog/Newsletter";
import Pagination from "../components/Blog/Pagination";

const Blog = () => {
  return (
    <>
      <BlogHero />

      <FeaturedPost />

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Side */}
          <div className="lg:col-span-2">
            <BlogGrid />
            <Pagination />
          </div>

          {/* Right Sidebar */}
          <div>
            <Sidebar />
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
};

export default Blog;