import React from 'react';
import { render, waitFor } from '@testing-library/react';

describe('App', () => {

    let App;

    beforeEach(async () => {
        const obj = await import('./App.jsx');
        App = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<App />);
    })

    it('displays the title', async () => {
        render(<App />);
        await waitFor(() => expect(document.title).toBe('smart bot'));
    })

    it('displays the text', () => {
        const { getByText } = render(<App />);
        expect(getByText('smart bot')).toBeTruthy();
        expect(getByText('The smartest bot in the world.')).toBeTruthy();
    })
})