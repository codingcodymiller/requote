import React, { Dispatch, SetStateAction } from 'react';
import { Editor } from '@tinymce/tinymce-react';

type RichTextEditorProps = {
  id: string;
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export default function RichTextEditor({ id, placeholder, value, onChange }: RichTextEditorProps) {
  return (
    <Editor
      apiKey={process.env.TINYMCE_KEY}
      id={id}
      init={{
        placeholder,
        height: 500,
        menubar: false,
        statusbar: false,
        plugins: [
          'advlist', 'anchor', 'autolink', 'charmap',
          'code', 'help', 'link', 'lists',
          'searchreplace', 'visualblocks',
        ],
        toolbar: 'h1 h2 | ' +
          'bold italic strikethrough underline | alignleft aligncenter | ' +
          'bullist numlist blockquote | link | ' +
          'undo redo | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      value={value}
      onEditorChange={onChange}
    />
  );
}
