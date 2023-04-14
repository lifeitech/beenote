'use client';
import { Editor } from '@tiptap/core'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Placeholder from '@tiptap/extension-placeholder'
import EditorAI from './EditorAI';
import EditorSave from './EditorSave';
import 'remixicon/fonts/remixicon.css'

const MenuBar = ({ editor }:{editor:Editor}) => {
  if (!editor) {
    return null
  }  
  const addImage = () => {
    const url = window.prompt('URL');
    if (url) {editor.chain().focus().setImage({ src: url }).run()}
    }

  const addYoutubeVideo = () => {
  const url = prompt('Enter YouTube URL')

  if (url) {editor.commands.setYoutubeVideo({src: url})}
  }

  const buttonStyle="h-8 w-8 p-0 m-0 hover:box-content hover:rounded-lg hover:bg-black hover:text-white";
  const active = "box-content rounded-lg bg-black text-white";

  return (
    <div className="flex flex-wrap text-xl ml-2">

    <button title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive('bold') ? active : ''} ` + buttonStyle}
      ><i className="ri-bold"></i></button>

      <button title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${editor.isActive('italic') ? active : ''} ` + buttonStyle}
      ><i className="ri-italic"></i></button>

      <button title="Strike"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${editor.isActive('strike') ? active : ''} ` + buttonStyle}
      ><i className="ri-strikethrough"></i></button>

      <button title="Code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`${editor.isActive('code') ? active : ''} ` + buttonStyle}
      ><i className="ri-code-line"></i></button>

      <button title="Highlight"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`${editor.isActive('highlight') ? active : ''} ` + buttonStyle}
      ><i className="ri-mark-pen-line"></i></button>

      <div className="divider divider-horizontal"></div>

      <button title="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${editor.isActive('heading', { level: 1 }) ? active : ''} ` + buttonStyle}
      ><i className="ri-h-1"></i></button>

      <button title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${editor.isActive('heading', { level: 2 }) ? active : ''} ` + buttonStyle}
      ><i className="ri-h-2"></i></button>

      <button title="Heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${editor.isActive('heading', { level: 3 }) ? active : ''} ` + buttonStyle}
      ><i className="ri-h-3"></i></button>

      <button title="Heading 4"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${editor.isActive('heading', { level: 4 }) ? active : ''} ` + buttonStyle}
      ><i className="ri-h-4"></i></button>

      <button title="Heading 5"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${editor.isActive('heading', { level: 5 }) ? active : ''} ` + buttonStyle}
      ><i className="ri-h-5"></i></button>

      <button title="Paragraph"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${editor.isActive('paragraph') ? active : ''} ` + buttonStyle}
      ><i className="ri-paragraph"></i></button>
      
      <button title="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive('bulletList') ? active : ''} ` + buttonStyle}
      ><i className="ri-list-unordered"></i></button>
      
      <button title="Ordered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${editor.isActive('orderedList') ? active : ''} ` + buttonStyle}
      ><i className="ri-list-ordered"></i></button>
      
      <button title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${editor.isActive('blockquote') ? active : ''} ` + buttonStyle}
      ><i className="ri-double-quotes-l"></i></button>
      
      <button title="Horizontal Rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={buttonStyle}
      ><i className="ri-separator"></i></button>

      <div className="divider divider-horizontal"></div>
            
      <button title="Insert Table"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className={buttonStyle}
      >
        <i className="ri-table-line"></i>
      </button>

      <button title="Delete Table"
        onClick={() => editor.chain().focus().deleteTable().run()}
        className={buttonStyle}
      >
      <i className="ri-delete-back-2-line"></i>
      </button>

      <button title="Add Row After"
        onClick={() => editor.chain().focus().addRowAfter().run()}
        className={buttonStyle}
        >
        <i className="ri-layout-row-line"></i>
      </button>

      <button title="Delete Row"
         onClick={() => editor.chain().focus().deleteRow().run()}
         className={buttonStyle}
         >
         <i className="ri-delete-row"></i>

      </button>

      <button title="Add Image"
      onClick={addImage}
      className={`${editor.isActive('image') ? active : ''} ` + buttonStyle}
      >
      <i className="ri-image-fill"></i>
      </button>

      <button title="Add YouTube Videos"
      onClick={addYoutubeVideo}
      className={`${editor.isActive('video') ? active : ''} ` + buttonStyle}
      >
      <i className="ri-youtube-line"></i>
      </button>

      <div className="divider divider-horizontal"></div>

      <button title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={"disabled:opacity-75 " + buttonStyle}
      >
        <i className="ri-arrow-go-back-fill"></i>
      </button>
      
      <button title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={"disabled:opacity-75 " + buttonStyle}
      >
        <i className="ri-arrow-go-forward-fill"></i>
      </button>

    </div>
    )

}


const Tiptap = ({content, collection, id}:{content:JSON, collection:string, id:string}) => {
  
  const editor = useEditor({
    extensions: [
    StarterKit, 
    Highlight,
    Table.configure({resizable: true}),
    TableRow,
    TableHeader,
    TableCell,
    Image,
    Youtube.configure({controls: true,allowFullscreen: true, autoplay: false}),
    Placeholder.configure({
      placeholder: 'Press "Ctrl+/" for AI...',
    }),
    ],
    editorProps: {
    attributes: {class:'sm:max-w-[90%] lg:max-w-[70%] m-5 text-lg focus:outline-none selection:bg-secondary selection:text-secondary-content'},
            },
    content: content,
  })

  if (!editor) {
    return null
  }

  return (
    <div className='relative'>
      <EditorAI editor={editor}/>
      <div className=" sticky top-0 z-40 bg-base-100">
        <MenuBar editor={editor} />
        <div className="divider sticky top-10"></div>
      </div>
      <EditorContent editor={editor} />

      <div className='fixed right-20 bottom-10'>
        <EditorSave editor={editor} collection={collection} id={id}/>
      </div>
    </div>
  )
}

export default Tiptap;