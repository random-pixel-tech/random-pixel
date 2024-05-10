-- Create the auth hook function
create
or replace function rbac.custom_access_token_hook(event jsonb) returns jsonb language plpgsql stable as $ $ declare claims jsonb;

current_user_role public.user_role;

begin -- Check if the user is marked as admin in the profiles table
SELECT
  r.role AS role_name
FROM
  rbac.user_roles ur
  JOIN rbac.roles r ON ur.role = r.id
WHERE
  ur.user_id = (event ->> 'user_id') :: uuid;

claims := event -> 'claims';

if current_user_role is not null then -- Set the claim
claims := jsonb_set(
  claims,
  '{user_role}',
  to_jsonb(current_user_role)
);

else claims := jsonb_set(claims, '{user_role}', 'null');

end if;

-- Update the 'claims' object in the original event
event := jsonb_set(event, '{claims}', claims);

-- Return the modified or original event
return event;

end;

$ $;

grant usage on schema rbac to supabase_auth_admin;

grant execute on function rbac.custom_access_token_hook to supabase_auth_admin;

revoke execute on function rbac.custom_access_token_hook
from
  authenticated,
  anon;

grant all on table rbac.user_roles to supabase_auth_admin;

revoke all on table rbac.user_roles
from
  authenticated,
  anon;