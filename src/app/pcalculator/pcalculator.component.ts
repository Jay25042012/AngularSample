import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Calculator } from '../model/calculator';
import { PcalculationService } from '../service/pcalculation.service';
import { OccupationRating } from './occupationrating.enum';
import { trigger, state, style, animate, transition, AnimationMetadataType } from '@angular/animations';

/**
 * Component
 */
@Component({
  selector: 'app-pcalculator',
  templateUrl: './pcalculator.component.html',
  styleUrls: ['./pcalculator.component.scss'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        color: 'green'  
      })),
      state('final', style({
        color: 'blue' 
      })),
      transition('initial=>final', animate('3000ms')),
      transition('final=>initial', animate('1000ms'))
    ])]

 })
export class PcalculatorComponent {
  
  //occupations = ['', 'Cleaner', 'Doctor', 'Author', 'Farmer', 'Mechanic', 'Florist'];
  occupations = [{ Text: 'Cleaner', Value: OccupationRating.LightManual }, { Text: 'Doctor', Value: OccupationRating.Professional }, { Text: 'Author', Value: OccupationRating.WhiteCollar }, { Text: 'Farmer', Value: OccupationRating.HeavyManual }, { Text: 'Mechanic', Value: OccupationRating.HeavyManual }, { Text: 'Florist', Value: OccupationRating.LightManual }]

  form!: FormGroup;
  calculator!: Calculator;
  result!: any;
  error!: boolean;
  professionrating!: number;
  /**
   * Creates an instance of pcalculator component.
   * @param calculationService 
   * @param builder 
   */
  constructor(private calculationService: PcalculationService, private builder: FormBuilder) { }

  /**
   * on init
   */
  ngOnInit(): void {
    this.form = this.builder.group({
      name: ['', [Validators.required]],
      age: [{ value: '', disabled: 1 }, [Validators.required, Validators.min(0.1), Validators.max(60)]],
      dob: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      deathcoveramount: ['', [Validators.required, Validators.min(1000), Validators.max(1000000)]],

    });
  }

  get f() {
    return this.form.controls;
  }
  get name(): any { return this.form.get('name'); }
  get age(): any { return this.form.get('age'); }
  get dob(): any { return this.form.get('dob'); }
  get occupation(): any { return this.form.get('occupation'); }
  get deathcoveramount(): any { return this.form.get('deathcoveramount'); }

  /**
  * Determines whether occupation change on
 * @param _e 
 */
  onOccupationChange(_e: any) {
    console.log("the selected value is " + _e.target.value);
    this.professionrating = _e.target.value;
    this.onSubmit();
  }

  /**
   * Calculates age
   * @param dob 
   */
  CalculateAge(): void {
    console.log(this.dob.value);
    let calculatedage: number = moment().diff(this.dob.value, 'years')
    console.log(calculatedage);
    this.form.patchValue({
      age: calculatedage
    });
  }

  /**
   * Determines whether submit on
   * @returns  
   */
  onSubmit() {
    console.log('on submit');
    if (this.form.valid) {
      if (this.age.value == '' || (this.age.value > 1 && this.age.value < 99)) {
        var requestbody = {
          'Rate': this.occupation.value,
          'Age': this.age.value,
          'Deathcoveramount': this.deathcoveramount.value
        }
        this.calculationService.Calculate(requestbody).subscribe((data: {}) => {
          this.result = data;
          this.changeState();
        });
        console.log(this.result);
      }
      else {
        alert('Please check Date of Birth and Age should be in less than 99 years');
        return;
      }
    }
    else {
      alert('Please fill in details');
    }
  }
  currentState = 'initial';

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
  
}
