import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Client } from 'src/app/models';
import { DbService } from 'src/app/services';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],
})
export class ClientsPageComponent implements OnInit {
  clients: Client[];

  public readonly formGroup = this.formBuilder.group({
    name: ['', {validators: Validators.minLength(5)}],
    email: ['', { validators: [Validators.email]}]
  }, {
    updateOn: 'blur'
  });


  constructor(protected db: DbService, protected formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadClients();
    this.formGroup.valueChanges()
  }

  loadClients() {
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

  selectClient(client: Client): void {
    this.formGroup.patchValue(client);
  }

  updateClient(client: Client, path: string, value: any) {
    this.db.clients.child(client.key).child(path).set(value);
  }
}
