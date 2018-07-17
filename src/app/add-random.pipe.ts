import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addRandomPipe',
    pure: false
})
export class AddRandomPipe implements PipeTransform {
    cache: Object = {};

    transform(input: string): string {
        let value = this.cache[input];
        if (!value || value.expire < Date.now()) {
            value = {
                text: input + Math.random(),
                // expire in 1s
                expire: Date.now() + 1000
            };

            this.cache[input] = value;
        }
        
        return value.text;
    }

}