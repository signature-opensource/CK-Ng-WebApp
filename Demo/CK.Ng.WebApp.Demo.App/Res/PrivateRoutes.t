create <ts> transformer on "CK/Ng/AspNet/Auth/private-page/routes.ts"
begin
    insert """
        ,
        { path: 'home', loadComponent: () => import( '../../../../../../src/app/demos/home/home-demo' ).then( c => c.HomeDemo ) },
        { path: 'details', loadComponent: () => import( '../../../../../../src/app/demos/details/details-demo' ).then( c => c.DetailsDemo ) },
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        """ before single "]; // as Route[];";
end
