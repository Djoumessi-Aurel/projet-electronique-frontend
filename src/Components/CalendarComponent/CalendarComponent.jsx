import React, { Component } from 'react'
import './CalendarComponent.css'

// getting new date, current year and month
let date = new Date()
let currDate = date.getDate()
let currDay = date.getDay()
let currYear = date.getFullYear()
let currMonth = date.getMonth()

 // storing full name of all months in array
 const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet","Aout", "Septembre", "Octobre", "Novembre", "Décembre"]
 const days = ["Lundi", "Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"]
 let liTag = []

 const renderCalendar = (liTag) => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let j = 0;
    
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
      liTag[j] = <li key={j} className="inactive">{lastDateofLastMonth - i + 1}</li>
      j++
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
      // adding active class to li if the current day, month, and year matched
      let isToday
      if(i === date.getDate() && currMonth === new Date().getMonth() 
      && currYear === new Date().getFullYear()){
        isToday = "active"
      }
      else{
        isToday = ""
      }
      liTag[j] = <li key={j} className={isToday}>{i}</li>
      j++
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag[j] = <li key={j} className="inactive">{i - lastDayofMonth + 1}</li>
        j++
    }
 }

export class CalendarComponent extends Component {

  tooglePrevMonth = (liTag) =>{
    currMonth = currMonth - 1
    if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
        date = new Date(); // pass the current date as date value
    }
    renderCalendar(liTag)
  }

  toogleNextMonth = (liTag) => {
    currMonth = currMonth + 1
    if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
        date = new Date(); // pass the current date as date value
    }
    renderCalendar(liTag)
  }

  render() {

    renderCalendar(liTag)
    
    let current_date = `${days[currDay-1]}, ${currDate} ${months[currMonth]} ${currYear}`// passing current entire date as currentDate text
    return (
        <div className='calendar-container'>
          <div className="wrapper">
            <div className='header'>
              <span className="current-date">{current_date}</span>
              {/*<div className="icons">
                <span id="prev" onClick={(liTag) => this.tooglePrevMonth(liTag)}>{"<"}</span>
                <span id="next" onClick={(liTag) => this.toogleNextMonth(liTag)}>{">"}</span>
              </div>*/}
            </div>
            <div className="calendar">
              <ul className="weeks">
                <li>Dim</li>
                <li>Lun</li>
                <li>Mar</li>
                <li>Mer</li>
                <li>Jeu</li>
                <li>Ven</li>
                <li>Sam</li>
              </ul>
              <ul className="days">
                {liTag}
              </ul>
            </div>
          </div>
        </div>
    )
  }
}

export default CalendarComponent