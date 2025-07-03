// src/components/DescripcionEditor.jsx
import React, { useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

const EditorTextArea = ({ value, onChange }) => {
    const { quill, quillRef } = useQuill()
    const [touched, setTouched] = useState(false)

    // Cargar contenido inicial o externo
    useEffect(() => {
        if (quill && value && !touched) {
            quill.clipboard.dangerouslyPasteHTML(value)
        }
    }, [quill, value, touched])

    // Capturar cambios de usuario
    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setTouched(true)
                onChange(quill.root.innerHTML)
            })
        }
    }, [quill, onChange])

    return (
        <div className="bg-white  min-h-[200px]">
            <div ref={quillRef} />
        </div>
    )
}

export default EditorTextArea
