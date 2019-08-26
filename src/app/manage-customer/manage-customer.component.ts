import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../dto/customer';
import {CustomerService} from '../service/customer.service';
import {NgForm} from '@angular/forms ';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit {
  customers: Array <Customer> = [];
  currentCustomer = new Customer('', '', '');
  selectedCustomer = new Customer('' , '' , '');
  buttonText = 'Save';
  hoverCustomer = null;

  @ViewChild('txtId', { static: false}) txtId: ElementRef;
  @ViewChild('frmCustomer', {static: false}) frmCustomer: NgForm;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
      // this.showTableFoot = false;
    }, error1 => {
      // this.showTableFoot = true;
      console.log(error1);
    });
  }
//   loadCustomers() {
//   this.customerService.getAllCustomers().subscribe(customers => {
//     this.customers = customers; });
// }

  onRowClicked(customer: Customer) {
    this.selectedCustomer = customer;
  }

  mouseEnter(customer: Customer): void {
    this.hoverCustomer = customer;
  }

  getTrashClasses(customer: Customer) {
    return {
      fas: true,
      'fa-trash': this.hoverCustomer !== customer,
      'fa-trash-restore-alt': this.hoverCustomer === customer
    };
  }

  deleteCustomer(customer: Customer): void {
    if (confirm('Are you sure whether you want to delete this customer?')) {
      this.customerService.deleteCustomer(customer.id).subscribe(resp => {
          alert('Customer deleted successfully');
          const index = this.customers.indexOf(customer);
          this.customers.splice(index, 1);
          this.selectedCustomer = new Customer('', '', '');
        },
        error1 => {
          alert('Failed to delete the customer for some reason, please check the console...!');
          console.log(error1);
        });
    }

  }

  saveCustomer(): void {
    if (this.frmCustomer.valid) {
      if (this.buttonText === 'Save') {
        this.customerService.saveCustomer(this.currentCustomer).subscribe(resp => {
          alert('Customer has been saved successfully');
          this.customers.push(this.currentCustomer);

        }, error1 => {
          alert('Failed to save the customer');
          console.log(error1);
        });
      } else {
        this.customerService.updateCustomer(this.currentCustomer).subscribe(resp => {
          alert('Customer has been updated successfully');
          // this.selectedCustomer.id = this.currentCustomer.id;
          // this.selectedCustomer.name = this.currentCustomer.name;
          // this.selectedCustomer.address = this.currentCustomer.address;
          Object.assign(this.selectedCustomer, this.currentCustomer);

        }, error1 => {
          alert('Failed to save the customer');
          console.log(error1);
        });
      }
    } else {
      alert('Please enter correct date before submitting');
    }






  }}
