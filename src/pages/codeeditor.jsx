import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { xml } from "@codemirror/lang-xml";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { useUser } from "@clerk/clerk-react";
import { Pencil } from "lucide-react";
import { FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";

const CodeEditor = () => {
  const { user } = useUser();
  const [fileName, setFileName] = useState("Untitled");
  const [isEditing, setIsEditing] = useState(false);
  const [html, setHtml] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("<html></html>");
  const [imageSrc, setImageSrc] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head><style>${cssCode}</style></head>
          <body>${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, cssCode, js]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRename = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      setIsEditing(false);
      if (!fileName.trim()) setFileName("Untitled");
    }
  };

  const handleSave = () => {
    localStorage.setItem("htmlCode", html);
    localStorage.setItem("cssCode", cssCode);
    localStorage.setItem("jsCode", js);
    alert("Code saved successfully!");
  };

  const handleLoad = () => {
    setHtml(localStorage.getItem("htmlCode") || "");
    setCssCode(localStorage.getItem("cssCode") || "");
    setJs(localStorage.getItem("jsCode") || "");
  };

  const handleClear = () => {
    setHtml("");
    setCssCode("");
    setJs("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setHtml((prevHtml) => prevHtml + `<img src="${reader.result}" alt="Uploaded Image" width="300" />`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const codeContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
    <style>${cssCode}</style>
</head>
<body>
    ${html}
    <script>${js}</script>
</body>
</html>
`;
    const blob = new Blob([codeContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName || "index"}.html`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 relative">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-xl">📦</div>
        {isEditing ? (
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onKeyDown={handleRename}
            onBlur={handleRename}
            autoFocus
            className="bg-transparent border-b border-gray-500 focus:outline-none text-xl font-bold"
          />
        ) : (
          <h2 className="text-xl font-bold flex items-center gap-1">
            {fileName}
            <Pencil size={16} className="cursor-pointer hover:text-blue-400" onClick={() => setIsEditing(true)} />
          </h2>
        )}
        <p className="text-gray-400 text-sm">{user ? user.fullName : "Guest"}</p>
      </div>

      <div className="absolute top-4 right-4" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-6 py-2 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Tools ▼
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg w-48 p-2 z-50">
            <button onClick={handleSave} className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded">
              Save Code
            </button>
            <button onClick={handleLoad} className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded">
              Load Previous Code
            </button>
            <button onClick={handleClear} className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded">
              Clear Code
            </button>
            <button onClick={handleDownload} className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded">
              Download Code
            </button>
            <label className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded cursor-pointer">
              Upload Image
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><FaHtml5 /> HTML</h2>
          <CodeMirror value={html} height="200px" theme={dracula} extensions={[xml()]} onChange={setHtml} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><FaCss3Alt /> CSS</h2>
          <CodeMirror value={cssCode} height="200px" theme={dracula} extensions={[css()]} onChange={setCssCode} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><FaJs /> JavaScript</h2>
          <CodeMirror value={js} height="200px" theme={dracula} extensions={[javascript()]} onChange={setJs} />
        </div>
      </div>

      <div className="mt-4 border-2 border-gray-700 rounded-lg overflow-hidden">
        <iframe title="Live Preview" srcDoc={srcDoc} className="w-full h-72 bg-white"></iframe>
      </div>
    </div>
  );
};

export default CodeEditor;
