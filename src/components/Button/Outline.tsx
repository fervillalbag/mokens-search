import React from 'react'

interface OutlineIprops {
  type?: 'submit' | 'reset' | 'button'
  onClick: () => void
  children: React.ReactChild
}

const Outline: React.FC<OutlineIprops> = ({
  children,
  onClick,
  type,
  ...rest
}) => {
  return (
    <button
      className="absolute right-4 top-[50%] translate-y-[-50%] text-sm text-slate-500"
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Outline
