import {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import './index.css'

export interface CalendarProps {
  value: Date
  onChange: (date: Date) => void
}
export interface CalendarRef {
  getDate: () => Date
  setDate: (date: Date) => void
}

const monthNames = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
]

const Calendar: ForwardRefRenderFunction<CalendarRef, CalendarProps> = (
  props,
  ref
) => {
  const { value = new Date(), onChange } = props

  const [date, setDate] = useState(value)

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date
      },
      setDate(date: Date) {
        setDate(date)
      },
    }
  })

  useEffect(() => {
    if (value) {
      setDate(value)
    }
  }, [value])

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const getDayByPrevMonth = (year: number, month: number) => {
    const result = []
    const prevDaysCount = daysOfMonth(year, month - 1)
    const firstDay = firstDayOfMonth(year, month)

    for (let i = prevDaysCount; i > prevDaysCount - firstDay; i--) {
      const handleClick = onChange?.bind(null, new Date(year, month - 1, i))
      result.push(
        <div key={`prev-${i}`} className="prev" onClick={handleClick}>
          {i}
        </div>
      )
    }
    return result
  }

  const getCurrentMonth = (year: number, month: number, day: number) => {
    const result = []
    const daysCount = daysOfMonth(year, month)

    for (let i = 1; i <= daysCount; i++) {
      const handleClick = onChange?.bind(null, new Date(year, month, i))

      let cls = ''
      if (i === day) {
        cls = 'selected'
      }

      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
      ) {
        cls += ' today'
      }

      const dayEl = (
        <div key={i} className={`day ${cls}`} onClick={handleClick}>
          {i}
        </div>
      )
      result.push(dayEl)
    }
    return result
  }

  const getDayByNextMonth = (year: number, month: number, count: number) => {
    const result = []
    const dateCount = 42
    for (let i = 1; i <= dateCount - count; i++) {
      const handleClick = onChange?.bind(null, new Date(year, month + 1, i))
      result.push(
        <div key={`next-${i}`} className="next" onClick={handleClick}>
          {i}
        </div>
      )
    }
    return result
  }

  const renderDates = () => {
    const days = []
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    const prevDate = getDayByPrevMonth(year, month)
    const currentDate = getCurrentMonth(year, month, day)
    const nextDate = getDayByNextMonth(
      year,
      month,
      prevDate.length + currentDate.length
    )

    days.push(...prevDate)
    days.push(...currentDate)
    days.push(...nextDate)

    return days
  }

  const renderYearMonth = () => (
    <>
      {date.getFullYear()} 年 {monthNames[date.getMonth()]}
    </>
  )
  return (
    <div className="calendar">
      <div className="header">
        <button className="btn" onClick={handlePrevMonth}>
          &lt;
        </button>
        <div>{renderYearMonth()}</div>
        <button className="btn" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  )
}

export default forwardRef(Calendar)
