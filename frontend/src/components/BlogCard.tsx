import { Link } from "react-router-dom";
import React from 'react';

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  tags?: string[];
  readTime?: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  id,
  authorName,
  title,
  content,
  createdAt,
  tags = [],
  readTime
}) => {
  return (
    <div className="w-full flex font-roboto justify-center mb-8">
      <Link to={`/blog/${id}`} className="min-w-[350px] w-[95vw] lg:w-[1200px]">
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-0.5 transition-all hover:scale-[1.01]">
          <div className="relative bg-white p-8 rounded-xl min-h-[200px]">
            {/* Tags and Read Time */}
            <div className="flex flex-wrap gap-3 mb-6">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 text-sm bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
              {readTime && (
                <span className="px-4 py-1.5 text-sm bg-gray-100 rounded-full text-gray-600">
                  {readTime} min read
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-lora font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
              {title}
            </h2>

            {/* Content Preview */}
            <p className="text-gray-600 mb-6 line-clamp-3 text-lg">
              {content}
            </p>

            {/* Author and Date */}
            <div className="flex items-center space-x-4">
              <Avatar name={authorName} />
              <div>
                <div className="font-medium text-gray-900 text-lg">{authorName}</div>
                <div className="text-sm text-gray-500">
                  {new Date(createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="w-[48px] h-[48px] relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
      <span className="font-medium text-white text-base">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
};