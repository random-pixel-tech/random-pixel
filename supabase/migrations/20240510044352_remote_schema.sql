drop policy "Allow auth admin to read user roles" on "rbac"."user_role";

revoke delete on table "rbac"."user_role" from "supabase_auth_admin";

revoke insert on table "rbac"."user_role" from "supabase_auth_admin";

revoke references on table "rbac"."user_role" from "supabase_auth_admin";

revoke select on table "rbac"."user_role" from "supabase_auth_admin";

revoke trigger on table "rbac"."user_role" from "supabase_auth_admin";

revoke truncate on table "rbac"."user_role" from "supabase_auth_admin";

revoke update on table "rbac"."user_role" from "supabase_auth_admin";

alter table "rbac"."user_role" drop constraint "rbac_user_role_id_fkey";

alter table "rbac"."user_role" drop constraint "rbac_user_role_role_fkey";

alter table "rbac"."user_role" drop constraint "user_role_id_key";

alter table "rbac"."user_role" drop constraint "user_role_pkey";

drop index if exists "rbac"."user_role_id_key";

drop index if exists "rbac"."user_role_pkey";

drop table "rbac"."user_role";

create table "rbac"."user_roles" (
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "id" uuid not null default gen_random_uuid(),
    "role" bigint
);


alter table "rbac"."user_roles" enable row level security;

CREATE UNIQUE INDEX user_role_id_key ON rbac.user_roles USING btree (id);

CREATE UNIQUE INDEX user_role_pkey ON rbac.user_roles USING btree (id);

alter table "rbac"."user_roles" add constraint "user_role_pkey" PRIMARY KEY using index "user_role_pkey";

alter table "rbac"."user_roles" add constraint "rbac_user_role_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "rbac"."user_roles" validate constraint "rbac_user_role_id_fkey";

alter table "rbac"."user_roles" add constraint "rbac_user_role_role_fkey" FOREIGN KEY (role) REFERENCES rbac.roles(id) not valid;

alter table "rbac"."user_roles" validate constraint "rbac_user_role_role_fkey";

alter table "rbac"."user_roles" add constraint "user_role_id_key" UNIQUE using index "user_role_id_key";

grant delete on table "rbac"."user_roles" to "supabase_auth_admin";

grant insert on table "rbac"."user_roles" to "supabase_auth_admin";

grant references on table "rbac"."user_roles" to "supabase_auth_admin";

grant select on table "rbac"."user_roles" to "supabase_auth_admin";

grant trigger on table "rbac"."user_roles" to "supabase_auth_admin";

grant truncate on table "rbac"."user_roles" to "supabase_auth_admin";

grant update on table "rbac"."user_roles" to "supabase_auth_admin";

create policy "Allow auth admin to read user roles"
on "rbac"."user_roles"
as permissive
for select
to supabase_auth_admin
using (true);



