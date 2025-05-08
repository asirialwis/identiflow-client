import { AbstractControl } from '@angular/forms';

export function nicDobMatchValidator(control: AbstractControl) {
  const nic = control.get('nic')?.value;
  const dobControl = control.get('dob');

  if (!nic || nic.length < 7 || !dobControl?.value) return null;
  //200107101865
  const year = parseInt(nic.substring(0, 4), 10); //2001
  let dayOfYear = parseInt(nic.substring(4, 7), 10); //071
  if (dayOfYear > 500) dayOfYear -= 500; // female

  const dobFromNIC = new Date(year, 0);

  dobFromNIC.setDate(dayOfYear - 1);

  const enteredDOB = new Date(dobControl.value);

  const match =
    dobFromNIC.getFullYear() === enteredDOB.getFullYear() &&
    dobFromNIC.getMonth() === enteredDOB.getMonth() &&
    dobFromNIC.getDate() === enteredDOB.getDate();

  return match ? null : { dobMismatch: true };
}
