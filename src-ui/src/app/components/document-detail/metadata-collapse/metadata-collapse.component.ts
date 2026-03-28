import { Component, Input } from '@angular/core'
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons'
import { TableModule } from 'primeng/table'

@Component({
  selector: 'pngx-metadata-collapse',
  templateUrl: './metadata-collapse.component.html',
  styleUrls: ['./metadata-collapse.component.scss'],
  imports: [NgbCollapseModule, NgxBootstrapIconsModule, TableModule],
})
export class MetadataCollapseComponent {
  constructor() {}

  expand = false

  @Input()
  metadata

  @Input()
  title = $localize`Metadata`
}
