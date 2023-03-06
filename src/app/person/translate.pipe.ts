import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: "translate",
})
export class TranslatePipe implements PipeTransform {
    private dictionary = {
        Male: "Homme",
        Female: "Femme",
    }

    constructor() {}

    transform(value: string | number): string {
        return this.dictionary[value]
    }
}
