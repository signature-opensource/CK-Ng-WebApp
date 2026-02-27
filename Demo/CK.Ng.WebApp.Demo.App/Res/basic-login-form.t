create <ts> transformer
begin
    inject """
           constructor() {
               this.loginForm.patchValue( { userName: 'test', password: 'test' } );
           }
           """ into <PostLocalVariables>;
end
