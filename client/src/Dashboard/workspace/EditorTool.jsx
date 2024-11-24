import React, { useCallback, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

export default function EditorTool() {
  const roleMode = useSelector((state) => state.Mode);
  const [content, setContent] = useState("");

  const previewFrame = useRef();

  function handleEditorChange(content, editor) {
    setContent(content);
  }

  useEffect(() => {
    if (!roleMode.isEditable) {
      previewFrame.current.contentWindow.document.open();
      previewFrame.current.contentWindow.document.write(content);
      previewFrame.current.contentWindow.document.close();
    }
  }, [roleMode]);

  return roleMode.mode === "Editor" ? (
    <Editor
      onEditorChange={(content, editor) => {
        handleEditorChange(content, editor);
      }}
      value={content}
      apiKey={import.meta.env.VITE_EDITOR_TOOL_API}
      init={{
        plugins: [
          // Core editing features
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
          // Your account includes a free trial of TinyMCE premium features
          // Try the most popular premium features until Dec 8, 2024:
          "checklist",
          "mediaembed",
          "casechange",
          "export",
          "formatpainter",
          "pageembed",
          "a11ychecker",
          "tinymcespellchecker",
          "permanentpen",
          "powerpaste",
          "advtable",
          "advcode",
          "editimage",
          "advtemplate",
          "ai",
          "mentions",
          "tinycomments",
          "tableofcontents",
          "footnotes",
          "mergetags",
          "autocorrect",
          "typography",
          "inlinecss",
          "markdown",
          // Early access to document converters
          "importword",
          "exportword",
          "exportpdf",
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
        exportpdf_converter_options: {
          format: "Letter",
          margin_top: "1in",
          margin_right: "1in",
          margin_bottom: "1in",
          margin_left: "1in",
        },
        exportword_converter_options: { document: { size: "Letter" } },
        importword_converter_options: {
          formatting: {
            styles: "inline",
            resets: "inline",
            defaults: "inline",
          },
        },
        placeholder: "Type here...",
        height: 500,
        resize: false,
        // editable_root: roleMode.isEditable,
      }}
    />
  ) : (
    <div className="relative w-full">
      <iframe
        ref={previewFrame}
        className="w-full p-5 border border-dashed shadow-sm rounded-md h-[500px] overflow-y-scroll"
      ></iframe>
      <Badge className="absolute -top-2 left-5 shadow-sm" variant={"secondary"}>
        Preview
      </Badge>
    </div>
  );
}
