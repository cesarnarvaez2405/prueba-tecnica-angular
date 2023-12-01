import { Component, Input } from '@angular/core';
import { gif } from '../../../../shared/model/gif.model';


@Component({
  selector: 'app-gif-cards',
  standalone: true,
  imports: [],
  templateUrl: './gif-cards.component.html',
})
export class GifCardsComponent {

  @Input({required: true}) gif!: gif;

}
