import { Observable, timer, NEVER, BehaviorSubject, fromEvent, of } from 'rxjs';
import { map, tap, takeWhile, share, startWith, switchMap, filter } from 'rxjs/operators';
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'my-countdown',
    templateUrl: './countdowntimer.component.html'
})
export class CountDownTimerComponent implements OnInit,AfterViewInit {
    @ViewChild('minutes') minElementRef: ElementRef;
    @ViewChild('seconds') secElementRef: ElementRef;

    toggle$ = new BehaviorSubject(true);


    K = 1000;
    INTERVAL = this.K;
    MINUTES = 0.1;
    TIME = this.MINUTES * this.K * 60;

    current; currentSeconds; toMs; toRemainingSeconds;
    time = this.TIME;
    toMinutesDisplay;
    toSecondsDisplay;
    toSecondsDisplayString;
    remainingSeconds$; ms$; minutes$; seconds$; complete$;
    min;sec;
    ngAfterViewInit(): void {
        
    }
    ngOnInit(): void {
       // throw new Error("Method not implemented.");
    }
    constructor()
    {
        this.sessionCountDown();
    }
    cancelsessionTimeout()
    {
         this.toggle$.next(false);
    }
    sessionCountDown() {
        this.toMinutesDisplay = (ms: number) => Math.floor(ms / this.K / 60);
        this.toSecondsDisplay = (ms: number) => Math.floor(ms / this.K) % 60;

        this.toSecondsDisplayString = (ms: number) => {
            var seconds = this.toSecondsDisplay(ms);
            return seconds < 10 ? `0${seconds}` : seconds.toString();
        };

        this.currentSeconds = () => this.time / this.INTERVAL;
        this.toMs = (t: number) => t * this.INTERVAL
        this.toRemainingSeconds = (t: number) => this.currentSeconds() - t;

        this.remainingSeconds$ = this.toggle$.pipe(
            switchMap((running: boolean) => (running ? timer(0, this.INTERVAL) : NEVER)),
            map(this.toRemainingSeconds),
            takeWhile(t => t >= 0),
        );

        this.ms$ = this.remainingSeconds$.pipe(
            map(this.toMs),
            tap(t => this.current = t)
        );

        this.minutes$ = this.ms$.pipe(
            map(this.toMinutesDisplay),
            map(s => s.toString()),
            startWith(this.toMinutesDisplay(this.time).toString())
        ).subscribe(val => {
            //this.minElementRef.nativeElement.innerHTML = val;
            console.log('min ' + val)
            this.min = val;

        });

        this.seconds$ = this.ms$.pipe(
            map(this.toSecondsDisplayString),
            startWith(this.toSecondsDisplayString(this.time).toString())
        ).subscribe(val => {
            //this.secElementRef.nativeElement.innerHTML = val;
            console.log('sec ' + val)
            this.sec=val;
        });

        this.complete$ = this.remainingSeconds$.subscribe({
            complete: () => console.log('break')
        });

    }


}