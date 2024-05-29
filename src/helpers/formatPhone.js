const formatPhone = (input) => {
  const phoneHead = 7
  const areaCode = input.substring(4, 7)
  const middle = input.substring(9, 12)
  const last = input.substring(13, 17)

  return `${phoneHead}${areaCode}${middle}${last}`
}

export default formatPhone