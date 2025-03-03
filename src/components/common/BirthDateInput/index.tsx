import React, { useState, useEffect, useMemo } from 'react'
import * as S from './styles'
import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown'
interface BirthDate {
  day: string
  month: string
  year: string
}

interface BirthDateInputProps {
  onChange?: (date: BirthDate) => void
  onBlur?: () => void
  defaultDay?: string
  defaultMonth?: string
  defaultYear?: string
  minAge?: number
}

function getDaysInMonth(year: number, month: number) {
  if (!month || !year) return 31

  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31
  if ([4, 6, 9, 11].includes(month)) return 30
  if (month === 2) {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    return isLeap ? 29 : 28
  }
  return 31
}

const BirthDateInput: React.FC<BirthDateInputProps> = ({
  onChange,
  onBlur,
  defaultDay = '',
  defaultMonth = '',
  defaultYear = '',
  minAge = 0
}) => {
  const [day, setDay] = useState(defaultDay)
  const [month, setMonth] = useState(defaultMonth)
  const [year, setYear] = useState(defaultYear)

  const today = new Date()
  const minDate = new Date(today.getTime())
  minDate.setFullYear(today.getFullYear() - minAge)

  const minYear = minDate.getFullYear()
  const minMonth = minDate.getMonth() + 1
  const minDay = minDate.getDate()

  const years = useMemo(() => {
    const startYear = 1900
    const arr = []
    for (let y = minYear; y >= startYear; y--) {
      arr.push(y)
    }
    return arr
  }, [minYear])

  const numericYear = parseInt(year || '0', 10)
  const numericMonth = parseInt(month || '0', 10)

  const months = useMemo(() => {
    if (!numericYear) return Array.from({ length: 12 }, (_, i) => i + 1)

    if (numericYear < minYear) {
      return Array.from({ length: 12 }, (_, i) => i + 1)
    } else if (numericYear > minYear) {
      return []
    } else {
      return Array.from({ length: minMonth }, (_, i) => i + 1)
    }
  }, [numericYear, minYear, minMonth])

  const days = useMemo(() => {
    if (!numericYear || !numericMonth) {
      return Array.from({ length: 31 }, (_, i) => i + 1)
    }

    const totalDays = getDaysInMonth(numericYear, numericMonth)

    if (numericYear < minYear) {
      return Array.from({ length: totalDays }, (_, i) => i + 1)
    }

    if (numericYear > minYear) {
      return []
    }

    if (numericMonth < minMonth) {
      return Array.from({ length: totalDays }, (_, i) => i + 1)
    } else if (numericMonth > minMonth) {
      return []
    } else {
      const maxDay = Math.min(totalDays, minDay)
      return Array.from({ length: maxDay }, (_, i) => i + 1)
    }
  }, [numericYear, numericMonth, minYear, minMonth, minDay])

  useEffect(() => {
    const numericDay = parseInt(day || '0', 10)
    if (!numericDay) return
    const validDays = days.map(String)
    if (!validDays.includes(day)) {
      setDay(validDays.length ? validDays[validDays.length - 1] : '')
    }
  }, [day, days])

  useEffect(() => {
    onChange?.({ day, month, year })
  }, [day, month, year])

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(e.target.value)
  }
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value)
  }
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value)
  }

  const handleBlur = () => {
    onBlur?.()
  }

  return (
    <S.Container>
      <S.SelectWrapper>
        {day && <label>Dia</label>}
        <S.Select value={day} onChange={handleDayChange} onBlur={handleBlur}>
          <option value="" disabled selected>
            Dia
          </option>
          {days.map((d) => (
            <option key={d} value={String(d)}>
              {d}
            </option>
          ))}
        </S.Select>
        <CaretDown size={20} weight="bold" />
      </S.SelectWrapper>

      <S.Divider />

      <S.SelectWrapper>
        {month && <label>Mês</label>}
        <S.Select
          value={month}
          onChange={handleMonthChange}
          onBlur={handleBlur}
        >
          <option value="" disabled selected>
            Mês
          </option>
          {months.map((m) => (
            <option key={m} value={String(m)}>
              {m}
            </option>
          ))}
        </S.Select>
        <CaretDown size={20} weight="bold" />
      </S.SelectWrapper>

      <S.Divider />

      <S.SelectWrapper>
        {year && <label>Ano</label>}
        <S.Select value={year} onChange={handleYearChange} onBlur={handleBlur}>
          <option value="" disabled selected>
            Ano
          </option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </S.Select>
        <CaretDown size={20} weight="bold" />
      </S.SelectWrapper>
    </S.Container>
  )
}

export default BirthDateInput
