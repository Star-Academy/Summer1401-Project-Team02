import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {PipelineModule} from './pages/pipeline/pipeline.module';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SourceModalModule} from './components/modals/source-modal/source-modal.module';
import {DestinationModalModule} from './components/modals/destination-modal/destination-modal.module';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PipelineModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SourceModalModule,
        DestinationModalModule,
    ],
    providers: [{provide: NZ_I18N, useValue: en_US}],
    bootstrap: [AppComponent],
})
export class AppModule {}
