import { useState } from "react";


interface ModalProps {
  onClose: () => void;
}


const FinalModal = ({onClose}: ModalProps) => {
 

  return (
  <div 
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
  onClick={onClose}
  >
    <div className="bg-white p-4 rounded" >
      <button onClick={onClose}>아니오</button>
    </div>
  </div>
  )
}

export default FinalModal;
