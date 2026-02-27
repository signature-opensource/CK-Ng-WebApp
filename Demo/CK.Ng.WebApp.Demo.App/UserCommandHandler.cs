using CK.Core;
using CK.Cris;
using CK.DB.Actor;
using CK.IO.Actor;
using CK.SqlServer;
using System.Linq;
using System.Threading.Tasks;

namespace CK.Ng.WebApp.Demo.App;

[RealObject]
public class UserCommandHandler : IAutoService
{
    [CommandHandler]
    public async Task<IUpdateUserCommandResult> UpdateUserAsync( ISqlCallContext ctx,
                                                                 IUpdateUserCommand cmd,
                                                                 UserTable table,
                                                                 ICrisCommandContext commandCtx,
                                                                 PocoDirectory pocoDir )
    {
        var result = cmd.CreateResult<IUpdateUserCommandResult>();
        foreach( var batched in cmd.Commands )
        {
            var executedCommand = await commandCtx.ExecuteAsync( batched.Command );

            if( executedCommand.Result is ICrisResultError err )
            {
                throw new CKException( err.Errors.FirstOrDefault().Text ?? "Error while handling Cris command, missing message." );
            }

            var cmdResult = pocoDir.Create<IPocoCommandExecutedCommandResult>();
            cmdResult.Initialize( executedCommand );
            result.Results.Add( cmdResult );
        }

        return result;
    }
}
