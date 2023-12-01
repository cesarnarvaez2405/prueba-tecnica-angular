import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiGiphyService } from '../../../shared/services/api-giphy.service';
import { gif } from '../../../shared/model/gif.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  gifABuscar = new FormControl('');
  gifs = signal<gif[]>([]);

  private gifService = inject(ApiGiphyService);

  async ngOnInit() {
    await this.obtenerGifSinParametro();
  }

  buscarElGif() {
    this.obtenerGifsConParametro();
    this.gifABuscar.setValue('');
  }

  async obtenerGifsConParametro() {
    const searchTerm = (this.gifABuscar.value || '')
      .toString()
      .replace(/\s+/g, '+');
    const path = `&q=${searchTerm}&limit=25&offset=0&rating=g&lang=es&bundle=messaging_non_clips`;
    const gif = await this.gifService.buscarGif(path);
    this.gifs.set(gif.data);
  }

  async obtenerGifSinParametro() {
    const path = `&limit=25&offset=0&rating=g&lang=es&bundle=messaging_non_clips`;
    const gif = await this.gifService.obtenerGif(path);
    this.gifs.set(gif.data);
  }
}
