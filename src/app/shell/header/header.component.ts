import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { from, fromEvent, mergeMap, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ResizeAppService } from 'src/app/core/services/resize-app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('anchor')
  links: QueryList<ElementRef<HTMLAnchorElement>> | undefined;

  readonly subscription = new Subscription();
  readonly menu = [
    { name: 'Home', url: '/' },
    { name: 'Characters', url: '/characters' },
    { name: 'Comics', url: '/comics' },
    { name: 'Series', url: '/series' },
  ];
  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private resizeAppService: ResizeAppService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.listenerEvents();
  }

  listenerEvents(): void {
    const btnMobile = this.document.getElementById('btn-mobile');
    const events = ['click', 'touchstart'] as const;

    this.subscription.add(
      from(events)
        .pipe(mergeMap(evt => fromEvent(btnMobile!, evt)))
        .subscribe(evt => this.toggleMenu(evt))
    );
    this.links &&
      this.subscription.add(
        from(this.links.toArray())
          .pipe(
            mergeMap(element =>
              fromEvent(element.nativeElement, 'click').pipe(
                filter(() => this.resizeAppService.isMobile)
              )
            )
          )
          .subscribe(() => {
            this.toggleMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          })
      );
    this.subscription.add(this.onResize());
  }

  onResize(): void {
    this.resizeAppService.resize$
      .pipe(
        filter(() => {
          const nav = this.document.getElementById('marvel-nav');
          return (
            !this.resizeAppService.isMobile &&
            !!nav?.classList.contains('active')
          );
        })
      )
      .subscribe(() => this.toggleMenu());
  }

  toggleMenu(event?: Event): void {
    if (event?.type === 'touchstart') event.preventDefault();

    const nav = this.document.getElementById('marvel-nav');
    if (nav) {
      nav.classList.toggle('active');
      if (nav.classList.contains('active')) {
        this.document.body.style.overflow = 'hidden';
      } else {
        this.document.body.style.overflow = 'auto';
      }
    }
  }
}
