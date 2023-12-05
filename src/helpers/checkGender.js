// import { useI18n } from 'vue-i18n'

// const { t } = useI18n()

const checkGender = gender => {
  // if (gender === 'male') return t('status.male')
  // if (gender === 'female') return t('status.female')
  if (gender === 'male') return 'Мужчина'
  if (gender === 'female') return 'Женщина'
  return '-'
}

export default checkGender