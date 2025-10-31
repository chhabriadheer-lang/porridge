import { useBlogById } from '../hooks/useBlog';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

interface BlogDetailProps {
  blogId: string;
  onNavigate: (page: string) => void;
}

export default function BlogDetail({ blogId, onNavigate }: BlogDetailProps) {
  const { blog, loading } = useBlogById(blogId);

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
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <p className="text-center text-gray-600">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Blog not found</h2>
          <button
            onClick={() => onNavigate('blog')}
            className="text-accent hover:text-accent/80 transition-colors flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft size={20} />
            <span>Back to blogs</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <button
          onClick={() => onNavigate('blog')}
          className="mb-12 text-accent hover:text-accent/80 transition-colors flex items-center space-x-2 font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to blogs</span>
        </button>

        <article className="mb-16">
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={18} />
                <span>{getDayOfWeek(blog.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full">
                <Tag size={16} />
                <span className="text-accent font-semibold">{blog.category}</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6">
              {blog.title}
            </h1>
          </header>

          <div className="prose prose-lg max-w-none">
            <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
              {blog.body}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
