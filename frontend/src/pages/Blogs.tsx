import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="mt-5">
                    <div>Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center p-4 border-b border-slate-200">
                <div>
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author?.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            createdAt={blog.createdAt}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
