//@ts-nocheck
import { ChangeEvent, useState } from "react";

import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handlePublish() {
        try {
            const token = localStorage.getItem("token");
            console.log("TOKEN IS --->", token);
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/publish`, {
                title,
                content: description
            }, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem("token") || "")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing blog:", error);
            console.log("Error Response: ", error.response?.data);
            alert("Failed to publish blog");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full px-4">
                    <div className="relative flex items-center mb-4">
                        <div className="text-purple-500 text-4xl font-bold mr-4">+</div>
                        <input 
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" 
                            className="w-full bg-transparent text-gray-900 text-xl font-medium focus:outline-none focus:ring-0" 
                            placeholder="Title" 
                        />
                    </div>
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />
                    <button 
                        onClick={handlePublish}
                        disabled={loading || !title || !description}
                        type="submit" 
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg focus:ring-4 focus:ring-purple-300 hover:bg-gradient-to-br disabled:opacity-50"
                    >
                        {loading ? 'Publishing...' : 'Publish post'}
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between">
                    <div className="my-2 w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea 
                            onChange={onChange} 
                            id="editor" 
                            rows={8} 
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-transparent pl-2 resize-none" 
                            placeholder="Write an article..." 
                            required 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
