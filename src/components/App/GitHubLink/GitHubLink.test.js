import React from 'react';
import { render } from '@testing-library/react';

describe('GitHubLink', () => {

    let GitHubLink;

    beforeEach(async () => {
        const obj = await import('./GitHubLink.jsx');
        GitHubLink = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<GitHubLink />);
    })

    it('links to the given address', () => {
        const { getByRole } = render(<GitHubLink linkAddress={"testAddress"}/>);
        expect(getByRole('link').getAttribute('href')).toBe('testAddress');
        expect(getByRole('link').getAttribute('target')).toBe('_blank');
        expect(getByRole('link').getAttribute('rel')).toBe('noopener noreferrer');
    })

    it('displays the svg', () => {
        const { getByAltText } = render(<GitHubLink />);
        expect(getByAltText('GitHub Logo').getAttribute('src')).toBe('svgMock');
        expect(getByAltText('GitHub Logo').getAttribute('height')).toBe('50em');
        expect(getByAltText('GitHub Logo').getAttribute('width')).toBe('50em');
    })
})