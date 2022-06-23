import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrMessageService {
  constructor(private toastr: ToastrService) {}

  showMessage(type = 'success', message = '', title?: string) {
    if (type === 'success') {
      this.toastr.success(message, title ?? 'Sucesso!');
    }
    if (type === 'error') {
      this.toastr.error(message, title ?? 'Erro!');
    }
  }
}
