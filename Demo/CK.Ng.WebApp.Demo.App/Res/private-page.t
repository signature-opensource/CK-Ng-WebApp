create <ts> transformer
begin
    ensure import { faHome, faFileAlt } from '@fortawesome/free-solid-svg-icons';

    inject """
           'Demo.SideBar.Home',
           'Demo.SideBar.Details',
           """ into <SideBarTranslationsKey>;

    inject """
           {
             label: t['Demo.SideBar.Home'],
             icon: faHome,
             routerLink: 'home',
             isActive: this.#router.routerState.snapshot.url.includes( `/home` )
           },
           {
             label: t['Demo.SideBar.Details'],
             icon: faFileAlt,
             routerLink: 'details',
             isActive: this.#router.routerState.snapshot.url.includes( `/details` )
           },
           """ into <OrderedNavItems>;
end
