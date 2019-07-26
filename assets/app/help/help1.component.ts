import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'help1',
    templateUrl: './help1.component.html',
    styleUrls: ['./help1.component.css']
  })
  
  export class Help1Component implements OnInit {

    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit() {}
  }