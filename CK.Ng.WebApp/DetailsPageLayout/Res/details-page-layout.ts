import { Component, output } from '@angular/core';
import { DetailsPageHeader } from '@local/ck-gen';

@Component({
  selector: 'ck-details-page-layout',
  imports: [DetailsPageHeader],
  templateUrl: './details-page-layout.html',
})
export class DetailsPageLayout {
  returnClicked = output<void>();
  refreshClicked = output<void>();
}
