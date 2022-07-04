import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResizeAppService implements OnDestroy {
  readonly resize: BehaviorSubject<number> = new BehaviorSubject<number>(
    window.innerWidth
  );
  readonly destroy$ = new Subject<boolean>();
  readonly MOBILE_WIDTH_SIZE = 768;

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  get resize$(): Observable<number> {
    return fromEvent(window, 'resize').pipe(
      debounceTime(150),
      takeUntil(this.destroy$),
      map(evt => {
        const target = evt.target as Window;
        return target.innerWidth;
      })
    );
  }

  get isMobile(): boolean {
    const match = window.matchMedia;
    const mq = match && match('(pointer:coarse)');

    return window.innerWidth <= this.MOBILE_WIDTH_SIZE || mq?.matches;
  }
}
