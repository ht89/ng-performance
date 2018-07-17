import { Observable, Subject } from 'rxjs/Rx';
import { Component, NgZone, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [`
        h1 {
            color: red;
        }
    `],
    encapsulation: ViewEncapsulation.Native
})
export class AppComponent {
    title = '';
    progress = 0;
    startTime = 0;

    shareSubject: Subject<Event> = new Subject();
    shareEmitter: Observable<Event> = this.shareSubject.asObservable();

    constructor(private zone: NgZone) {
        zone.onStable.subscribe(() => console.log('stable'));
        zone.onUnstable.subscribe(() => console.log('unstable'));
    }

    update(newTitle: string) {
        this.title = newTitle;
    }

    foo() {
        setTimeout(() => console.log('timeout handler'), 1000);
    }

    runInsideAngularZone() {
        this.start();
        this.step(() => this.finish('Inside angular zone'));
    }

    runOutsideAngularZone() {
        this.start();
        this.zone.runOutsideAngular(() => {
            this.step(() => this.finish('Outside angular zone'));
        });
    }

    start() {
        this.progress = 0;
        this.startTime = performance.now();
    }

    finish(location: string) {
        this.zone.run(() => {
            console.log('location');
            console.log('Took ' + (performance.now() - this.startTime) + 'ms');
        });
    }

    step(doneCallback: () => void) {
        if (++this.progress < 100) {
            setTimeout(() => {
                this.step(doneCallback);
            }, 10);
        } else {
            doneCallback();
        }
    }
}
