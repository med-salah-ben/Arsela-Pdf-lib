import "./PdfEditor.css";
import { useRef, useState } from "react";
import Drop from "../../Drop";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb } from "pdf-lib";
import { blobToURL } from "../../utils/Utils";
import PagingControl from "../../components/PagingControl/PagingControl";
import { AddSigDialog } from "../../components/AddSigDialog/AddSigDialog";
import { BigButton } from "../../components/BigButton/BigButton";
import DraggableSignature from "../../components/DraggableSignature/DraggableSignature";
import DraggableText from "../../components/DraggableText/DraggableText";
import TextLogo from "../../assets/text-editor.png";
import ImageLogo from "../../assets/image.png";
import dayjs from "dayjs";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function App() {
  const styles = {
    container: {
      maxWidth: 502,
      margin: "0 auto",
      zIndex: 6,

    },
    sigBlock: {
      display: "inline-block",
      border: "1px solid #000",
    },
    documentBlock: {
      maxWidth: 500,
      margin: "20px auto",
      marginTop: 8,
      border: "1px solid #999",
    },
    controls: {
      maxWidth: 500,
      margin: "0 auto",
      marginTop: 8,
    },
  };
  const [pdf, setPdf] = useState(null);
  const [autoDate, setAutoDate] = useState(true);
  const [signatureURL, setSignatureURL] = useState(null);
  const [position, setPosition] = useState(null);
  const [signatureDialogVisible, setSignatureDialogVisible] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState(null);
  const documentRef = useRef(null);

  return (
    <>
      {/* <Header /> */}
      <div style={styles.container}>
        {signatureDialogVisible ? (
          <AddSigDialog
            autoDate={autoDate}
            setAutoDate={setAutoDate}
            onClose={() => setSignatureDialogVisible(false)}
            onConfirm={(url) => {
              setSignatureURL(url);
              setSignatureDialogVisible(false);
            }}
          />
        ) : null}

        {!pdf ? (
          <Drop
            onLoaded={async (files) => {
              const URL = await blobToURL(files[0]);
              setPdf(URL);
            }}
          />
        ) : null}
        {pdf ? (
          <div>
            <div style={styles.controls}>
              <BigButton
                marginRight={8}
                title={"Text"}
                logo={TextLogo}
                onClick={() => setTextInputVisible(true)}
              />

              <BigButton
                marginRight={8}
                title={"Image"}
                logo={ImageLogo}
                onClick={() => setSignatureDialogVisible(true)}
              />
            </div>
            <div ref={documentRef} style={styles.documentBlock}>
              {textInputVisible ? (
                <DraggableText
                  initialText={
                    textInputVisible === "date"
                      ? dayjs().format("M/d/YYYY")
                      : null
                  }
                  onCancel={() => setTextInputVisible(false)}
                  onEnd={setPosition}
                  onSet={async (text) => {
                    const { originalHeight, originalWidth } = pageDetails;
                    const scale =
                      originalWidth / documentRef.current.clientWidth;

                    const y =
                      documentRef.current.clientHeight -
                      (position.y +
                        12 * scale -
                        position.offsetY -
                        documentRef.current.offsetTop);
                    const x =
                      position.x -
                      80 -
                      position.offsetX -
                      documentRef.current.offsetLeft;

                    // new XY in relation to actual document size
                    const newY =
                      8 +
                      (y * originalHeight) / documentRef.current.clientHeight;
                    const newX =
                      (x * originalWidth) / documentRef.current.clientWidth;

                    const pdfDoc = await PDFDocument.load(pdf);

                    const pages = pdfDoc.getPages();
                    const firstPage = pages[pageNum];

                    firstPage.drawText(text, {
                      x: newX,
                      y: newY,
                      size: 10 * scale,
                    });

                    const pdfBytes = await pdfDoc.save();
                    const blob = new Blob([new Uint8Array(pdfBytes)]);

                    const URL = await blobToURL(blob);
                    setPdf(URL);
                    setPosition(null);
                    setTextInputVisible(false);
                  }}
                />
              ) : null}
              {signatureURL ? (
                <DraggableSignature
                  url={signatureURL}
                  onCancel={() => {
                    setSignatureURL(null);
                  }}
                  onSet={async () => {
                    const { originalHeight, originalWidth } = pageDetails;
                    const scale =
                      originalWidth / documentRef.current.clientWidth;

                    const y =
                      documentRef.current.clientHeight -
                      (position.y -
                        390 -
                        position.offsetY +
                        documentRef.current.offsetTop);
                    const x =
                      position.x -
                      60 -
                      position.offsetX -
                      documentRef.current.offsetLeft;

                    // new XY in relation to actual document size
                    const newY =
                      (y * originalHeight) / documentRef.current.clientHeight;
                    const newX =
                    
                      (x * originalWidth) / documentRef.current.clientWidth;

                    const pdfDoc = await PDFDocument.load(pdf);

                    const pages = pdfDoc.getPages();
                    const firstPage = pages[pageNum];

                    const pngImage = await pdfDoc.embedPng(signatureURL);
                    const pngDims = pngImage.scale(scale * 0.3);

                    firstPage.drawImage(pngImage, {
                      x: newX,
                      y: newY ,
                      width: pngDims.width - 85,
                      height: pngDims.height - 30,
                    });

                    if (autoDate) {
                      firstPage.drawText(
                        `Signed ${dayjs().format("M/d/YYYY HH:mm:ss ZZ")}`,
                        {
                          x: newX,
                          y: newY - 10,
                          size: 6 * scale,
                          color: rgb(0.074, 0.545, 0.262),
                        }
                      );
                    }

                    const pdfBytes = await pdfDoc.save();
                    const blob = new Blob([new Uint8Array(pdfBytes)]);

                    const URL = await blobToURL(blob);
                    setPdf(URL);
                    setPosition(null);
                    setSignatureURL(null);
                  }}
                  onEnd={setPosition}
                />
              ) : null}

              <Document
                file={pdf}
                onLoadSuccess={(data) => {
                  setTotalPages(data.numPages);
                }}
              >
                <Page
                  pageNumber={pageNum + 1}
                  width={500}

                  onLoadSuccess={(data) => {
                    setPageDetails(data);
                  }}
                />
              </Document>
            </div>

            <PagingControl
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPages={totalPages}
            />
          </div>
        ) : null}
        {pdf ? (
          <BigButton
            marginRight={8}
            inverted={true}
            title={"Export"}
            onClick={() => {
              downloadURI(pdf, "file.pdf");
            }}
          />
        ) : null}
      </div>
    </>
  );
}

export default App;
