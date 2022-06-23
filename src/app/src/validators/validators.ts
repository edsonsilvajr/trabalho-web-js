import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DateTime } from 'luxon';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cpf = control.value;
    let valid;
    if (!cpf) {
      valid = false;
    } else if (cpf.toString().length !== 11) {
      valid = false;
    } else {
      let numbers, digits, sum, i, result, equalDigits;
      equalDigits = 1;
      for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
          equalDigits = 0;
          break;
        }
      }
      if (!equalDigits) {
        numbers = cpf.substring(0, 9);
        digits = cpf.substring(9);
        sum = 0;
        for (i = 10; i > 1; i--) {
          sum += numbers.charAt(10 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== Number(digits.charAt(0))) {
          valid = false;
        }
        numbers = cpf.substring(0, 10);
        sum = 0;

        for (i = 11; i > 1; i--) {
          sum += numbers.charAt(11 - i) * i;
        }
        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (result !== Number(digits.charAt(1))) {
          valid = false;
        } else {
          valid = true;
        }
      } else {
        valid = false;
      }
    }

    return valid ? null : { cpf: { value: control.value } };
  };
}

export function ageMajority(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let valid = false;
    const dataAtual = DateTime.now();
    const dataForm = DateTime.fromISO(control.value);
    const diff = dataAtual.diff(dataForm, ['years', 'months', 'days', 'hours']);
    if (diff.years >= 18) {
      valid = true;
    }
    return valid ? null : { underaged: { value: control.value } };
  };
}
