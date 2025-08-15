import React from 'react'

export const HorizontalRuleStyle = (props: any) => {
  return React.createElement('hr', {
    style: {
      border: 'none',
      borderTop: '2px solid #ccc',
      margin: '20px 0',
    },
  })
}
