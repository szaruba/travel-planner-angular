import { Component, HostListener } from '@angular/core';
import { PlanerStateService } from 'src/app/service/planer-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'travel-planner-angular';

  constructor(private planerStateService: PlanerStateService) {}

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(): void {
    this.planerStateService.store();
  }
}
