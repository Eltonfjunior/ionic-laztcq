import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public Valor = 0;
  public Taxa = 0;
  public Quantidade = 0;
  public totalParcela;
  public totalEmprestimo;
  public diferencaJuros;
  public saldoDevedor;
  public amortizacao;
  public juros;
  public taxaFim;

  public listaParcelas = new Array();

  constructor(public navCtrl: NavController) {
     this.calcularEmprestimo();
  }
  calcularEmprestimo() {
    this.listaParcelas = [];
    this.totalParcela = 0;
    this.totalEmprestimo = 0;
    this.diferencaJuros = 0;
    this.saldoDevedor = 0;
    this.amortizacao = 0;
    this.juros = 0;

    let count = 1;
    if(this.Valor > 0 && this.Quantidade > 0){
      //calcula se não existir juros.
      if(this.Taxa === 0){
        this.taxaFim = 0;
        this.totalParcela = this.Valor / this.Quantidade;
        this.totalEmprestimo = this.Valor;
        this.diferencaJuros = 0;
        this.saldoDevedor = this.Valor;
        this.amortizacao = this.totalParcela;
        this.juros = 0;
      //Calcula se existir juros.
      }else if(this.Taxa > 0){
        this.taxaFim = this.Taxa / 100;
        this.totalEmprestimo = this.Valor;
        this.totalParcela = this.totalEmprestimo * this.taxaFim * Math.pow((1+this.taxaFim),this.Quantidade)/(Math.pow((1+this.taxaFim),this.Quantidade)-1);
        this.totalEmprestimo = this.totalParcela * this.Quantidade;
        this.saldoDevedor = this.Valor;
        this.diferencaJuros = this.totalEmprestimo - this.Valor;
      }
      //Seta parcelas.
      for(let i=0; i<this.Quantidade; i++){
        this.juros = this.saldoDevedor * this.taxaFim;
        this.amortizacao = this.totalParcela - this.juros;
        this.saldoDevedor -= this.amortizacao,
        this.listaParcelas.push({
          numParcela:count,
          saldoDevedor:this.saldoDevedor.toFixed(2),
          valorAmortizacao:this.amortizacao.toFixed(2),
          valorJuros:this.juros.toFixed(2),
          valorParcela:this.totalParcela.toFixed(2)
        });
        count++;
      }

     // Formata valores.
      this.totalParcela = 
        +this.totalParcela.toFixed(2);
      this.diferencaJuros = 
          +this.diferencaJuros.toFixed(2);
      this.totalEmprestimo = 
          +this.totalEmprestimo.toFixed(2);
    } 
  }
}
