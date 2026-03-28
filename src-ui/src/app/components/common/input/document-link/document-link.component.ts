import { NgTemplateOutlet } from '@angular/common'
import {
  Component,
  forwardRef,
  inject,
  Input,
  OnDestroy,
} from '@angular/core'
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AutoComplete } from 'primeng/autocomplete'
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons'
import {
  catchError,
  map,
  of,
  Subject,
  takeUntil,
} from 'rxjs'
import { Document } from 'src/app/data/document'
import { FILTER_TITLE } from 'src/app/data/filter-rule-type'
import { CustomDatePipe } from 'src/app/pipes/custom-date.pipe'
import { DocumentService } from 'src/app/services/rest/document.service'
import { AbstractInputComponent } from '../abstract-input'

@Component({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocumentLinkComponent),
      multi: true,
    },
  ],
  selector: 'pngx-input-document-link',
  templateUrl: './document-link.component.html',
  styleUrls: ['./document-link.component.scss'],
  imports: [
    CustomDatePipe,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgTemplateOutlet,
    AutoComplete,
    NgxBootstrapIconsModule,
  ],
})
export class DocumentLinkComponent
  extends AbstractInputComponent<any[]>
  implements OnDestroy
{
  private documentsService = inject(DocumentService)

  loading = false
  selectedDocuments: Document[] = []
  suggestions: Document[] = []

  private unsubscribeNotifier: Subject<any> = new Subject()

  @Input()
  notFoundText: string = $localize`No documents found`

  @Input()
  parentDocumentID: number

  @Input()
  minimal: boolean = false

  @Input()
  placeholder: string = $localize`Search for documents`

  get selectedDocumentIDs(): number[] {
    return this.selectedDocuments.map((d) => d.id)
  }

  writeValue(documentIDs: number[]): void {
    if (!documentIDs || documentIDs.length === 0) {
      this.selectedDocuments = []
      super.writeValue([])
    } else {
      this.loading = true
      this.documentsService
        .getFew(documentIDs, { fields: 'id,title' })
        .pipe(takeUntil(this.unsubscribeNotifier))
        .subscribe((documentResults) => {
          this.loading = false
          this.selectedDocuments = documentIDs.map(
            (id) => documentResults.results.find((d) => d.id === id) ?? {}
          )
          super.writeValue(documentIDs)
        })
    }
  }

  searchDocuments(event: { query: string }) {
    const title = event.query
    if (!title || title.length < 2) {
      this.suggestions = []
      return
    }
    this.loading = true
    this.documentsService
      .listFiltered(
        1,
        null,
        'created',
        true,
        [{ rule_type: FILTER_TITLE, value: title }],
        { truncate_content: true }
      )
      .pipe(
        map((results) =>
          results.results.filter(
            (d) =>
              d.id !== this.parentDocumentID &&
              !this.selectedDocuments.find((sd) => sd.id === d.id)
          )
        ),
        catchError(() => of([])),
        takeUntil(this.unsubscribeNotifier)
      )
      .subscribe((docs) => {
        this.loading = false
        this.suggestions = docs
      })
  }

  onSelectDocument(event: { value: Document }) {
    const doc = event.value
    if (doc && !this.selectedDocuments.find((d) => d.id === doc.id)) {
      this.selectedDocuments = [...this.selectedDocuments, doc]
      this.onChange(this.selectedDocumentIDs)
    }
  }

  unselect(document: Document): void {
    this.selectedDocuments = this.selectedDocuments.filter(
      (d) => d && d.id !== document.id
    )
    this.onChange(this.selectedDocuments.map((d) => d.id))
  }

  compareDocuments(document: Document, selectedDocument: Document) {
    return document.id === selectedDocument.id
  }

  trackByFn(item: Document) {
    return item.id
  }

  ngOnDestroy(): void {
    this.unsubscribeNotifier.next(true)
    this.unsubscribeNotifier.complete()
  }
}
