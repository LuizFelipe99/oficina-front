import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {

  clients: any[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAll().subscribe(res => {
      this.clients = res.data;
    });
  }

  delete(id: number) {
    if (confirm('Deseja excluir?')) {
      this.clientService.delete(id).subscribe(() => {
        this.loadClients();
      });
    }
  }
}