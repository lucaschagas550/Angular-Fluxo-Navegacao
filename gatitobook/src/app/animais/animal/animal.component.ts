import { environment } from './../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';

const API: string = environment.apiURL;

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})

export class AnimalComponent implements OnInit {

  private urlOriginal: string = '';

  //Input indica que sera recebida pelo valor digitado no HTML
  @Input() descricao: string = '';

  @Input() set url(url: string) {
    if (url.startsWith('data')) {
      this.urlOriginal = url;
    } else {
      this.urlOriginal = `${API}/imgs/${url}`;
    }
  }

  get url(): string {
    return this.urlOriginal;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
