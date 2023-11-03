'use client'
import { ToastContainer, toast, ToastClassName, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const contextClass = {
  success: 'bg-green-900',
  error: 'bg-red-900',
  info: 'bg-stone-600',
  warning: 'bg-yellow-700',
  default: 'bg-stone-600',
}

const getToastClassName: ToastClassName = (context = {}) => {
  const { type } = context
  const className = contextClass[type || 'default']
  return `${className} relative flex px-2 py-3 text-[14px] lg:text-[15px] mb-2 min-h-10 lg:min-h-14 lg:rounded-md justify-between overflow-hidden cursor-pointer`
}

export const ToastContainerWrapper = () => (
  <ToastContainer
    transition={Slide}
    position={toast.POSITION.TOP_CENTER}
    hideProgressBar
    theme="colored"
    autoClose={3500}
    toastClassName={getToastClassName}
  />
)
