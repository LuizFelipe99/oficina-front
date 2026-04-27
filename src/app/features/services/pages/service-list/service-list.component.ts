import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent implements OnInit {

  services: any[] = [];

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.serviceService.getAll().subscribe(response => {
      this.services = response.data;
    });
  }
}