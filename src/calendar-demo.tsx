import { useEffect, useRef, useState } from 'react'
import Calendar, { CalendarRef } from './components/Calendar'

function CalendarDemo() {
  const calendarRef = useRef<CalendarRef>(null)
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    console.log(calendarRef.current?.getDate().toLocaleDateString())
    setTimeout(() => {
      calendarRef.current?.setDate(new Date('2023-6-16'))
    }, 3000)
  }, [])

  return (
    <Calendar
      ref={calendarRef}
      value={date}
      onChange={(date) => {
        console.log('date: ', date.toLocaleDateString())
        setDate(date)
      }}
    />
  )
}

export default CalendarDemo
