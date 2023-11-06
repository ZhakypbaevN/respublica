const formatPhoneNumber = (input) => {
  const phoneHead = input.substring(1, 2)
  const areaCode = input.substring(2, 5)
  const middle = input.substring(5, 8)
  const last = input.substring(8, 12)

  return `+${phoneHead} (${areaCode}) ${middle} ${last}`
}

export default formatPhoneNumber