import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'help3',
    templateUrl: './help3.component.html',
    styleUrls: ['./help3.component.css']
  })
  
  export class Help3Component implements OnInit {

    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit() {}
  }