export interface GenerationConfig {
    count: number
    male: boolean
    female: boolean
}

export interface GeneratorErrors {
    male?: Array<string>
    female?: Array<string>
    count?: Array<string>
}
