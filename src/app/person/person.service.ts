import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { GenerationConfig } from "./generation-config"
import { Person } from "./person"

@Injectable({
    providedIn: "root",
})
export class PersonService {
    constructor(private http: HttpClient) {}

    getPersons(config: GenerationConfig): Observable<Person[]> {
        let arr: Person[] = []
        let subject = new Subject<Person[]>()
        this.http
            .get<Person[]>("/assets/data/persons.json")
            .subscribe((res: Person[]) => {
                arr = res.filter((person: Person) => {
                    if (config.male && person.gender === "Male") {
                        return person
                    }
                    if (config.female && person.gender === "Female") {
                        return person
                    }
                })
                arr = arr.slice(0, config.count)
                subject.next(arr)
            })
        return subject.asObservable()
    }
}
