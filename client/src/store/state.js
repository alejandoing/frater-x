export default {
  appTitle: { first: 'NPS', last: 'FRATER-X' },
  faces: {
    excellent: { icon: 'sentiment_very_satisfied', title: 'Excelente' },
    good: { icon: 'sentiment_satisfied', title: 'Bueno' },
    regular: { icon: 'sentiment_dissatisfied', title: 'Regular' },
    bad: { icon: 'mood_bad', title: 'Malo' }
  },
  messages: null,
  user: JSON.parse(localStorage.getItem('USER'))
}
