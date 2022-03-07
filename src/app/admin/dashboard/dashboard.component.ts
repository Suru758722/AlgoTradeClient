import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
declare var LightweightCharts: any
declare var require: any
const dotnetify: any = require('dotnetify');
dotnetify.hubServerUrl = 'http://localhost:46194';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  state: any = {};
  vm: any;
  title = 'NSEApp';
  lineSeries: any
  data: any[] = [{ time: 1556877600, value: 17100 }]
  dispatch: any;
  constructor() {
  //   interval(5000).subscribe(x => {
  //     this.getChartData();
  // });
  this.vm = dotnetify.connect('LiveChartVM', {      
    getState: () => this.state,
    setState: (state: any) =>  this.updateData(state)
  });
  
  
  }
  changeTimeFrame(){
    this.state.TimeFrame = 'Day'
    this.vm.$dispatch(this.state)
    this.vm.$dispatch({UpdateData: 'name'})
  }
  updateData(state) {
    Object.assign(this.state, state) 
    const now = Date(this.state.Time)
    this.lineSeries.update({ time: now, value: this.state.Chart })
  }
  ngOnInit() {
  
    var chart = LightweightCharts.createChart(document.getElementById('chart'), {
      width: 600,
      height: 300,
      layout: {
        backgroundColor: '#ffffff',
        textColor: 'rgba(33, 56, 77, 1)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.7)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.7)',
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    this.lineSeries = chart.addLineSeries();
    this.lineSeries.setData(this.data)

    
  }

 getChartData(){
  
}

}
