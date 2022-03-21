import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AnalysisComponent } from './analysis/analysis.component';
import { AdminService } from '../service/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolumeComponent } from './volume/volume.component';

@NgModule({
  declarations: [DashboardComponent, SidebarComponent, AnalysisComponent, VolumeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,  
  ],
  providers:[AdminService]
})
export class AdminModule { }
