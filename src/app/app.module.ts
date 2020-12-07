import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EstadoComponent } from './estado/estado.component';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EstadoService } from './estado/estado.service';
import { CidadeComponent } from './cidade/cidade.component';
import { CidadeService } from './cidade/cidade.service';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ROUTES } from './app.routes';
import { CotacaoDolarService } from './services/cotacao-dolar.service';

@NgModule({
  declarations: [
    AppComponent,
    EstadoComponent,
    CidadeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    RouterModule.forRoot(ROUTES)

  ],
  providers: [EstadoService, CidadeService, MessageService, CotacaoDolarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
