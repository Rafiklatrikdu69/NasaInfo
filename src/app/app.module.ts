import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './components/image/image.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { ErrorDateDialogComponent } from './components/error-date-dialog/error-date-dialog.component';
import { IntercepteurService } from './modules/module-app/loader/intercepteur.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadComponent } from './components/load/load.component' ;

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    ErrorDateDialogComponent,
    LoadComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
 
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:IntercepteurService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
