import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function QuillEditor({ value, onChange }) {
    const modules = {
        toolbar: [
            [{ header: [1,2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
        ],
    };

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            style={{ height: "150px" }}
        />
    )
}