import React from 'react'
import "./PDFContainerSide.css"
import InitPDFSide from '../InitPDFSide/InitPDFSide'

const PDFContainerSide = () => {
  return (
    <>
            <div className='part_one'>
                <InitPDFSide />
            </div>
            {/* EditorPDFSide */}
            <div className='part_two'>
            </div>
    </>
  )
}

export default PDFContainerSide