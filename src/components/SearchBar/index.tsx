import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Caravan } from '@/interfaces/caravan'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass'
import { X } from '@phosphor-icons/react/dist/ssr/X'

import Button from '../common/Button'
import * as S from './styles'

interface SuggestionItem {
  label: string
  value: string
}

interface ResponsiveSearchBarProps {
  isScrolled: boolean
  caravanas?: Caravan[]
}

const fields = [
  {
    key: 'title',
    label: 'Onde',
    labelFull: 'Para onde?',
    placeholder: 'Buscar por nome',
    subtitle: 'Busca flexível'
  },
  {
    key: 'origin',
    label: 'Origem',
    labelFull: 'De onde você vai?',
    placeholder: 'Buscar origem',
    subtitle: 'Adicionar Cidade'
  },
  {
    key: 'dest',
    label: 'Destino',
    labelFull: 'Para onde você quer ir?',
    placeholder: 'Buscar destino',
    subtitle: 'Adicionar Cidade'
  }
] as const

export default function ResponsiveSearchBar({
  isScrolled,
  caravanas
}: ResponsiveSearchBarProps) {
  const [activeField, setActiveField] = useState<
    null | 'title' | 'origin' | 'dest'
  >('title')
  const [nextField, setNextField] = useState<
    null | 'title' | 'origin' | 'dest'
  >(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [values, setValues] = useState({ title: '', origin: '', dest: '' })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const activeButtonRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const { pathname } = router

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isDesktop = window.innerWidth >= 768
      if (
        isDesktop &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !activeButtonRef.current?.contains(event.target as Node)
      ) {
        setActiveField(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!activeField && nextField) {
      setActiveField(nextField)
      setNextField(null)
    }
  }, [activeField, nextField])

  const updateValue = (field: 'title' | 'origin' | 'dest', value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const suggestionsByField = useMemo(() => {
    const titles = new Map<string, SuggestionItem>()
    const origins = new Map<string, SuggestionItem>()
    const dests = new Map<string, SuggestionItem>()

    caravanas?.forEach((c) => {
      const titleMatch = values.title
        ? c.titulo.toLowerCase().includes(values.title.toLowerCase())
        : true
      const originMatch = values.origin
        ? c.cidade_origem.toLowerCase().includes(values.origin.toLowerCase())
        : true
      const destMatch = values.dest
        ? c.cidade_destino.toLowerCase().includes(values.dest.toLowerCase())
        : true

      if (titleMatch && !titles.has(c.titulo)) {
        titles.set(c.titulo, {
          label: c.titulo,
          value: c.titulo
        })
      }

      if (originMatch && !origins.has(c.cidade_origem)) {
        origins.set(c.cidade_origem, {
          label: `${c.cidade_origem} - ${c.estado_origem}`,
          value: c.cidade_origem
        })
      }

      if (destMatch && !dests.has(c.cidade_destino)) {
        dests.set(c.cidade_destino, {
          label: `${c.cidade_destino} - ${c.estado_destino}`,
          value: c.cidade_destino
        })
      }
    })

    return {
      title: Array.from(titles.values()),
      origin: Array.from(origins.values()),
      dest: Array.from(dests.values())
    }
  }, [caravanas, values])

  const handleSearch = () => {
    const newQuery: Record<string, string> = {}

    if (values.title.trim()) newQuery.titulo = values.title.trim()
    if (values.origin.trim()) newQuery.origem = values.origin.trim()
    if (values.dest.trim()) newQuery.destino = values.dest.trim()

    const queryString = Object.entries(newQuery)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join('&')

    router.push(`${pathname}?${queryString}`, undefined, { shallow: true })

    setIsMobileOpen(false)
  }

  useEffect(() => {
    const { titulo, origem, destino } = router.query

    setValues({
      title: typeof titulo === 'string' ? titulo : '',
      origin: typeof origem === 'string' ? origem : '',
      dest: typeof destino === 'string' ? destino : ''
    })
  }, [router.query])

  if (!caravanas) {
    return null
  }

  return (
    <>
      <S.Wrapper $isScrolled={isScrolled}>
        {fields.map(({ key, label, placeholder }, index) => (
          <React.Fragment key={`${key}-desktop`}>
            <S.Segment
              key={key}
              ref={activeField === key ? activeButtonRef : null}
              $active={activeField === key}
              $isScrolled={isScrolled}
              onClick={() => setActiveField(key)}
            >
              <small>{label}</small>
              <input
                value={values[key]}
                onChange={(e) => updateValue(key, e.target.value)}
                placeholder={placeholder}
              />
              {activeField === key &&
                suggestionsByField[key]?.filter(
                  (item) => item.value !== values[key]
                ).length > 0 && (
                  <S.Dropdown
                    ref={dropdownRef}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul style={{ padding: 0, margin: 0 }}>
                      {suggestionsByField[key]
                        ?.filter((item) => item.value !== values[key])
                        .slice(0, 5)
                        .map((item) => (
                          <S.Suggestion
                            key={item.label}
                            onClick={() => {
                              updateValue(key, item.value)
                              setActiveField(null)
                            }}
                          >
                            <strong>{item.label}</strong>
                          </S.Suggestion>
                        ))}
                    </ul>
                  </S.Dropdown>
                )}
            </S.Segment>
            {index < fields.length - 1 && <S.Divider />}
          </React.Fragment>
        ))}
        <S.SearchButton onClick={handleSearch}>
          <MagnifyingGlass size={18} weight="bold" />
          Buscar
        </S.SearchButton>
      </S.Wrapper>

      <S.MobileTrigger onClick={() => setIsMobileOpen(true)}>
        <MagnifyingGlass size={18} weight="bold" /> Inicie sua busca
      </S.MobileTrigger>

      <AnimatePresence>
        {isMobileOpen && (
          <S.Modal
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.2 }}
          >
            <S.HeaderMobile>
              <S.MobileCloseButton onClick={() => setIsMobileOpen(false)}>
                <X size={16} weight="bold" />
              </S.MobileCloseButton>
              <p>Filtrar caravanas</p>
            </S.HeaderMobile>
            {fields.map(({ key, label, labelFull, subtitle, placeholder }) => (
              <S.MobileBlockContainer
                onClick={() => {
                  if (activeField === key) {
                    return
                  }

                  if (activeField === key) {
                    setActiveField(null)
                  } else if (activeField) {
                    setNextField(key)
                    setActiveField(null)
                  } else {
                    setActiveField(key)
                  }
                }}
                key={key}
              >
                <S.MobileBlock>
                  <S.MobileBlockTitle active={activeField === key}>
                    <span>{activeField === key ? labelFull : label}</span>
                    {activeField !== key && (
                      <strong>{values[key] || subtitle}</strong>
                    )}
                  </S.MobileBlockTitle>
                </S.MobileBlock>

                <AnimatePresence initial={false}>
                  {activeField === key && (
                    <motion.div
                      key={key}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div>
                        <S.MobileInput
                          placeholder={placeholder}
                          value={values[key]}
                          onChange={(e) => updateValue(key, e.target.value)}
                        />
                        {!values[key] && (
                          <S.MobileSuggestionsTitle>
                            Destinos sugeridos
                          </S.MobileSuggestionsTitle>
                        )}
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {suggestionsByField[key]
                            ?.filter((item) => item.value !== values[key])
                            .slice(0, 5)
                            .map((item) => (
                              <S.Suggestion
                                key={item.label}
                                onClick={() => updateValue(key, item.value)}
                              >
                                <strong>{item.label}</strong>
                              </S.Suggestion>
                            ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </S.MobileBlockContainer>
            ))}
            <S.FooterBar>
              <S.ClearButton
                onClick={() => setValues({ title: '', origin: '', dest: '' })}
              >
                Limpar tudo
              </S.ClearButton>
              <Button
                icon={<MagnifyingGlass weight="bold" size={18} />}
                onClick={handleSearch}
              >
                Buscar
              </Button>
            </S.FooterBar>
          </S.Modal>
        )}
      </AnimatePresence>
    </>
  )
}
