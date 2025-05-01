import { addons } from '@storybook/manager-api'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'

import darkTheme from './darkTheme'
import lightTheme from './lightTheme'

addons.setConfig({ theme: lightTheme })

const channel = addons.getChannel()
channel.on(DARK_MODE_EVENT_NAME, (isDark) => {
  addons.setConfig({
    theme: isDark ? darkTheme : lightTheme
  })
})
