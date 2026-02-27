import { Component } from '@angular/core';
import { DetailsPageLayout, DetailsSection } from '@local/ck-gen';
import { TranslateModule } from '@ngx-translate/core';

@Component( {
  selector: 'app-details-demo',
  imports: [DetailsPageLayout, DetailsSection, TranslateModule],
  templateUrl: './details-demo.html'
} )
export class DetailsDemo {

  onReturn(): void {
    history.back();
  }

  onRefresh(): void {
    window.location.reload();
  }
}
