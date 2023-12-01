import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiGiphyService {
  constructor() {}

  async buscarGif(path: string) {
    return await axios
      .get(
        environment.urlApi + '/gifs/search?api_key=' + environment.urlKey + path
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });
  }

  async obtenerGif(path: string) {
    return await axios
      .get(
        environment.urlApi +
          '/gifs/trending?api_key=' +
          environment.urlKey +
          path
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });
  }
}
