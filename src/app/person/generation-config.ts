export interface GenerationConfig {
    count: number
    male: boolean
    female: boolean
}

export interface GeneratorFormConfig {
    count: number
    genderGroup: GenderGroup
}

export interface GenderGroup {
    male: boolean
    female: boolean
}
