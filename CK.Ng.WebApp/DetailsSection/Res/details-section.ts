import { Component, input } from '@angular/core';

@Component( {
  selector: 'ck-details-section',
  templateUrl: './details-section.html',
} )
export class DetailsSection {
  title = input<string>();
}
