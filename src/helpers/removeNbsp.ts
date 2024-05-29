function removeNbsp(text) {
  if (typeof text != 'string') return text;
  let processedText = text.replace(/&nbsp;/g, ' ');
  return processedText;
}

export default removeNbsp