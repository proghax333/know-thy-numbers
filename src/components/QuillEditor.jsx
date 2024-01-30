import React, { useState, useEffect, useRef, useCallback } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import "../index.css"

// const QuillEditor = ({ value, onChange }) => {
//   const [quill, setQuill] = useState()

//   useEffect(() => {
//     if(quill) {

//         quill.root.innerHTML = value || '';
    
//         const handleTextChange = () => {
//           console.log(quill.root)
//           let d = quill.root.innerHTML
//           onChange(d);
//         };
    
//         quill.on('text-change', handleTextChange);
    
//         return () => {
//           // Remove only the 'text-change' event listener
//           quill.off('text-change', handleTextChange);
//         };
//     }
//   }, [quill, value, onChange]);

//   const wrapperRef = useCallback(wrapper => {
//     if (wrapper == null) return

//     wrapper.innerHTML = ""
//     const editor = document.createElement("div")
//     wrapper.append(editor)
//     wrapper.setAttribute('dir', 'ltr');
//     const q = new Quill(editor, {
//       theme: "snow",
//     })

//     q.format('direction', 'ltr');
//     q.format('align', 'left');

//     // q.root.setAttribute('dir', 'rtl');

//     setQuill(q)
//   }, [])

//   return <div ref={wrapperRef} />;
// };

const QuillEditor = ({ value, onChange }) => {
  const containerRef = useRef(null);
  const lastChangeRef = useRef(null);

  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if (!quill) {
      return;
    }

    if (value !== lastChangeRef.current) {
      quill.root.innerHTML = value || "";
    }
  }, [quill, value]);

  useEffect(() => {
    if (!quill) {
      return;
    }

    function handleChange() {
      const contents = quill.root.innerHTML;
      lastChangeRef.current = contents;

      console.log("HERE!");

      if (onChange) {
        onChange(contents);
      }
    }

    quill.on("text-change", handleChange);

    return () => {
      quill.off("text-change", handleChange);
    };
  }, [quill, onChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const editorElement = document.createElement("div");
    container.append(editorElement);
    let quill = new Quill(editorElement, {
      theme: "snow",
    });

    quill.root.innerHTML = value || "";

    setQuill(quill);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default QuillEditor;
