import React from 'react';
import { render, fireEvent } from '@testing-library/react';

const randomMock = jest.fn();
const matchDataMock = [{ name: "mock1", match: "id1" }];
const imageDataMock = [{ item: "1", id: "id5" }, { item: "2", id: "id3" }, { item: "3", id: "id1" }];
const assertionPromptMock = jest.fn();

describe('Orchestrator', () => {

    let Orchestrator;

    beforeEach(async () => {
        jest.doMock('../../../tools/random', () => randomMock)
        jest.doMock('../../../tools/matchData', () => matchDataMock)
        jest.doMock('../../../tools/imageData', () => imageDataMock)
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
        expect(assertionPromptMock.mock.calls[0][0].pictureItem.item).toBe('3');
        expect(assertionPromptMock.mock.calls[0][0].colorItem.name).toBe('mock1');
    })
})