import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";

@Component({
    selector: 'app-article',
    template: `
        <h1>{{ title }}</h1>
        <p>Shares: {{ count }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
    @Input() shares: Observable<Event>;
    count = 0;
    title = 'Insurance fraud grows in wake of apple pie hubbub';

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit() { 
        this.shares.subscribe((e: Event) => {
            ++this.count;
            this.changeDetectorRef.markForCheck();
        });
    }

}