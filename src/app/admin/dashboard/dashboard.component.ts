import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { createChart } from 'lightweight-charts';

import { interval } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
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
  lineSeries: any
  data: any[] = []
  dispatch: any;
  instrumentList: any[] = [];
  marketForm: FormGroup
  updateOnce: boolean = true;
  constructor(private fb: FormBuilder, private adminService: AdminService) {
  
  this.vm = dotnetify.connect('LiveChartVM', {      
    getState: () => this.state,
    setState: (state: any) =>  this.updateData(state)
  });
  
  this.initilizeForm()
  
  }
 
  initilizeForm() {
    this.marketForm = this.fb.group({
      InstrumentId: [0],
      Frame: ['min'],
      
    })
  }
  updateData(state) {
    Object.assign(this.state, state) 
    const now = Date.now()
    this.lineSeries.update({ time: now, value: this.state.Chart })

    if(this.updateOnce){
    this.initilizeEverything()
        this.updateOnce = false
    }
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
  initilizeEverything() {    

    this.adminService.getAll('Analysis/GetInstrument').subscribe((data: any) =>{
        this.instrumentList = data;
        this.marketForm.controls.InstrumentId.setValue(data[0].id);
        this.state.TimeFrame = 'min';
        this.state.Instrument = data[0].id
        this.vm.$dispatch(this.state)
    })

    this.marketForm.controls.Frame.valueChanges.subscribe((data) =>{
        this.state.TimeFrame =  data
        this.vm.$dispatch(this.state)
    })
    this.marketForm.controls.InstrumentId.valueChanges.subscribe((data) =>{
        this.state.Instrument =  data
        this.vm.$dispatch(this.state)
        //this.vm.$dispatch({UpdateData: 'name'})

    })
  }

 
}
