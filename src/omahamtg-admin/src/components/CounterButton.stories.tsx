import React from 'react';

import { storiesOf } from '@storybook/react';
import { CounterButton } from './CounterButton';

storiesOf('Counter Button', module).add('Default', () => <CounterButton />);
