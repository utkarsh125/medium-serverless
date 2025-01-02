import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="mt-5 mx-5">
                    <div>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center mt-5 border-slate-200 mx-5">
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
