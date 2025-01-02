import { ChangeEvent, useState } from "react";

import { Appbar } from "../components/Appbar"
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
                <div className="max-w-screen-lg w-full">
                    <input 
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                        placeholder="Title" 
                    />
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />
                    <button 
                        onClick={handlePublish}
                        disabled={loading || !title || !description}
                        type="submit" 
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-blue-800 disabled:opacity-50"
                    >
                        {loading ? 'Publishing...' : 'Publish post'}
                    </button>
                </div>
            </div>
        </div>
    )
}

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea 
                            onChange={onChange} 
                            id="editor" 
                            rows={8} 
                            className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" 
                            placeholder="Write an article..." 
                            required 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}