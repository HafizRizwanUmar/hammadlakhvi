import React, { useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// Register custom fonts
const Font = Quill.import('formats/font');
Font.whitelist = ['sans-serif', 'serif', 'monospace', 'jameel-noori', 'arabic-calligraphy'];
Quill.register(Font, true);

const RichTextEditor = ({ value, onChange, placeholder, style, lang }) => {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'font': ['sans-serif', 'serif', 'monospace', 'jameel-noori', 'arabic-calligraphy'] }],
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'direction': 'rtl' }, { 'align': [] }],
      ['link', 'clean'],
    ],
  }), []);

  return (
    <ReactQuill 
      theme="snow"
      value={value || ''}
      onChange={onChange}
      modules={modules}
      placeholder={placeholder}
      className={lang === 'urdu' ? 'urdu' : ''}
      style={style}
    />
  );
};

export default RichTextEditor;
