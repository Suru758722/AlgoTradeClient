import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  timeFrameList: any[] = [];

  marketForm: FormGroup
  updateOnce: boolean = true;
  constructor(private fb: FormBuilder, private adminService: AdminService) {
  
  this.vm = dotnetify.connect('LiveChartVM', {      
    getState: () => "",//this.state,
    setState: (state: any) =>  this.updateData(state)
  });
  
  this.initilizeForm()
  
  }
 
  initilizeForm() {
    this.marketForm = this.fb.group({
      InstrumentId: [0],
      Frame: [''],
      
    })
  }
  updateData(state) {
    console.log(state)
    Object.assign(this.state, state) 

    if(this.updateOnce){
      this.marketForm.controls.InstrumentId.setValue(this.state.Instrument);
      this.marketForm.controls.Frame.setValue(this.state.TimeFrame);
        this.updateOnce = false
        this.lineSeries.setData(this.state.chartList)
    }else{
      if(this.state.Chart !=0 && this.state.Time != null){
       
      this.lineSeries.update({ time: this.state.Time, value: this.state.Chart })
      }

    }
  }
  ngOnInit() {
    var chart = LightweightCharts.createChart(document.getElementById('chart'), {
      width: 900,
      height: 400,
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
    //this.lineSeries.setData(this.data)

    this.initilizeEverything()

  }
  initilizeEverything() {    

    this.adminService.getAll('Analysis/GetInstrument').subscribe((data: any) =>{
        this.instrumentList = data;
        
    })
    this.adminService.getAll('Analysis/GetTimeFrame').subscribe((data: any) =>{
      this.timeFrameList = data;
      
  })
    this.marketForm.controls.Frame.valueChanges.subscribe((data) =>{
        //this.state.TimeFrame =  data
       // this.vm.$dispatch(this.state)
       this.updateOnce = true

       this.vm.$dispatch({UpdateTime: data})

    })
    this.marketForm.controls.InstrumentId.valueChanges.subscribe((data) =>{
       // this.state.Instrument =  data
      //  this.vm.$dispatch(this.state)
        this.updateOnce = true
        this.vm.$dispatch({UpdateInstrument: data})

    })
  }
  deleteOldData(){
    this.adminService.get('Analysis/DeleteOldData').subscribe((data: any) =>{
      
  })
  }
  ngOnDestroy(){
   this.vm.$destroy()
 }
}
