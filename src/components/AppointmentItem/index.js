// Write your code here
const AppointmentItem = props => {
  const {eachItem, onChangingFav} = props
  const {title, id, dates, isFavorite} = eachItem

  const fav = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStared = () => {
    onChangingFav(id)
  }

  return (
    <li className="main-div">
      <div className="title-star">
        <p className="heading">{title}</p>

        <button
          className="stars"
          data-testid="star"
          type="button"
          onClick={onClickStared}
        >
          <img src={fav} alt="star" />
        </button>
      </div>
      <p>{dates}</p>
    </li>
  )
}
export default AppointmentItem
