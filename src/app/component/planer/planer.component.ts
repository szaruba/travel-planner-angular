import { Component } from '@angular/core';
import { PlanerStateService } from 'src/app/service/planer-state.service';

@Component({
  selector: 'app-planer',
  templateUrl: './planer.component.html',
  styleUrls: ['./planer.component.scss'],
})
export class PlanerComponent {
  constructor(public stateService: PlanerStateService) {}
}
