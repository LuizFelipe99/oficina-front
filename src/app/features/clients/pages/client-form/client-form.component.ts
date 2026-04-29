import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent implements OnInit {

  client: any = {
    name: '',
    email: ''
  };

  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) { }

  clientId!: number;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.clientId = id;

    if (id) {
      this.isEdit = true;
      

      this.clientService.getById(id).subscribe(res => {
        this.client = res.data; // 👈 importante
      });
    }
  }



  save() {
    if (this.isEdit) {
      this.clientService.update(this.clientId, this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.clientService.create(this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }
}