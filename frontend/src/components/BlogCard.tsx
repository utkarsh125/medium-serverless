import { Link } from "react-router-dom";

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    createdAt: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
    id,
    authorName,
    title,
    content,
    createdAt,
}) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 font-poppins border-b border-slate-200 pb-4 w-screen max-w-screen-lg cursor-pointer">
                <div className="flex items-center space-x-2">
                    <div className="flex justify-center flex-col">
                        <Avatar name={authorName} size={8} />
                    </div>
                    <div className="font-medium text-sm text-black pl-2">{authorName}</div>
                    <div className="flex justify-center flex-col pl-2">
                        <Circle />
                    </div>
                    <div className="pl-2 text-sm text-slate-500 font-light">
                        {new Date(createdAt).toDateString()}
                    </div>
                </div>

                <div className="font-bold text-2xl mt-2">{title}</div>

                <div className="text-md font-light mt-1 text-gray-700">
                    {content.slice(0, 100) + "..."}
                </div>

                <div className="w-full text-slate-500 text-sm font-light mt-1">{`${Math.ceil(
                    content.length / 100
                )} minute(s)`}</div>
            </div>
        </Link>
    );
};

function Circle() {
    return <div className="h-2 w-2 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size = 8 }: { name: string; size: number }) {
    const sizeClass = `w-${size} h-${size}`;

    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${sizeClass}`}
        >
            <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                {name[0].toUpperCase()}
            </span>
        </div>
    );
}
