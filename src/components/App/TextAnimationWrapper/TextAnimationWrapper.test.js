import React from 'react';
import { render } from '@testing-library/react';

const typeAnimationMock = jest.fn();
const TypeAnimationModuleMock = {
    TypeAnimation: typeAnimationMock
};

describe('TextAnimationWrapper', () => {

    let TextAnimationWrapper;

    beforeEach(async () => {
        jest.doMock('react-type-animation', () => TypeAnimationModuleMock)
        typeAnimationMock.mockReturnValue('typeAnimationMock');

        const obj = await import('./TextAnimationWrapper.jsx');
        TextAnimationWrapper = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<TextAnimationWrapper textSourceArray={['testWelcomeMessage']} />);
    })

    it('calls the type animation library', () => {
        const { getByText } = render(<TextAnimationWrapper textSourceArray={['testWelcomeMessage']} />);
        expect(typeAnimationMock.mock.calls[0][0].wrapper).toBe("span");
        expect(typeAnimationMock.mock.calls[0][0].style.whiteSpace).toBe("pre-line");
        expect(typeAnimationMock.mock.calls[0][0].sequence[0]).toBe("testWelcomeMessage\n");
        expect(getByText('typeAnimationMock')).toBeTruthy();
    })

    it('preps the text array with delays and merges', () => {
        render(<TextAnimationWrapper textSourceArray={['1', '2', '3']} />);
        expect(typeAnimationMock.mock.calls[0][0].sequence[0]).toBe("1\n");
        expect(typeAnimationMock.mock.calls[0][0].sequence[1]).toBe(500);
        expect(typeAnimationMock.mock.calls[0][0].sequence[2]).toBe("1\n2\n");
        expect(typeAnimationMock.mock.calls[0][0].sequence[3]).toBe(500);
        expect(typeAnimationMock.mock.calls[0][0].sequence[4]).toBe("1\n2\n3\n");
        expect(typeAnimationMock.mock.calls[0][0].sequence[5]).toBe(500);
    })
})