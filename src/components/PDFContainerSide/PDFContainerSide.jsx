import React from 'react'
import "./PDFContainerSide.css"
import InitPDFSide from '../InitPDFSide/InitPDFSide'

const PDFContainerSide = ({showPDF}) => {
  return (
    <>
            <div className='part_one'>
                <InitPDFSide showPDF={showPDF} />
            </div>
            {/* EditorPDFSide */}
            <div className='part_two'>
            </div>
    </>
  )
}

export default PDFContainerSide