import React from 'react'

interface ErrorIprops {
  text: string
}

const Error: React.FC<ErrorIprops> = ({ text }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <span className="block">{text}</span>
    </div>
  )
}

export default Error
