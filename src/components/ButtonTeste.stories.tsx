
import { ComponentMeta, ComponentStory, Meta, StoryObj } from '@storybook/react';

import { ButtonTeste } from '../components/ButtonTeste';

export default {
  title: 'Teste/Button',
  component: ButtonTeste,
  parameters: {
    actions: {
      handles: ['click', 'click .btn'],
    },
  },
  

} as ComponentMeta<typeof ButtonTeste>;

export const Primary: StoryObj = {}
