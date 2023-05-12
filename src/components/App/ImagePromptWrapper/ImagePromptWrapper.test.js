import React from 'react';
import { render } from '@testing-library/react';

describe('ImagePromptWrapper', () => {

    let ImagePromptWrapper;

    beforeEach(async () => {
        const obj = await import('./ImagePromptWrapper.jsx');
        ImagePromptWrapper = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<ImagePromptWrapper imageDisplayItem={{}} />);
    })

    it('updates wrapper classname when image display item source is present', () => {
        const { getByTestId, rerender } = render(<ImagePromptWrapper imageDisplayItem={{}} />);
        expect(getByTestId("image-container").className).toBe("image-container notVisible");
        rerender(<ImagePromptWrapper imageDisplayItem={{ source: 'source' }} />);
        expect(getByTestId("image-container").className).toBe("image-container visible");
    })
})