import { ActivatedRoute } from '@angular/router';
import { AnimaisService } from './../animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../animais';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {

  //que nao esta sendo instanciado !:
  animalId !: number;
  animal$ !: Observable<Animal>;

  constructor(private animaisService: AnimaisService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params.animalID //pega o id da rota declarado no path do routing.module
    this.animal$ = this.animaisService.buscaPorId(this.animalId);
  }

}
