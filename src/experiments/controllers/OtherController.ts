import type {
    Observable, Output,
} from '@/composition/type';

export default class OtherController {

    public constructor(
        msg:Observable<string>,
        public output: Output<{ msg:string, quote:string }>,
    ) {
        msg.subscribe((val:string) => {
            this.output.write({ msg: val });
        });

        setTimeout(() => {
            this.output.write({ quote: 'Hallo ?' });
        }, 5000);
    }

    public get message(): string {
        return this.output.state.msg;
    }

    public generateQuote(): void {
        const i = Math.random();
        this.output.write({ quote: `quote ${i}` });
    }

    public get truncatedQuote(): string {
        return this.output.state.quote.substring(0, 12);
    }

}
