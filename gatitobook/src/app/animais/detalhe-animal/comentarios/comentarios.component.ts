import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Comentarios } from './comentarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentariosService } from './comentarios.service';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input() id !: number;
  comentarios$ !: Observable<Comentarios>;
  comentarioForm !: FormGroup;

  constructor(
    private comentarioService: ComentariosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentarioService.buscaComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.maxLength(300)]
    })
  }

  gravar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    console.log(comentario);
    this.comentarioService.incluiComentario(this.id, comentario)
      .pipe(tap(() => {
        console.log(this.id);
        this.router.navigate([`/animais/`])
        this.comentarioForm.reset();
      })
      ).subscribe();
  }
}
