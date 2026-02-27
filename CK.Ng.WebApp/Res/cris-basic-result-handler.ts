import { inject, Injectable } from '@angular/core';
import { CrisBasicCommandResult, CrisError, HttpCrisEndpoint, ICommand, NotificationService } from '@local/ck-gen';

@Injectable( {
  providedIn: 'root'
} )
export class CrisBasicResultHandler {
  readonly #cris = inject( HttpCrisEndpoint );
  readonly #notif = inject( NotificationService );

  async sendAndHandleBasicResult( command: ICommand<CrisBasicCommandResult | undefined> ): Promise<void> {
    try {
      const res = await this.#cris.sendOrThrowAsync( command );
      if ( res ) {
        if ( res.userMessages.length > 0 ) {
          res.userMessages.forEach( um => this.#notif.notifyUserMessage( um ) );
        }
      } else {
        return Promise.reject();
      }
    } catch ( e ) {
      if ( e instanceof CrisError && e.errorType === 'CommunicationError' ) {
        this.#notif.notifyGenericCommunicationError();
      }
    }
  }
}
