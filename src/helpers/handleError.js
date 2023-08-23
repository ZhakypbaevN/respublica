const checkIgnore = (field, ignores) => {
  if (!ignores) return true
  for (const ignore in ignores) {
    if (ignores[ignore] === field) return false
  }
  return true
}

const handleError = (fields, ignores) => {
  for (const field in fields) {
    if (fields[field] && checkIgnore(field, ignores)) return true
  }
  return false
}

export default handleError
