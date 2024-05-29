const removeHTMLTags = (text: string|null) => {
  if (text) return text.replace(/<[^>]*>/g, '');
}

export default removeHTMLTags