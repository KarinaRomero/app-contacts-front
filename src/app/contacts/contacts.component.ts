import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactService:ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(data =>{
      console.log(data);
      data.every(contact => {
        console.log(contact.nickName);
        this.contacts.push(contact);
      });
    }, error => {console.log(error.error.messsage)});
    /*for(let i = 0; i<15;i++) {
      this.contacts.push(new Contact("ho",22,"oksa","22222222"));
    }*/
  }



}
