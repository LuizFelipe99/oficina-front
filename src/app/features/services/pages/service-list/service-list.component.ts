import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../../vehicles/services/vehicle.service';

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
  loadingId: number | null = null;
  message = '';

  services: any[] = [];
  vehicles: any[] = [];

  constructor(private serviceService: ServiceService, private vehicleService: VehicleService) { }

  ngOnInit() {
    this.loadServices();
    this.vehicleService.getAll().subscribe(response => {
      this.vehicles = response.data;
    });
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

  start(service: any) {
    this.loadingId = service.id;

    this.serviceService.startService(service.id).subscribe({
      next: () => {
        this.loadingId = null;
        this.loadServices();
        this.message = 'Serviço iniciado com sucesso';
      },
      error: () => {
        this.loadingId = null;
        alert('Erro ao iniciar serviço');
      }
    });
  }

  finish(service: any) {
    this.loadingId = service.id;

    this.serviceService.finishService(service.id).subscribe({
      next: () => {
        this.loadingId = null;
        this.loadServices();
        this.message = 'Serviço finalizado com sucesso';

      },
      error: () => {
        this.loadingId = null;
        alert('Erro ao finalizar serviço');
      }
    });
  }

  getStatusClass(status: string) {
    return {
      'badge-open': status === 'open',
      'badge-progress': status === 'in_progress',
      'badge-done': status === 'done'
    };
  }

  getStatusLabel(status: string) {
    switch (status) {
      case 'open':
        return 'Em aberto';
      case 'in_progress':
        return 'Em andamento';
      case 'done':
        return 'Concluído';
      default:
        return status;
    }
  }
}