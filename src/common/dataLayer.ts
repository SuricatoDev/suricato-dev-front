/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { formatString } from '@/utils/formatString'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export interface FireDefaultDatalayerProps {
  eventCategory: string
  eventAction: string
  eventLabel: string
  eventStep: string
  event: string
  brand?: string
}

export interface FirePlayVideoDatalayerProps {
  eventCategory: string
  eventStep: string
  videoName: string
}

interface EcommerceItem {
  item_name: string
  item_category: string
  item_id: string
  item_list_id: string
  item_list_name: string
  index: number
  price: number
  item_brand: string
  item_category2: string
}

export interface FireProductClickDatalayerProps {
  eventCategory: string
  eventAction: string
  event: string
  eventLabel?: string
  eventStep?: string
  ecommerce: {
    items: EcommerceItem[]
  }
}

export function fireDefaultDatalayer({
  eventCategory,
  eventAction,
  eventLabel,
  eventStep,
  event,
  brand
}: FireDefaultDatalayerProps) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      eventCategory: formatString(eventCategory),
      eventAction: formatString(eventAction),
      eventLabel: formatString(eventLabel),
      eventStep: formatString(eventStep),
      event: formatString(event),
      ...(brand ? { brand: formatString(brand) } : {})
    })
  }
}

export function fireProductClickDatalayer({
  eventCategory,
  eventAction,
  event,
  eventLabel,
  eventStep,
  ecommerce
}: FireProductClickDatalayerProps) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push({
      eventCategory: formatString(eventCategory),
      eventAction: formatString(eventAction),
      event: formatString(event),
      ...(eventLabel ? { eventLabel: formatString(eventLabel) } : {}),
      ...(eventStep ? { eventStep: formatString(eventStep) } : {}),
      ecommerce: {
        items: ecommerce.items.map((item) => {
          return {
            item_name: formatString(item?.item_name),
            item_id: formatString(item?.item_id),
            item_list_id: formatString(item?.item_list_id),
            item_list_name: formatString(item?.item_list_name),
            index: item?.index,
            price: item?.price,
            item_brand: formatString(item?.item_brand),
            item_category: formatString(item?.item_category),
            item_category2: formatString(item?.item_category2)
          }
        })
      }
    })
  }
}

export function firePlayVideoDatalayer({
  eventCategory,
  eventStep,
  videoName
}: FirePlayVideoDatalayerProps) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      eventCategory: formatString(eventCategory),
      eventAction: 'clique:botao',
      eventLabel: 'view_video',
      eventStep: formatString(eventStep),
      videoName: formatString(videoName),
      event: 'play'
    })
  }
}

export function fireDataLayer<T extends Record<string, any>>(data: T): void {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []

    const formattedData = Object.keys(data).reduce(
      (acc: Record<string, any>, key: string) => {
        acc[key] =
          typeof data[key] === 'string' ? formatString(data[key]) : data[key]
        return acc
      },
      {} as Record<string, any>
    )

    window.dataLayer.push(formattedData)
  }
}
