import { Meta, StoryObj } from '@storybook/react'
import Button, { ButtonProps } from '.'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: {
      description: 'Texto a ser exibido no botão'
    },
    className: {
      description: 'Classe a ser atribuida ao botão'
    },
    onClick: {
      description:
        'Função a ser passada para o botão, como datalayer ou interações'
    },
    full_width: {
      description: 'Preencher todo o container'
    },
    full_width_only_mobile: {
      description: 'Preencher todo container **somente no mobile**'
    },
    variant: {
      description: 'Variação de estilo'
    },
    contrast: {
      description: 'Variação para fundos com muito contraste'
    },
    disabled: {
      description: 'Desabilitado'
    },
    size: {
      description: 'Tamanho do Botão'
    },
    size_desktop: {
      description: 'Tamanho do botão somente no desktop'
    }
  }
} as Meta<ButtonProps>

export const Default: StoryObj<ButtonProps> = {
  args: {
    children: 'Inscreva-se',
    variant: 'primary',
    contrast: false,
    disabled: false,
    full_width: false,
    size: 'md',
    full_width_only_mobile: false
  }
}
export const Disabled: StoryObj<ButtonProps> = {
  args: {
    children: 'Inscreva-se',
    variant: 'primary',
    contrast: false,
    disabled: true,
    full_width: false,
    size: 'md',
    full_width_only_mobile: false
  }
}

export const VariantPrimaryWithContrast: StoryObj<ButtonProps> = {
  args: {
    children: 'Inscreva-se',
    variant: 'primary',
    contrast: true,
    disabled: false,
    full_width: false,
    size: 'md',
    full_width_only_mobile: false
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}

export const VariantSecondary: StoryObj<ButtonProps> = {
  args: {
    children: 'Inscreva-se',
    variant: 'secondary',
    contrast: false,
    disabled: false,
    full_width: false,
    size: 'md',
    full_width_only_mobile: false
  }
}

export const VariantSecondaryWithContrast: StoryObj<ButtonProps> = {
  args: {
    children: 'Inscreva-se',
    variant: 'secondary',
    contrast: true,
    disabled: false,
    full_width: false,
    size: 'md',
    full_width_only_mobile: false
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
