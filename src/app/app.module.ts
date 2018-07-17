import { ArticleComponent } from './article.component';
import { AddRandomPipe } from './add-random.pipe';
import { NgModule } from '@angular/core';
import { WorkerAppModule } from '@angular/platform-webworker';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRandomPipe,
    ArticleComponent
  ],
  imports: [
    WorkerAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
