import React from 'react';
import "./InitPDFSide.css"
import PdfEditor from "../../Pages/PdfEditor/PdfEditor"
const InitPDFSide = ({showPDF}) => {
  return (
    <div className='init_PDF_side'>
        <p className='pdf_editor_title'>PDF editor</p>
        <p className='pdf_editor_para'>Edit PDF files. Fill & sign PDF</p>
        {!showPDF ? <p className='start_editing'>To start Editing click on <span className='edit_span'>Edit a PDF</span></p> :<PdfEditor /> }
    </div>
  )
}

export default InitPDFSide