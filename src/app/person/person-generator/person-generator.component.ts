import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms"
import { GenerationConfig, GeneratorFormConfig } from "../generation-config"

@Component({
    selector: "app-person-generator",
    templateUrl: "./person-generator.component.html",
    styleUrls: ["./person-generator.component.scss"],
})
export class PersonGeneratorComponent implements OnInit {
    generatorForm: FormGroup

    @Output()
    private generateRequest = new EventEmitter<GenerationConfig>()

    constructor() {}

    ngOnInit() {
        this.generatorForm = new FormGroup({
            count: new FormControl(1000, Validators.required),
            genderGroup: new FormGroup(
                {
                    male: new FormControl(true),
                    female: new FormControl(true),
                },
                this.requireCheckboxesToBeCheckedValidator()
            ),
        })
    }

    requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
        return function validate(formGroup: FormGroup) {
            let checked = 0

            Object.keys(formGroup.controls).forEach((key) => {
                const control = formGroup.controls[key]

                if (control.value === true) {
                    checked++
                }
            })

            if (checked < minRequired) {
                return {
                    requireCheckboxesToBeChecked: true,
                }
            }

            return null
        }
    }

    generate() {
        const value: GenerationConfig = [this.generatorForm.value].map(
            (el: GeneratorFormConfig) => {
                return {
                    count: el.count,
                    male: el.genderGroup.male,
                    female: el.genderGroup.female,
                }
            }
        )[0]

        if (this.generatorForm.valid) {
            this.generateRequest.emit(value)
        }
    }
}
