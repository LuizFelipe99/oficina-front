import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent implements OnInit {
  filters = {
    status: '',
    vehicle_id: ''
  };
  currentPage = 1;
  lastPage = 1;

  services: any[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    const cleanFilters: any = {
      page: this.currentPage
    };

    if (this.filters.status) {
      cleanFilters.status = this.filters.status;
    }

    if (this.filters.vehicle_id) {
      cleanFilters.vehicle_id = this.filters.vehicle_id;
    }

    this.serviceService.getAll(cleanFilters).subscribe(response => {
      this.services = response.data;

      // PAGINAÇÃO
      this.currentPage = response.meta.current_page;
      this.lastPage = response.meta.last_page;
    });
  }

  prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.loadServices();
  }
}

  nextPage() {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;
      this.loadServices();
    }
  }
}