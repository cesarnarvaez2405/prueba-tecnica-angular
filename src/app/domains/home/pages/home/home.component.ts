import Swal from 'sweetalert2';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiGiphyService } from '../../../shared/services/api-giphy.service';
import { LoadingSkeletonComponent } from '../components/loading-skeleton/loading-skeleton.component';
import { GifCardsComponent } from '../components/gif-cards/gif-cards.component';
import { gif } from '../../../shared/model/gif.model';
import { LimpiarFiltroComponent } from '../components/limpiar-filtro/limpiar-filtro.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSkeletonComponent, GifCardsComponent, LimpiarFiltroComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  gifABuscar = new FormControl('');
  gifs = signal<gif[]>([]);
  estadoConsulta = signal('cargando');

  private gifService = inject(ApiGiphyService);

  async ngOnInit() {
    await this.obtenerGifSinParametro();
    this.estadoConsulta.set('consultado');
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
    this.estadoConsulta.set('consultado');
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'Busqueda con ¡exito!',
    });
  }

  async obtenerGifSinParametro() {
    const path = `&limit=25&offset=0&rating=g&lang=es&bundle=messaging_non_clips`;
    const gif = await this.gifService.obtenerGif(path);
    this.gifs.set(gif.data);
  }
}
