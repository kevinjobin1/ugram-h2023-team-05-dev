import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import App from './App';

describe('<App />', () => {
  test('App mounts properly', () => {
    const wrapper = render(<App />, { wrapper: BrowserRouter });
    expect(wrapper).toBeTruthy();
  });
});
