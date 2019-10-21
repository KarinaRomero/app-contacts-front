import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

declare var $: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[] = [];
  action = "";
  currentContact: Contact = new Contact("", 0, "", "");

  private isAsc = false;
  iconURL = "fas fa-arrows-alt-v";
  indicador = {
    name:"",
    age:"",
    phone:"",
  }

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
      this.sortTableBy("name");
    }, error => {  });
  }

  create() {
    this.action = "Create"
    this.currentContact = new Contact("", 0, "", "");
  }

  update(id: number) {

    console.log("Update "+id);
    this.action = "Update"
    this.currentContact = this.contacts.find(function (element) {
      return element.idContact === id;
    });

  }
  onSubmit() {
    if (this.action == "Update") {
      this.contactService.update(this.currentContact.idContact, this.currentContact).subscribe(data => {

      });
    }
    if (this.action == "Create") {
      this.contactService.create(this.currentContact).subscribe(data => {

        this.contacts.push(data);
      });
    }
    this.currentContact = new Contact("", 0, "", "");
    this.action = "";
    $('#exampleModal').modal('hide');
  }

  delete(id: number) {

    console.log("Delete "+id);
    this.contactService.delete(id).subscribe(() => {
      this.contacts.forEach(e => {
        if (e.idContact == id) {
          const index = this.contacts.indexOf(e, 0);
          this.contacts.splice(index, 1);
        }
      })
    });
  }

  sortTableBy(name:string) {
    this.contacts.sort((n1, n2) => this.sortData(n1, n2, name));
    this.isAsc = !this.isAsc;
    if(this.isAsc) {
      this.iconURL = "fas fa-chevron-up"
    }else {

      this.iconURL = "fas fa-chevron-down"
    }
  }

  sortData(data1: Contact, data2: Contact, sortBy: string) {

    let n1: any, n2: any;
    switch (sortBy) {
      case "name":
        n1 = data1.name;
        n2 = data2.name;
        this.indicador.name = this.iconURL;
        this.indicador.age = "";
        this.indicador.phone = "";
        break;
      case "age":
        n1 = data1.age;
        n2 = data2.age;
        this.indicador.age = this.iconURL;
        this.indicador.name = "";
        this.indicador.phone = "";
        break;
      case "phone":
          n1 = data1.phoneNumber;
          n2 = data2.phoneNumber;
          this.indicador.phone = this.iconURL;
          this.indicador.age = "";
          this.indicador.name = "";
          break;
      default:
        n1 = data1.idContact;
        n2 = data2.idContact;
    }

    if (n1 === n2) {
      return 0;
    } else if (!this.isAsc) {
      return (n1 < n2) ? -1 : 1;
    } else {
      return (n1 > n2) ? -1 : 1;
    }
  }
}
