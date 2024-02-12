import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from  '@angular/common/http';
import {  Chart, ChartConfiguration }  from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  chart: any = [];

  public dataSource: ChartConfiguration['data'] = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ]
        }
    ],
    labels: []
};

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any): void => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels = res.myBudget[i].title;
        this.createChart();
    }
    });
  }

  createChart() {
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }


}
