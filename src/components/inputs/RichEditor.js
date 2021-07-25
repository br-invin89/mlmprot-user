import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default ({ value, onChange }) => {
  return (
    <CKEditor
      editor={ ClassicEditor }
      data={value}
      onInit={ editor => {
      } }
      onChange={ ( event, editor ) => {
        const data = editor.getData()
        if (onChange) onChange(data)
      } }
      onBlur={ ( event, editor ) => {
        
      } }
      onFocus={ ( event, editor ) => {
      } }
    />
  )
}
