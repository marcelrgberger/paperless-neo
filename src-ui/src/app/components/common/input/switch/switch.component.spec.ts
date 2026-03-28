import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { SwitchComponent } from './switch.component'

describe('SwitchComponent', () => {
  let component: SwitchComponent
  let fixture: ComponentFixture<SwitchComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SwitchComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SwitchComponent)
    fixture.debugElement.injector.get(NG_VALUE_ACCESSOR)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should support use of checkbox', () => {
    component.value = true
    component.onChange(true)
    fixture.detectChanges()
    expect(component.value).toBeTruthy()

    component.value = false
    component.onChange(false)
    fixture.detectChanges()
    expect(component.value).toBeFalsy()
  })

  it('should correctly report unset', () => {
    component.value = null
    expect(component.isUnset).toBeTruthy()
    component.value = undefined
    expect(component.isUnset).toBeTruthy()
  })
})
