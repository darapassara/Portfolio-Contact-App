class Contact {
    constructor(subject, name, gender, phone, email, facebook) {
        this.subject = subject;
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.facebook = facebook;
    }
}


class Interface {
    static displayContacts() {
        const contacts = Store.getContacts();
        contacts.forEach((contact) => Interface.addContactToList(contact));
    }

    static addContactToList(contact) {
        const list = document.querySelector('#contact-list');
        const row = document.createElement('tr');

        row.innerHTML = `
    
        <tr>
            <td>${contact.subject}</td>
            <td>${contact.name}</td>
            <td>${contact.gender}</td>
            <td>${contact.phone}</td>
        </tr>
        <tr>
            <td>${contact.email}</td>
            <td>${contact.facebook}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete"> Del </a></td>
        </tr>
    
      `;

        list.appendChild(row);
    }

    static deleteContact(e1) {
        if (e1.classList.contains('delete')) {
            e1.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#contact-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#subject').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#gender').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#facebook').value = '';
    }
}


class Store {
    static getContacts() {
        let contacts;
        if (localStorage.getItem('contacts') === null) {
            contacts = [];
        } else {
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts;
    }

    static addContact(contact) {
        const contacts = Store.getContacts();
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    static removeContact(phone) {
        const contacts = Store.getContacts();

        contacts.forEach((contact, index) => {
            if (contact.phone === phone) {
                contacts.splice(index, 1);
            }
        });

        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}


document.addEventListener('DOMContentLoaded', Interface.displayContacts);


document.querySelector('#contact-form').addEventListener('submit', (e2) => {
    e2.preventDefault();

    const subject = document.querySelector('#subject').value;
    const name = document.querySelector('#name').value;
    const gender = document.querySelector('#gender').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    const facebook = document.querySelector('#facebook').value;
    
    
    if (subject === '' || name === '' || gender === '' || phone === '' || email === '' || facebook === '' ) {
        Interface.showAlert('Please fill in all fields', 'danger');
    } else {
        const contact = new Contact(subject, name, gender, phone, email, facebook);
        Interface.addContactToList(contact);
        Store.addContact(contact);
        Interface.showAlert('Contact Added', 'success');
        Interface.clearFields();
    }
});


document.querySelector('#contact-list').addEventListener('click', (e2) => {
    Interface.deleteContact(e2.target);
    Store.removeContact(e2.target.parentElement.previousElementSibling.textContent);
    Interface.showAlert('Contact Removed', 'success');
});
