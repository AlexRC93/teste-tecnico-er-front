import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from './cidade.service';
import { EstadoService } from '../estado/estado.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cidade',
  templateUrl: './cidade.component.html',
  styleUrls: ['./cidade.component.css']
})
export class CidadeComponent implements OnInit {

  cidadeFilter: FormGroup;
  cidades: any[] = [];
  comboEstados: any[] = [];
  cidade: any;

  constructor(private formBuilder: FormBuilder,
  private cidadeService: CidadeService,
  private estadoService: EstadoService,
  private messageService: MessageService,
  private location: Location) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.carregarEstados();
  }

  private montarFormulario() {
    this.cidadeFilter = this.formBuilder.group({
      nomeCidade: [undefined, Validators.required],
      estado: [undefined, Validators.required],
      qtdHabitantes: [undefined, Validators.required]
    })
  }

  carregarEstados(): void {
    this.estadoService.getEstados()
    .subscribe((response) => {
      this.comboEstados = response.data;
      console.log(this.comboEstados)
      })
  }

  adicionar() {
    this.cidade = {
      descricao: this.cidadeFilter.getRawValue().nomeCidade,
      idEstado: this.cidadeFilter.getRawValue().estado.id,
      nomeEstado: this.cidadeFilter.getRawValue().estado.descricao,
      qtdCidadoes: this.cidadeFilter.getRawValue().qtdHabitantes
    }
    if(this.cidadeComMesmoEstado(this.cidade)) {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Cidade já existente para este estado.'})
    }else {
      this.cidades.push(this.cidade);
      this.cidade = undefined;
      this.cidadeFilter.reset();
    }
  }

  private cidadeComMesmoEstado(cidadeFiltro: any): boolean {
    let resp = false;
    this.cidades.forEach((cidade) => {
      if(cidadeFiltro.descricao == cidade.descricao && cidadeFiltro.idEstado == cidade.idEstado) {
        resp = true;
      }
    })
    return resp;
  }

  voltar() {
    this.location.back();
  }

  salvarCidade() {
    this.cidadeService.salvarCidade(this.cidades)
    .subscribe(() => {
      this.messageService.add({severity:'success', summary: 'Successo', detail: 'Cidade(s) inserida(s) com sucesso.'});
      this.voltar();
    })
  }
}
