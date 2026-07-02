import { Link } from "react-router-dom";

const BlogHero = () => {
  return (
    <section
      className="relative h-[350px] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative text-center text-white">
        <h1 className="text-5xl font-bold mb-4">
          Our Blog
        </h1>

        <div className="flex justify-center gap-2 text-lg">
          <Link to="/">Home</Link>

          <span>/</span>

          <span className="text-red-300">
            Blog
          </span>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;