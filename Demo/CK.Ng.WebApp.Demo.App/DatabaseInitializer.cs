using CK.Core;
using CK.DB.Actor;
using CK.DB.Auth;
using CK.DB.User.UserPassword;
using CK.SqlServer;
using System.Threading.Tasks;

namespace CK.Ng.WebApp.Demo.App;

public class DatabaseInitializer : IRealObject
{
    async Task OnHostStartAsync( ISqlCallContext ctx, UserTable user, UserPasswordTable password )
    {
        var existingUser = await user.FindByNameAsync( ctx, "test" );
        if( existingUser == 0 )
        {
            int userId = await user.CreateUserAsync( ctx, 1, "test" );
            if( userId != -1 )
            {
                await password.CreateOrUpdatePasswordUserAsync( ctx, 1, userId, "test", UCLMode.CreateOnly );
            }
        }
    }
}
