import { AbstractControl } from '@angular/forms';

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) || (year % 4000 === 0);
}

function getDateFromNIC(year: number, dayOfYear: number): Date {
  const date = new Date(year, 0); // Jan 1st
  date.setDate(dayOfYear); // Let JS handle month/day rollover
  return date;
}

export function nicDobMatchValidator(control: AbstractControl) {
  const nic = control.get('nic')?.value;
  const dobControl = control.get('dob');

  if (!nic || nic.length < 7 || !dobControl?.value) return null;

  const year = parseInt(nic.substring(0, 4), 10);
  let dayOfYear = parseInt(nic.substring(4, 7), 10);

  if (dayOfYear > 500) dayOfYear -= 500;

  // Validate dayOfYear range
  const maxDays = isLeapYear(year) ? 366 : 365;
  if (dayOfYear < 1 || dayOfYear > maxDays) {
    return { invalidNIC: true };
  }

  const dobFromNIC = getDateFromNIC(year, dayOfYear-1);
  const enteredDOB = new Date(dobControl.value);

  const match =
    dobFromNIC.getFullYear() === enteredDOB.getFullYear() &&
    dobFromNIC.getMonth() === enteredDOB.getMonth() &&
    dobFromNIC.getDate() === enteredDOB.getDate();

  return match ? null : { dobMismatch: true };
}
