import { Component, Input } from '@angular/core';

export type IOptionsProps = {
  id: string,
  title: string,
  onClick?: ()=> void,
  iconUrl?: string,
}
@Component({
  selector: 'app-drop-down',
  imports: [],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
  @Input() options!: Array<IOptionsProps>;
}
