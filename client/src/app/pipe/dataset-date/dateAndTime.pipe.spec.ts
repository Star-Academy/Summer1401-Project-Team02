import {DateAndTimePipe} from './dateAndTime.pipe';

describe('DatePipe', () => {
    it('create an instance', () => {
        const pipe = new DateAndTimePipe();
        expect(pipe).toBeTruthy();
    });
});
