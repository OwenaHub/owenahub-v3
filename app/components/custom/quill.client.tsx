import type { ComponentProps } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

type ReactQuillProps = ComponentProps<typeof ReactQuill>;
type Props = Pick<
    ReactQuillProps,
    "onChange" | "placeholder" | "theme" | "value"
>;

const modules = {
    toolbar: [
        [{ font: [] }], // Font selection
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header sizes
        [{ size: [] }], // Font size
        ["bold", "italic", "underline", "strike"], // Formatting
        [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
        ["blockquote", "code-block"], // Blockquote & Code Block
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ], // Lists & Indentation
        [{ direction: "rtl" }], // Text direction
        [{ align: [] }], // Text alignment
        [{ color: [] }, { background: [] }], // Color picker
        ["link", "image", "video", "formula"], // Media and formulas
        ["clean"], // Remove formatting
    ],
};

export function TextEditor(props: Props) {
    return <ReactQuill {...props} modules={modules} />;
}
