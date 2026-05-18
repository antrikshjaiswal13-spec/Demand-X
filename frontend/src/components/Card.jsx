import React from 'react'

function Card({ children, className = '', icon: Icon = null, title = '', hover = true }) {
  return (
    <div 
      className={`
        card 
        ${hover ? 'cursor-pointer group' : ''} 
        ${className}
      `}
    >
      {Icon && (
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mb-6 group-hover:scale-110 transition">
          <Icon size={28} className="text-cyan-400" />
        </div>
      )}
      
      {title && (
        <h3 className="text-2xl font-bold mb-4">
          {title}
        </h3>
      )}
      
      {children}
    </div>
  )
}

export default Card
