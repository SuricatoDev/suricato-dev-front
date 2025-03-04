import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Range } from 'react-range'

// Importações do Chart.js para criar um gráfico de barras (histograma)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Registrando os componentes obrigatórios do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// ============== ESTILOS DE MODAL ==============
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  background: #fff;
  width: 90%;
  max-width: 600px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
`

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

// ============== ESTILOS DAS SEÇÕES E SLIDER ==============
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`

const RangeContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RangeTrack = styled.div`
  height: 6px;
  background: #ccc;
  margin: 1rem 10px;
  border-radius: 3px;
  position: relative;
  flex: 1;
`

const RangeThumb = styled.div`
  height: 20px;
  width: 20px;
  background-color: #ff385c;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  cursor: grab;
`

// ============== BOTÕES DO FOOTER ==============
const FooterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  border-radius: 8px;

  &.clear {
    background-color: transparent;
    color: #717171;
    text-decoration: underline;
  }

  &.apply {
    background-color: #222;
    color: #fff;
  }
`

// ============== TIPOS DE PROPS ==============
interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: FilterState) => void
}

interface FilterState {
  minPrice: number
  maxPrice: number
}

// ============== COMPONENTE PRINCIPAL ==============
const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply
}) => {
  // Range inicial (min e max)
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800])

  // Exemplo estático de distribuição de preços (histograma):
  // priceLabels: valores no eixo X (ex: 0, 200, 400...) para cada "faixa"
  // priceDistribution: quantos anúncios há em cada faixa
  const [priceLabels, setPriceLabels] = useState<string[]>([])
  const [priceDistribution, setPriceDistribution] = useState<number[]>([])

  useEffect(() => {
    // Exemplo: 11 faixas de preço de 0 a 1000 (com a última 1200)
    const buckets = [0, 100, 200, 400, 600, 700, 800, 900, 1000, 1200]
    // Convertendo cada bucket em label "R$XXX"
    const generatedLabels = buckets.map((val) => `R$${val}`)
    setPriceLabels(generatedLabels)

    // Gera contagens aleatórias (em produção, você buscaria do backend)
    const generatedDistribution = buckets.map(
      () => Math.floor(Math.random() * 60) + 1
    )
    setPriceDistribution(generatedDistribution)
  }, [])

  // Determina a cor de cada barra de acordo com o range selecionado
  // Se o valor do bucket estiver dentro do [priceRange[0], priceRange[1]], fica rosa, senão cinza
  const backgroundColors = priceLabels.map((label) => {
    // Extrai o valor numérico do label (ex: "R$200" -> 200)
    const numeric = parseFloat(label.replace('R$', ''))
    return numeric >= priceRange[0] && numeric <= priceRange[1]
      ? '#FF385C'
      : '#ddd'
  })

  // Configurações do Chart.js para criar um gráfico de barras
  const chartData = {
    labels: priceLabels,
    datasets: [
      {
        label: 'Distribuição de Preços',
        data: priceDistribution,
        backgroundColor: backgroundColors,
        borderWidth: 0,
        // Ajusta largura das barras
        barPercentage: 1.0,
        categoryPercentage: 1.0
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        display: false // oculta labels do eixo X
      },
      y: {
        display: false // oculta labels do eixo Y
      }
    }
  }

  // Fecha o modal se não estiver aberto
  if (!isOpen) return null

  // Aplica os filtros
  const handleApply = () => {
    onApply({
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    })
    onClose()
  }

  // Limpa todos os filtros (reset)
  const handleClear = () => {
    setPriceRange([200, 800])
  }

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Filtros</ModalTitle>
        </ModalHeader>

        <ModalBody>
          {/* HISTOGRAMA + SLIDER DE PREÇO */}
          <Section>
            <SectionTitle>Faixa de preço</SectionTitle>

            {/* Gráfico de barras (histograma) */}
            <div style={{ width: '100%', height: '120px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Valores atuais do range */}
            <div>
              <strong>
                Preços antes das taxas e impostos: R${priceRange[0]} - R$
                {priceRange[1] === 1200 ? '1200+' : priceRange[1]}
              </strong>
            </div>

            {/* Slider para selecionar min e max */}
            <RangeContainer>
              <Range
                step={50}
                min={0}
                max={1200}
                values={priceRange}
                onChange={(vals) => setPriceRange([vals[0], vals[1]])}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      display: 'flex',
                      width: '100%'
                    }}
                  >
                    <RangeTrack>{children}</RangeTrack>
                  </div>
                )}
                renderThumb={({ props }) => <RangeThumb {...props} />}
              />
            </RangeContainer>
          </Section>
        </ModalBody>

        <ModalFooter>
          <FooterButton className="clear" onClick={handleClear}>
            Remover filtros
          </FooterButton>
          <FooterButton className="apply" onClick={handleApply}>
            Mostrar 1.000+ lugares
          </FooterButton>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  )
}

export default FilterModal
