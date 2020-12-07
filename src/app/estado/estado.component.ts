import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstadoService } from './estado.service';
import { CidadeService } from '../cidade/cidade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CotacaoDolarService } from '../services/cotacao-dolar.service';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  estadoFilter: FormGroup;
  city: string;
  estados: any[] = [];
  cidades: any[] = [];
  estadoSelecionado: any;
  selectedCategory: any = null;
  totalDeHabitantesPorEstadoSelecionado: number;
  cotacaoDolar: any;
  custoPorEstado: any;
  message:string
  msgs = [];
  @Input() errors:string[]

  constructor(private formBuilder: FormBuilder,
              private service: EstadoService,
              private cidadeService: CidadeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private cotacaoDolarService: CotacaoDolarService) { }

  ngOnInit(): void {
    this.carregarEstados();
    this.montarFormulario();
    this.carregarCidadesPorEstado(2);
  }

  consultarCotacaoDolar() {
    this.cotacaoDolarService.consultarCotacaoDolar()
    .subscribe((response) => {
      this.cotacaoDolar = response[0].low;
      this.calcularCustoHabitantes();
    })
  }

  carregarEstados(): void {
    this.service.getEstados()
    .subscribe((response) => {
      this.estados = response.data;
      this.estadoSelecionado = this.estados[1];
      })
  }

  carregarCidadesPorEstado(idEstado: number): void {
    this.cidadeService.getCidadesPorEstado(idEstado)
    .subscribe((response) => {
      this.cidades = response.data;
      this.totalDeHabitantesPorEstadoSelecionado = this.cidades.map((prod) => prod.qtdCidadoes).reduce((total, qtd) => total + qtd);
      this.consultarCotacaoDolar();
    })
  }

  private montarFormulario() {
    this.estadoFilter = this.formBuilder.group({
      estado: [undefined]
    })
  }

  onRadioChange(estado: any) {
    this.estadoSelecionado = estado;
    this.carregarCidadesPorEstado(estado.id);
    this.calcularCustoHabitantes();
  }

  private calcularCustoHabitantes() {
    console.log(this.totalDeHabitantesPorEstadoSelecionado)
    let valorCidadao = 123.45;
    let valorCidadaoAjuste = valorCidadao - 15.18;
    if(this.totalDeHabitantesPorEstadoSelecionado > 50000) {
      let cidadoesComAjuste = this.totalDeHabitantesPorEstadoSelecionado - 50000;
      this.custoPorEstado = (50000*valorCidadao) + (cidadoesComAjuste*valorCidadaoAjuste);
    }else {
      this.custoPorEstado = this.totalDeHabitantesPorEstadoSelecionado*valorCidadao;
    }
    this.custoPorEstado = this.custoPorEstado * this.cotacaoDolar;
  }

  public remover(cidade: any) {
    this.cidadeService.removerCidade(cidade.id)
    .subscribe(() => {
      this.carregarCidadesPorEstado(this.estadoSelecionado.id);
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Cidade removida com sucesso.'});
    },
    (error) => this.messageService.add({severity:'error', summary: 'Erro', detail: error.error.errors[0]}));
  }

  public navegar(path: string): void {
    this.router.navigate([path], { relativeTo: this.activatedRoute });
  }

}
