using CK.Core;
using CK.Ng.AspNet.Auth.Basic;
using CK.Ng.WebApp.DetailsPageLayout;
using CK.Ng.WebApp.DetailsSection;
using CK.TypeScript;

namespace CK.Ng.WebApp.Demo.App;

[TypeScriptPackage]
[Requires<WebAppTSPackage>]
[Requires<AspNetAuthBasicPackage>]
[Requires<DetailsPageLayoutComponent, DetailsSectionComponent>]
public sealed class AppPackage : TypeScriptPackage
{
}
