import { Component, EventEmitter, Output, inject } from '@angular/core'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { Message } from 'primeng/message'
import { TourService } from 'ngx-ui-tour-ng-bootstrap'

@Component({
  selector: 'pngx-welcome-widget',
  templateUrl: './welcome-widget.component.html',
  styleUrls: ['./welcome-widget.component.scss'],
  imports: [NgbAlertModule, Message],
})
export class WelcomeWidgetComponent {
  readonly tourService = inject(TourService)

  @Output()
  dismiss: EventEmitter<boolean> = new EventEmitter()
}
