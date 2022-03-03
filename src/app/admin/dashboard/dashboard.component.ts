import { Component, OnInit } from '@angular/core';
declare var LightweightCharts: any
declare var require: any
const dotnetify: any = require('dotnetify');
dotnetify.hubServerUrl = 'http://localhost:46194';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  state: any = {};
  vm: any;
 title = 'NSEApp';
 lineSeries : any
 data: any[]= [{time: 1556877600, value: 17100}]
constructor(){
 this.vm = dotnetify.connect('LiveChartVM', {      
   getState: () => this.state,
   setState: (state: any) => this.updateData(state)
 });
}

updateData(state: any){

 const now = Date.now();
 
 this.data.push({time: now, value: state.Chart[0]})
 this.lineSeries.update({time: now, value: state.Chart[0]})

 }
ngOnInit(){
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

}
