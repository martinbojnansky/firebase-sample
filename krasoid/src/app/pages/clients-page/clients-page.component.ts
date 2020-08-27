import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models';
import { DbService } from 'src/app/services';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],
})
export class ClientsPageComponent implements OnInit {
  clients: Client[];

  constructor(protected db: DbService) {}

  ngOnInit(): void {
    this.updateClients();
  }

  updateClients() {
    this.db.clients.orderByChild('name').on('value', (c) => {
      const clients = c.val();
      this.clients = Object.keys(clients).map((ck) => ({
        key: ck,
        ...clients[ck],
      }));
    });
  }

  addClient() {
    this.db.clients.push({ firstName: '', lastName: '', email: '' });
  }

  updateClient(client: Client, path: string, value: any) {
    this.db.clients.child(client.key).child(path).set(value);
  }
}
