import React from 'react'
import { Slide, ToastContainer } from 'react-toastify'

const ToastContainerCom = () => {
  return (
            <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
      />
  )
}

export default ToastContainerCom
