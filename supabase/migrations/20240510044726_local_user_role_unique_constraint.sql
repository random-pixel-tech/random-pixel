CREATE UNIQUE INDEX unique_user_role ON rbac.user_roles USING btree (user_id, role);
alter table "rbac"."user_roles" add constraint "unique_user_role" UNIQUE using index "unique_user_role";
