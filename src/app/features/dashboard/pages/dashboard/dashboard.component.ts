import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
   styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  stats = {
    open: 0,
    in_progress: 0,
    done: 0
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStats().subscribe(data => {
      this.stats = data;
    });
  }
}