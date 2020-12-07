import {Routes} from '@angular/router'
import { EstadoComponent } from './estado/estado.component'
import { CidadeComponent } from './cidade/cidade.component'

export const ROUTES: Routes = [
    {path: '', component: EstadoComponent},
    {path: 'estados', component: EstadoComponent},
    {path: 'cidades', component: CidadeComponent}
]
