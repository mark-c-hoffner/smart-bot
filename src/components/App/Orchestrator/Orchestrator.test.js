import React from 'react';
import { render, fireEvent } from '@testing-library/react';

const randomMock = jest.fn();
const assertionPromptMock = jest.fn();

describe('App', () => {

    let Orchestrator;

    beforeEach(async () => {
        jest.doMock('../../../tools/random', () => randomMock)
        jest.doMock('./AssertionPrompt', () => assertionPromptMock)

        randomMock.mockReturnValue(0);

        const obj = await import('./Orchestrator.jsx');
        Orchestrator = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<Orchestrator />);
    })

    it('calls assertion component after user click', () => {
        const { getByText } = render(<Orchestrator />);
        expect(assertionPromptMock).not.toHaveBeenCalled();
        fireEvent.click(getByText('See what I know?'));
        expect(assertionPromptMock).toHaveBeenCalledTimes(1);
        expect(assertionPromptMock.mock.calls[0][0].pictureItem.id).toBe('gp');
        expect(assertionPromptMock.mock.calls[0][0].colorItem.name).toBe('red');
    })
})