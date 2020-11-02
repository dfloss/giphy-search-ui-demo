import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import App from './App'

export default {
    title: 'Full Application',
    component: App,
} as Meta

export const mainApp: Story = () => {
    return <App />
}
