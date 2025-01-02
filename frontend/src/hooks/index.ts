//@ts-nocheck
import { useEffect, useState } from "react";

import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
    } | null;
    createdAt: string; // Adjusted to match backend response
}

// export const useBlogSingle = ({ id }: { id: string }) => {
//     const [loading, setLoading] = useState(true);
//     const [blog, setBlog] = useState<Blog | null>(null);

//     useEffect(() => {
//         const fetchBlog = async () => {
//             try {
//                 const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
//                     headers: {
//                         Authorization: localStorage.getItem("token"),
//                     },
//                 });
//                 setBlog(res.data.blog);
//             } catch (err) {
//                 console.error("Error while fetching single blog: ", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBlog();
//     }, [id]);

//     return {
//         loading,
//         blog,
//     };
// };


export const useBlogSingle = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });
                const blogs = res.data.blog;
                setBlog(blogs.length > 0 ? blogs[0] : null); // Handle case where no blog is returned
            } catch (err) {
                console.error("Error while fetching single blog: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return {
        loading,
        blog,
    };
};

export const useBlog = ({id} : {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            // const unparsedToken = localStorage.getItem("token");

            // const token = JSON.parse(unparsedToken || "");
            // console.log(token);

            // if (!token) {
            //     console.error("No token found. Redirecting to login.");
            //     setLoading(false);
            //     return;
            // }

            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
                setBlogs(res.data.blogs);
            } catch (err) {
                console.error("Error fetching data:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllBlogs();
    }, []);

    return {
        loading,
        blogs,
    };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            // const unparsedToken = localStorage.getItem("token");

            // const token = JSON.parse(unparsedToken || "");
            // console.log(token);

            // if (!token) {
            //     console.error("No token found. Redirecting to login.");
            //     setLoading(false);
            //     return;
            // }

            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`);
                setBlogs(res.data.blogs);
            } catch (err) {
                console.error("Error fetching data:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllBlogs();
    }, []);

    return {
        loading,
        blogs,
    };
};