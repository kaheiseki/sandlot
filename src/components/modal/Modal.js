import React from 'react'

export const Modal = ({showModal, setShowModal}) => {
  return (
    <div>
      {showModal ? <div>Modal</div> : null};
    </div>
  )
}
