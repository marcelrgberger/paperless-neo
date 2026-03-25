import { Injectable } from '@angular/core'
import {
  DialogService,
  DynamicDialogRef,
} from 'primeng/dynamicdialog'

@Injectable({ providedIn: 'root' })
export class NeoDialogService {
  constructor(private dialogService: DialogService) {}

  open(
    component: any,
    options: {
      data?: any
      header?: string
      width?: string
      modal?: boolean
      dismissableMask?: boolean
      styleClass?: string
    } = {}
  ): DynamicDialogRef {
    return this.dialogService.open(component, {
      data: options.data || {},
      header: options.header || '',
      width: options.width || '50vw',
      modal: options.modal !== false,
      dismissableMask: options.dismissableMask !== false,
      styleClass: options.styleClass || 'neo-dialog',
      breakpoints: { '960px': '75vw', '640px': '90vw' },
    })
  }
}
