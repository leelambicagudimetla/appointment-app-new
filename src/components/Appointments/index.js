import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

const appointmentList = []

class Appointments extends Component {
  state = {
    title: '',
    dates: '',
    isFavorite: false,
    isActive: false,
    appointmentLists: appointmentList,
    okay: appointmentList,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({
      dates: event.target.value,
    })
  }

  onChangingFav = id => {
    this.setState(prevState => ({
      appointmentLists: prevState.appointmentLists.map(each => {
        // console.log(each)
        if (id === each.id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))

    this.setState(prevState => ({
      okay: prevState.okay.map(each => {
        // console.log(each)
        if (id === each.id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {title, dates, isFavorite} = this.state
    const newList = {
      id: uuidv4(),
      title,
      dates: format(new Date(dates), 'dd MMMM yyyy, EEEE'),
      isFavorite,
    }
    console.log(newList)
    this.setState(prevState => ({
      appointmentLists: [...prevState.appointmentLists, newList],
      title: '',
      dates: '',
      okay: [...prevState.okay, newList],

      isFavorite,
    }))
  }

  // const fullValues = appointmentLists

  onClickStarFill = () => {
    const {appointmentLists, okay, isActive} = this.state
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))

    if (isActive) {
      const filteredStar = appointmentLists.filter(
        each => each.isFavorite === true,
      )
      this.setState({
        appointmentLists: filteredStar,
      })
    } else {
      this.setState({
        appointmentLists: okay,
      })
    }
  }

  render() {
    const {title, dates, appointmentLists, isFavorite} = this.state
    return (
      <div className="radial-div">
        <div className="white-div">
          <div className="add-img-div">
            <form className="add-div">
              <h1 className="add-heading">Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                value={title}
                id="title"
                type="text"
                placeholder="Title"
                onChange={this.onChangeTitle}
              />

              <label htmlFor="date-id">DATE</label>

              <input
                value={dates}
                id="date-id"
                type="date"
                onChange={this.onChangeDate}
              />
              <br />
              <button
                type="button"
                className="add-button"
                onClick={this.onClickAddButton}
              >
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img-size"
            />
          </div>

          <div className="breaking-appointment-div">
            <hr />
            <div className="appointments-star">
              <h1 className="appoint-heading">Appointments</h1>
              <button
                type="button"
                className="star-button"
                onClick={this.onClickStarFill}
              >
                Starred
              </button>
            </div>
          </div>
          <div className="lists-name">
            <ul className="list-unordered">
              {appointmentLists.map(each => (
                <AppointmentItem
                  key={each.id}
                  eachItem={each}
                  onChangingFav={this.onChangingFav}
                  isFavorite={isFavorite}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
