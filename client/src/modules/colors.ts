export const categoryColors = (balanceOfPayments: boolean): string[] => {
  if (balanceOfPayments) {
    return ['#8094bd', '#94bd80', '#80bda9', '#80b3bd', '#8dcae1', '#80bd8a', '#70a1b4']
  } else {
    return ['#d78ea5', '#d78ecf', '#ed9f96', '#e18dd1', '#f4c430', '#ed9583', '#ed96b9']
  }
}

export const breakdownColors = (balanceOfPayments: boolean): string[] => {
  if (balanceOfPayments) {
    return ['#7385aa', '#85aa73', '#73aa98', '#73a1aa', '#7eb5ca', '#73aa7c', '#6490a2']
  } else {
    return ['#c17f94', '#c17fba', '#d58f87', '#ca7ebc', '#dbb02b', '#d58675', '#d587a6']
  }
}