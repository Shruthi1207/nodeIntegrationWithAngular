import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'help2',
    templateUrl: './help2.component.html',
    styleUrls: ['./help2.component.css']
  })
  
  export class Help2Component implements OnInit {

    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit() {}
  }