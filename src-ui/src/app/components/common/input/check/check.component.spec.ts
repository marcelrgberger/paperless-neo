import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { CheckComponent } from './check.component'

describe('CheckComponent', () => {
  let component: CheckComponent
  let fixture: ComponentFixture<CheckComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [FormsModule, ReactiveFormsModule, CheckComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CheckComponent)
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
})
