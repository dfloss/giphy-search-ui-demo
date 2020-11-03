import React from 'react'
import 'mini.css'
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
    (Story) => (
        <div style={{ backgroundColor: '#222222', minBlockSize: '100vh' }}>
            <Story />
        </div>
    ),
]
