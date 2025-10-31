import { useBlogs } from '../hooks/useBlog';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

interface BlogProps {
  onNavigate: (page: string, blogId?: string) => void;
}

export default function Blog({ onNavigate }: BlogProps) {
  const { blogs, loading } = useBlogs();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
            Insights & Ideas
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Explore our thoughts on branding, growth, and creative partnerships.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No blogs available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => onNavigate('blog-detail', blog.id)}
                className="group cursor-pointer bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-accent hover:shadow-lg transition-all"
              >
                <div className="p-8 h-full flex flex-col">
                  <div className="flex items-center space-x-4 mb-4 text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Calendar size={16} />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                      <Tag size={14} />
                      <span className="text-gray-700 font-medium">{blog.category}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-accent transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {blog.body}
                  </p>

                  <div className="flex items-center space-x-2 text-accent font-medium group-hover:translate-x-1 transition-transform">
                    <span>Read more</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
