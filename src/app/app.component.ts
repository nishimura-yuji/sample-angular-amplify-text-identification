import { Component } from '@angular/core';
import Amplify from 'aws-amplify';
import awsconfig from 'src/aws-exports';

import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import Predictions from '@aws-amplify/predictions';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readText$;

  onChangeInput(files: FileList) {
    console.log(files);
    const file = files.item(0);
    this.identify(file);
  }

  identify(file: File) {
    const data$ = from(
      Predictions.identify({
        text: { source: { file }, format: 'PLAIN' }
      })
    );

    this.readText$ = data$.pipe(map(data => data.text.fullText));
  }
}
