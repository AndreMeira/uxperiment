import type {
    Observable, Output,
} from '@/composition/type';

export default class DummyController {

    public constructor(private output: Output<{ message: string }>) {
        this.output = output;
    }

    public get message(): string {
        return this.output.state.message;
    }

    public generateMessage(message:string): void {
        const reversed: string = message.split('').reverse().join('');
        this.output.write({ message: reversed });
    }

}
