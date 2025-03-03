declare type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

declare type TextTags = 'p' | 'span' | 'strong' | 'em' | 'blockquote'

declare type Scripts = {
  id: number
  lazyload_delay: number
  scripts_without_lazyload?: string
  scripts_with_lazyload?: string
}
