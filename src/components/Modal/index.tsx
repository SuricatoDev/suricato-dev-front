import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'

import * as S from './styles'
import { useTheme } from 'styled-components'

interface DataPoint {
  price: number
  count: number
}

interface PriceRangeChartProps {
  priceData: DataPoint[]
}

const generatePriceData = (maxPrice: number, step: number) => {
  return Array.from({ length: maxPrice / step + 1 }, (_, i) => ({
    price: i * step,
    count: Math.floor(Math.random() * 50) + 5
  }))
}

const priceDataExample = generatePriceData(1000, 20)

export default function PriceRangeChart({
  priceData = priceDataExample
}: PriceRangeChartProps) {
  const theme = useTheme()
  const [range, setRange] = useState<[number, number]>([
    priceData[0].price,
    priceData[priceData.length - 1].price
  ])

  const handleRangeChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setRange([newValue[0], newValue[1]])
    }
  }

  return (
    <S.Container>
      <h3>Faixa de Preço</h3>
      <S.ChartWrapper>
        <ResponsiveContainer width="100%" height={100}>
          <BarChart
            data={priceData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <XAxis dataKey="price" hide />
            <YAxis hide />
            <Tooltip cursor={{ fill: '#f5f5f5' }} />
            <Bar dataKey="count" radius={[3, 3, 0, 0]}>
              {priceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.price >= range[0] && entry.price <= range[1]
                      ? `${theme.colors.primary_medium}`
                      : '#d3d3d3'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <S.StyledSlider
          value={range}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          min={priceData[0].price}
          max={priceData[priceData.length - 1].price}
          step={10}
          sx={{
            color: theme.colors.primary_medium,
            '& .MuiSlider-rail': {
              backgroundColor: '#d3d3d3',
              opacity: 1
            }
          }}
        />
      </S.ChartWrapper>
    </S.Container>
  )
}
