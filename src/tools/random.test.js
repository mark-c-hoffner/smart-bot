import random from './random';

describe('random.js', () => {
    
    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    })

    it('returns 1 when random returns .0001', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(.0001);
        const rand = random(1, 1000);
        expect(rand).toBe(1);
    })

    it('returns 2 when random returns .001', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(.001);
        const rand = random(1, 1000);
        expect(rand).toBe(2);
    })

    it('returns 3 when random returns .002', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(.002);
        const rand = random(1, 1000);
        expect(rand).toBe(3);
    })

    it('returns 1000 when random returns .9999', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(.9999);
        const rand = random(1, 1000);
        expect(rand).toBe(1000);
    })
})