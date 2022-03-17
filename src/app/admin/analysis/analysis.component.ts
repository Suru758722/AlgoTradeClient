import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }
  sendFile(event){
    debugger
    this.adminService.post('Analysis/LoadBhavCopy').subscribe((data) =>{

    })
  }
}
