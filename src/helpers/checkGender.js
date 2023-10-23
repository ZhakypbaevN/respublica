const checkGender = gender => {
  if (gender === 'male') return 'Мужчина'
  if (gender === 'female') return 'Женщина'
  return '-'
}

export default checkGender