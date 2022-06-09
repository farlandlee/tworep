import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChevronLeft,
  faChevronRight 
} from '@fortawesome/pro-duotone-svg-icons'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function ViewPDF(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show first page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const { file } = props;

  return (
    <>
        {
          numPages > 1 &&
          <div className="d-flex p-2 justify-content-between">
            <Button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              Previous
            </Button>
            <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </p>
            <Button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </Button>
          </div>
        }
        
        <Document
            file={file}
            options={{ 
              workerSrc: "pdf.worker.js"
            }}
            onLoadError={console.error}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            <Page pageNumber={pageNumber} />
        </Document>
    </>
  );
}