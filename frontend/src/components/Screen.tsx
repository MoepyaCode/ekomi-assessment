import React from 'react'
type Props = {
    children: React.ReactNode
}
function Screen({ children }: Props) {
    return (
        <div className='min-w-screen min-h-screen bg-[#141625] p-6 flex justify-center'>
            {children}
        </div>
    )
}

export default Screen