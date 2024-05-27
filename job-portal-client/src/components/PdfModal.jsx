import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Specify the root element for accessibility

const PdfModal = ({ isOpen, closeModal, pdfUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="PDF Modal"
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden"
      overlayClassName="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="w-full p-3">
        <iframe
          title="PDF Viewer"
          src={pdfUrl}
          width="520px"
          height="750px" 
        />
      </div>
      <button
        className="absolute bottom-5 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
        onClick={closeModal}
      >
        Close Modal
      </button>
    </Modal>
  );
};

export default PdfModal;
