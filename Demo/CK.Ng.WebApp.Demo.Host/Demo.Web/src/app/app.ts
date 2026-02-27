import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CKGenAppModule } from '@local/ck-gen/CK/Angular/CKGenAppModule';

// <HasNgPrivatePage />

@Component( {
  selector: 'app-root',
  imports: [RouterOutlet, CKGenAppModule],
  templateUrl: './app.html',
  styleUrl: './app.less'
} )
export class App {
}
