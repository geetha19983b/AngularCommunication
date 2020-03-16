import { NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';
import { DynamicComponent } from './dynamic.component';
//import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CountDownTimerComponent } from './countdowntimer.component';


@NgModule({
    imports: [ BrowserAnimationsModule ],
    declarations:[AlertComponent,DynamicComponent,CountDownTimerComponent],
    exports:[AlertComponent,DynamicComponent,CountDownTimerComponent]
})
export class DynamicModule
{

}