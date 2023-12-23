import React, { useState } from 'react';
import "./ContainerPDF.css";
import LeftSide from '../IntroductionSide/IntroductionSide';
import PDFContainerSide from '../PDFContainerSide/PDFContainerSide';

//ContainerPDF
const ContainerPDF = () => {
  // const [showPDF, setShowPDF] = useState(false);
  return (
    // ContainerPDF
    <div className='start_component'>
  
        <div className='side_introduction'>
            <LeftSide />
        </div>

        <div className='right_side'>
            <PDFContainerSide />
            {/* InitPDFSide */}

        </div>
    </div>
  )
}

export default ContainerPDF