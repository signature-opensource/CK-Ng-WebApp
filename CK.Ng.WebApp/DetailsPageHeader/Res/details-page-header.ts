import { Component, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faRotate } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'ck-details-page-header',
  imports: [
    FontAwesomeModule,
    TranslateModule,
    NzButtonModule
  ],
  templateUrl: './details-page-header.html'
})
export class DetailsPageHeader {
  // <PreDependencyInjection revert />
  // <PostDependencyInjection />

  // <PreInputOutput revert />
  returnClicked = output<void>();
  refreshClicked = output<void>();
  // <PostInputOutput />

  // <PreIconsDefinition revert />
  protected returnIcon = faArrowLeft;
  protected refreshIcon = faRotate;
  // <PostIconsDefinition />

  // <PreLocalVariables revert />
  // <PostLocalVariables />

  constructor() {
  }

  // <PublicMethods />

  // <ProtectedMethods />

  // <PrivateMethods />
}
