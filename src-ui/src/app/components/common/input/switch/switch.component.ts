import { NgClass } from '@angular/common'
import { Component, Input, forwardRef } from '@angular/core'
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons'
import { ToggleSwitch } from 'primeng/toggleswitch'
import { Tooltip } from 'primeng/tooltip'
import { AbstractInputComponent } from '../abstract-input'

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  selector: 'pngx-input-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgxBootstrapIconsModule, ToggleSwitch, Tooltip],
})
export class SwitchComponent extends AbstractInputComponent<boolean> {
  @Input()
  showUnsetNote: boolean = false

  tipText: string = $localize`Note: value has not yet been set and will not apply until explicitly changed`

  constructor() {
    super()
  }

  get isUnset(): boolean {
    return this.value === null || this.value === undefined
  }
}
