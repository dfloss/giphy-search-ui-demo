import React, { useEffect, useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { useIntersect } from './useIntersect'

export default {
    title: 'Interaction Observer Test',
} as Meta

const IntersectTestComponent: React.FC = () => {
    const [ref, entry] = useIntersect<HTMLDivElement>({ root: null })
    const [message, setMessage] = useState<string>("I'm hiding")
    useEffect(() => {
        if (entry?.isIntersecting === true) {
            setMessage('found me!')
        } else {
            setMessage("I'm hiding")
        }
    }, [entry, setMessage])

    return <div ref={ref}>{message}</div>
}

export const useIntersectionTest: Story = () => {
    return (
        <div>
            <div style={{ height: '2000px' }} />
            <IntersectTestComponent />
        </div>
    )
}
