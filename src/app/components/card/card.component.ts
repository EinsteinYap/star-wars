import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardBtn!: string;
  @Input() btnColor!:string;
  @Input() name!:string;
  @Input() planet!:string;
  @Input() height!:string;
  @Input() gender!:string;
  @Input() birth!:string;
  @Input() eye!:string;
  @Input() hair!:string;
  @Input() skin!:string;
  @Input() noFavorite!:string;
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}
  ngOnInit(): void {}
  handleButtonClick(): void {
    this.buttonClicked.emit();
  }
}
