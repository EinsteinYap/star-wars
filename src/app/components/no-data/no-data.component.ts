import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {
@Input() issue!:string
@Input() btnColor!:string;
@Input() cardBtn!: string;
@Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();
constructor() {}
ngOnInit(): void {}

handleButtonClick(): void {
   this.buttonClicked.emit();
 }
}
