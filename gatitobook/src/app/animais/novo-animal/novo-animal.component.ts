import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AnimaisService } from '../animais.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css']
})
export class NovoAnimalComponent implements OnInit {
  formularioAnimal !: FormGroup; // Formulario reativo
  file !: File;
  preview !: string;
  percentualConcluido: number = 0;

  constructor(
    private animaisServie: AnimaisService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formularioAnimal = this.formBuilder.group({ //validacao
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    })
  }

  upload() {
    const allowComments = this.formularioAnimal.get('allowComments')?.value ?? false;
    const description = this.formularioAnimal.get('description')?.value ?? '';

    this.animaisServie.upload(description, allowComments, this.file)
      .pipe(
        finalize(() => this.router.navigate(['animais']))
      ).subscribe((event: HttpEvent<any>) => {
        if (event.type == HttpEventType.UploadProgress) { //Porcentagem do arquivo carregado
          const total = event.total ?? 1;
          this.percentualConcluido = Math.round(100 * (event.loaded / total));
        }
      }, (error) => {
        console.log(error);
      });
  }

  gravaArquivo(arquivo: any): void {
    const [file] = arquivo?.files;
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }

}
