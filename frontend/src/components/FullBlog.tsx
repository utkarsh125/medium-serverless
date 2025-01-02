import { Avatar } from "./BlogCard";
import { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  // Format the date nicely
  const publishDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content container */}
        <div className="grid grid-cols-12 gap-8 py-12">
          {/* Article content */}
          <div className="col-span-12 lg:col-span-8">
            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              {blog.title}
            </h1>

            {/* Author info - mobile */}
            <div className="lg:hidden flex items-center space-x-3 mb-6">
              <Avatar name={blog.author?.name || "Anonymous"} />
              <div>
                <div className="font-semibold text-gray-900">
                  {blog.author?.name || "Anonymous"}
                </div>
                <div className="text-sm text-gray-500">
                  {publishDate} · {Math.ceil(blog.content.length / 1000)} min read
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Author sidebar */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar name={blog.author?.name || "Anonymous"} />
                  <div>
                    <div className="font-semibold text-xl text-gray-900">
                      {blog.author?.name || "Anonymous"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.ceil(blog.content.length / 1000)} min read
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 text-sm">
                  Passionate writer sharing insights about technology, culture, and innovation.
                  Follow along for more stories about {blog.title.split(' ')[0].toLowerCase()}.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};