import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import * as S from './styles'

export type FaqItem = {
  id: number
  question: string
  response: ResponseBlock[]
}

export type ResponseBlock = ParagraphFaq | ListFaq

export type ParagraphFaq = {
  type: 'paragraph'
  children: TextNodeFaq[]
}

export type ListFaq = {
  type: 'list'
  format: 'ordered' | 'unordered'
  children: ListItemFaq[]
}

export type ListItemFaq = {
  type: 'list-item'
  children: TextNodeFaq[]
}

export type TextNodeFaq = {
  type: 'text'
  text: string
  bold?: boolean
  underline?: boolean
  italic?: boolean
}

export type AccordionFaqProps = {
  items: FaqItem[]
  itemIsOpen?: number | null
  onToggle?: (id: number) => void
}

export default function AccordionFaq({
  items,
  itemIsOpen,
  onToggle
}: AccordionFaqProps) {
  const [internalOpen, setInternalOpen] = useState<number | null>(null)

  useEffect(() => {
    setInternalOpen(itemIsOpen ?? null)
  }, [itemIsOpen])

  const handleClick = (id: number) => {
    if (onToggle) {
      onToggle(id)
    } else {
      setInternalOpen((prev) => (prev === id ? null : id))
    }
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AccordionFAQ',
              mainEntity: items.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.response
                    .map((block) =>
                      block.type === 'paragraph'
                        ? block.children.map((child) => child.text).join(' ')
                        : ''
                    )
                    .join('\n')
                }
              }))
            })
          }}
        />
      </Head>
      <S.AccordionContainer>
        {items.map((item) => {
          const isOpen = internalOpen === item.id

          return (
            <div key={item.id}>
              <div
                className={`accordion-question ${isOpen ? 'openned' : ''}`}
                onClick={() => handleClick(item.id)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(item.id)}
              >
                <h3>{item.question}</h3>
                <span className="accordion-arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                  >
                    <path
                      d="M15.5791 0.899703C15.4465 0.772999 15.289 0.672476 15.1157 0.60389C14.9423 0.535304 14.7565 0.5 14.5688 0.5C14.3812 0.5 14.1953 0.535304 14.022 0.60389C13.8486 0.672476 13.6912 0.772999 13.5586 0.899703L7.99875 6.20275L2.43891 0.899703C2.30624 0.773165 2.14875 0.67279 1.97541 0.604309C1.80208 0.535827 1.6163 0.500579 1.42868 0.500579C1.24106 0.500579 1.05528 0.535827 0.881948 0.604309C0.708611 0.67279 0.551114 0.773165 0.418448 0.899703C0.285784 1.02624 0.18055 1.17646 0.108752 1.34179C0.0369539 1.50712 9.53674e-07 1.68432 9.53674e-07 1.86327C9.53674e-07 2.04222 0.0369539 2.21942 0.108752 2.38475C0.18055 2.55008 0.285784 2.7003 0.418448 2.82684L6.99569 9.1003C7.12825 9.227 7.28572 9.32752 7.45907 9.39611C7.63242 9.4647 7.81825 9.5 8.00592 9.5C8.19359 9.5 8.37942 9.4647 8.55276 9.39611C8.72611 9.32752 8.88358 9.227 9.01615 9.1003L15.5934 2.82684C16.1379 2.30747 16.1379 1.43274 15.5791 0.899703Z"
                      fill="#F94D12"
                    />
                  </svg>
                </span>
              </div>
              <div
                id={`accordion-content-${item.id}`}
                className={`accordion-response ${isOpen ? 'openned' : ''}`}
              >
                <div>
                  {item.response.map((block, index) => {
                    if (block.type === 'paragraph') {
                      return (
                        <p key={index}>
                          {block.children.map((child, childIndex) => {
                            if (child.bold && child.underline) {
                              return (
                                <strong key={childIndex}>
                                  <u>{child.text}</u>
                                </strong>
                              )
                            }

                            if (child.bold) {
                              return (
                                <strong key={childIndex}>{child.text}</strong>
                              )
                            }

                            if (child.underline) {
                              return <u key={childIndex}>{child.text}</u>
                            }

                            return child.text
                          })}
                        </p>
                      )
                    }

                    if (block.type === 'list') {
                      const ListTag = block.format === 'ordered' ? 'ol' : 'ul'
                      return (
                        <ListTag key={index}>
                          {block.children.map((listItem, listItemIndex) => (
                            <li key={listItemIndex}>
                              {listItem.children.map((child, childIndex) => (
                                <span key={childIndex}>{child.text}</span>
                              ))}
                            </li>
                          ))}
                        </ListTag>
                      )
                    }

                    return null
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </S.AccordionContainer>
    </>
  )
}
