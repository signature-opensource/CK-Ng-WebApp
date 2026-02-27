create <html> transformer
begin
    insert before * """
                    <ck-backoffice-layout
                        [navigationItems]="navSections()"
                        (logoClicked)="goToHome()">

                    """;

    insert """
           </ck-backoffice-layout>
           <!-- <PostLayout /> -->
           """ after *;
end

create <ts> transformer
begin
    ensure import { effect, inject, signal, WritableSignal } from '@angular/core';
    ensure import { Router } from '@angular/router';
    ensure import { TranslateModule, TranslateService } from '@ngx-translate/core';
    ensure import { first } from 'rxjs';
    ensure import { AuthLevel, Layout, NavigationSection, NgAuthService, UserService } from '@local/ck-gen';

    in after "@Component"
        in first {^braces}
            in after "imports:"
                in first {^[]}
                    replace "RouterOutlet" with "RouterOutlet, Layout, TranslateModule";

    inject """
           readonly #router = inject( Router );
           readonly #authService = inject( NgAuthService );
           readonly #userService = inject( UserService );
           readonly #translateService = inject( TranslateService );
           """ into <PreDependencyInjection>;

    inject """
           navSections: WritableSignal<Array<NavigationSection>> = signal( [] );

           """ into <PreLocalVariables>;

    inject """
             constructor() {
               effect( async () => {
                 if ( this.#authService.authenticationInfo().level >= AuthLevel.Normal ) {
                   this.generateSideBarItems();
                 }
               } );
             }

             goToHome(): void {
               this.#router.navigate( [''] );
             }

             generateSideBarItems(): void {
               this.#translateService.get( [
                 'CK.WebApp.SideBar.HeadLine.General',
                 // <SideBarTranslationsKey />
               ] ).pipe( first() ).subscribe( t => {
                   let navSections = [];
                   navSections = [
                     // <SidebarItemsRegistration>
                     // <DefaultNavSectionRegistration>
                     {
                       sectionHeadline: t['CK.WebApp.SideBar.HeadLine.General'],
                       bottom: false,
                       items: [
                         // <OrderedNavItems>
                         // </OrderedNavItems>
                         // <DefaultNavSectionItems>
                         // </DefaultNavSectionItems>
                       ]
                     }
                     // </DefaultNavSectionRegistration>
                     // </SidebarItemsRegistration>
                   ];
                   // <PostSidebarItemsRegistration />

                   this.navSections.set( navSections );
               } );
             }
           """ into <PostLocalVariables>;
end
