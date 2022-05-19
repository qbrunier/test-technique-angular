import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";
import { PersonGeneratorComponent } from "./person-generator.component";

describe("PersonGeneratorComponent", () => {

	let spectator: Spectator<PersonGeneratorComponent>;
	const createComponent = createComponentFactory({
		component: PersonGeneratorComponent,
		declarations: [
			PersonGeneratorComponent,
		],
		imports: [
			MatCheckboxModule,
			MatFormFieldModule,
			MatInputModule,
			MatButtonModule,
			ReactiveFormsModule,
			NoopAnimationsModule
		],
	});

	beforeEach(() => {
		spectator = createComponent();
	});


	test('should create', () => {
		expect(spectator.component).toBeTruthy();
	});


});

