import { PGlite } from '@electric-sql/pglite';
import { pgcrypto } from '@electric-sql/pglite/contrib/pgcrypto';
import { uuid_ossp } from '@electric-sql/pglite/contrib/uuid_ossp';
import { citext } from '@electric-sql/pglite/contrib/citext';
import { pg_trgm } from '@electric-sql/pglite/contrib/pg_trgm';
import fs from 'fs'; import path from 'path';
const dir='/tmp/ref/supabase/migrations';
const db = await PGlite.create({ extensions: { pgcrypto, uuid_ossp, citext, pg_trgm } });
const pre = `do $x$ begin
  begin create role anon; exception when others then null; end;
  begin create role authenticated; exception when others then null; end;
  begin create role service_role; exception when others then null; end;
  begin create role supabase_auth_admin; exception when others then null; end;
  begin create role supabase_admin; exception when others then null; end;
  begin create role authenticator; exception when others then null; end;
  begin create role postgres; exception when others then null; end;
end $x$;
create schema if not exists auth; create schema if not exists storage; create schema if not exists extensions; create schema if not exists graphql_public; create schema if not exists realtime; create schema if not exists vault;
create extension if not exists pgcrypto;
create table auth.users(id uuid primary key default gen_random_uuid(), email text, raw_user_meta_data jsonb, raw_app_meta_data jsonb, encrypted_password text, created_at timestamptz default now(), updated_at timestamptz default now(), email_confirmed_at timestamptz, last_sign_in_at timestamptz, phone text, confirmed_at timestamptz, banned_until timestamptz, deleted_at timestamptz);
create table auth.identities(id uuid primary key default gen_random_uuid(), user_id uuid, provider text, identity_data jsonb, created_at timestamptz default now());
create or replace function auth.uid() returns uuid language sql stable as $$ select null::uuid $$;
create or replace function auth.role() returns text language sql stable as $$ select null::text $$;
create or replace function auth.jwt() returns jsonb language sql stable as $$ select '{}'::jsonb $$;
create table storage.buckets(id text primary key, name text, public boolean default false, created_at timestamptz default now(), updated_at timestamptz default now(), file_size_limit bigint, allowed_mime_types text[]);
create table storage.objects(id uuid primary key default gen_random_uuid(), bucket_id text, name text, owner uuid, created_at timestamptz default now(), updated_at timestamptz default now(), last_accessed_at timestamptz, metadata jsonb, path_tokens text[]);
create or replace function storage.foldername(name text) returns text[] language sql as $$ select string_to_array(name,'/') $$;
create schema if not exists cron; create schema if not exists net;
`;
await db.exec(pre);
const files = fs.readdirSync(dir).filter(f=>f.endsWith('.sql')).sort();
const fails=[];
for(const f of files){
  let sql = fs.readFileSync(path.join(dir,f),'utf8');
  try { await db.exec(sql); }
  catch(e){
    // try statement by statement fallback
    fails.push({f, err: String(e.message||e).slice(0,300)});
  }
}
fs.writeFileSync('/tmp/replay/fails.json', JSON.stringify(fails,null,2));
const r = await db.query(`select count(*)::int c from pg_tables where schemaname='public'`);
console.log('tables:', r.rows[0].c, 'failed files:', fails.length, 'of', files.length);
console.log(fails.slice(0,10).map(x=>x.f+' :: '+x.err).join('\n---\n'));
await db.close();
