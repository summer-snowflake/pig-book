import { CSSProperties } from 'react'

export const customModalStyles = (top: number, minWidth = 400, maxWidth = 600): { [key: string]: CSSProperties } => {
  return {
    content: {
      top         : top + '%',
      left        : '50%',
      right       : 'auto',
      bottom      : 'auto',
      marginRight : '-50%',
      minWidth    : minWidth + 'px',
      maxWidth    : maxWidth + 'px',
      transform   : 'translate(-50%, -50%)'
    },
    overlay: {
      background  : 'rgba(0, 0, 0, .5)'
    }
  }
}
