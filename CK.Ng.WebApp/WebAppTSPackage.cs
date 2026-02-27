using CK.Core;
using CK.Ng.Cris.AspNet.Auth;
using CK.Ng.UserProfile.NamedUser;
using CK.Ng.UserProfile.PreferredCulture;
using CK.Ng.UserProfile.UserPassword;
using CK.TypeScript;
using CK.Ng.Zorro.BackOffice;
using CK.Ng.Zorro;

namespace CK.Ng.WebApp;

[TypeScriptPackage]
[Requires<ZorroBackOfficePackage, CrisAspNetAuthPackage>]
[Requires<UserProfileNamedUserPackage, UserProfilePasswordPackage, UserProfilePreferredCulturePackage>]
[Requires<TableComponent>] // page-config-service.ts needs it, it caches the table columns configuration.
[TypeScriptFile( "cris-basic-result-handler.ts", "CrisBasicResultHandler" )]
[TypeScriptFile( "page-config-service.ts", "PageConfigService" )]
public class WebAppTSPackage : TypeScriptPackage
{
}
