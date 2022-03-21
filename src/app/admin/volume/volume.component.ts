import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
declare var LightweightCharts: any
declare var require: any
const dotnetify: any = require('dotnetify');
dotnetify.hubServerUrl = 'http://localhost:46194';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {

 
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
  
  this.vm = dotnetify.connect('LiveVolumeVM', {      
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
    const now = Date.now()
    this.lineSeries.update({ time: now, value: this.state.Chart })

    if(this.updateOnce){
      this.marketForm.controls.InstrumentId.setValue(this.state.Instrument);
      this.marketForm.controls.Frame.setValue(this.state.TimeFrame);

        this.updateOnce = false
    }
  }
  ngOnInit() {
    var chart = LightweightCharts.createChart(document.getElementById('volChart'), {
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
       this.vm.$dispatch({UpdateTime: data})

    })
    this.marketForm.controls.InstrumentId.valueChanges.subscribe((data) =>{
       // this.state.Instrument =  data
      //  this.vm.$dispatch(this.state)
        this.vm.$dispatch({UpdateInstrument: data})

    })
  }

}
