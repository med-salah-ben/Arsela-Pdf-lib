import React, { useState } from 'react';
import "./ContainerPDF.css";
import LeftSide from '../IntroductionSide/IntroductionSide';
import PDFContainerSide from '../PDFContainerSide/PDFContainerSide';

//ContainerPDF
const ContainerPDF = () => {
  const [showPDF, setShowPDF] = useState(false);
  console.log(showPDF)
  const handleEdit = ()=>{
    setShowPDF(!showPDF)
  }
  return (
    // ContainerPDF
    <div className='start_component'>
  
        <div className='side_introduction'>
            <LeftSide showPDF={showPDF} handleEdit={handleEdit} />
        </div>

        <div className='right_side'>
            <PDFContainerSide showPDF={showPDF} />
            {/* InitPDFSide */}

        </div>
    </div>
  )
}

export default ContainerPDF