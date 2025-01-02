import { ChangeEvent } from "react";

interface TextEditorProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    initialValue?: string;
}

export function TextEditor({ onChange, initialValue = "" }: TextEditorProps) {
    return (
        <div className="mt-4">
            <div className="w-full mb-4">
                <div className="bg-white rounded-lg shadow">
                    <div className="px-4 py-2 bg-white rounded-t-lg">
                        <textarea
                            id="content"
                            rows={8}
                            className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0"
                            placeholder="Write your post content here..."
                            defaultValue={initialValue}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TextEditor;