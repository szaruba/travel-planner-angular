import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.scss'],
})
export class TypeCardComponent {
  @Input()
  public title!: string;
  @Input()
  public assetPath!: string;
  @Input()
  isSelected: boolean = false;

  @Output()
  selectionChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
}
