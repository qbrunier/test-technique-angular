import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import {
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from "@angular/forms"
import { Router } from "@angular/router"
import { GenerationConfig, GeneratorErrors } from "../generation-config"

@Component({
    selector: "app-person-generator",
    templateUrl: "./person-generator.component.html",
    styleUrls: ["./person-generator.component.scss"],
})
export class PersonGeneratorComponent implements OnInit {
    generator: FormGroup
    errors: GeneratorErrors = {
        male: [],
        female: [],
        count: [],
    }

    @Output()
    private generateRequest = new EventEmitter<GenerationConfig>()

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.generator = this.formBuilder.group({
            count: [1000],
            male: [true],
            female: [true],
        })
    }

    generate() {
        const value: GenerationConfig = this.generator.value

        if (!value.male && !value.female) {
            if (
                !this.errors.male.find(
                    (err) => err === "La case Homme ou Femme doit être coché."
                )
            ) {
                this.errors.male.push("La case Homme ou Femme doit être coché.")
            }

            if (
                !this.errors.female.find(
                    (err) => err === "La case Homme ou Femme doit être coché."
                )
            ) {
                this.errors.female.push(
                    "La case Homme ou Femme doit être coché."
                )
            }
        } else {
            this.errors.male = []
            this.errors.female = []
        }

        if (!value.count) {
            if (
                !this.errors.count.find(
                    (err) => err === "Ce champ de formulaire est obligatoire"
                )
            ) {
                this.errors.count.push("Ce champ de formulaire est obligatoire")
            }
        } else {
            this.errors.count = this.errors.count.filter(
                (err) => err !== "Ce champ de formulaire est obligatoire"
            )
        }

        if (value.count && (value.count > 1000 || value.count < 1)) {
            if (
                !this.errors.count.find(
                    (err) => err === "Saisissez une valeur entre 1 et 1000"
                )
            ) {
                this.errors.count.push("Saisissez une valeur entre 1 et 1000")
            }
        } else {
            this.errors.count = this.errors.count.filter(
                (err) => err !== "Saisissez une valeur entre 1 et 1000"
            )
        }

        if (
            this.generator.valid &&
            this.errors.count.length === 0 &&
            this.errors.male.length === 0 &&
            this.errors.female.length === 0
        ) {
            this.generateRequest.emit(value)
        }
    }
}
