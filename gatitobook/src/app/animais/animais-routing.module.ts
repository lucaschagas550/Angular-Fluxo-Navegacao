import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { ListaAnimaisResolver } from './lista-animais/lista-animais.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListaAnimaisComponent,
    resolve: {
      animais: ListaAnimaisResolver //vai fazer a busca na api e guardar os dados na variavel animais, com tem acesso antes do componente ser redenrizado
    }
  },
  {
    path: ':animalID',//Para deixar dinamico animais/55 colocar : e o nome da variavel(pode ser qualquer um ) ActivatedRoute  detalhe.animal.component
    component: DetalheAnimalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimaisRoutingModule { }
