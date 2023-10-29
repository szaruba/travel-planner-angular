import { Component } from '@angular/core';
import { PlanerStateService } from 'src/app/service/planer-state.service';

@Component({
  selector: 'app-type-page',
  templateUrl: './type-page.component.html',
  styleUrls: ['./type-page.component.scss'],
})
export class TypePageComponent {
  constructor(public stateService: PlanerStateService) {}
}
