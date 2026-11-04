-- Apply to a new test project first. Reconcile against any live lead schema separately.
begin;

create table public.leads (
  request_id uuid primary key,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 7 and 32),
  source text not null check (char_length(source) between 1 and 80),
  message text not null check (char_length(message) <= 2000),
  submitted_at timestamptz not null default now()
);

create table public.lead_rate_attempts (
  ip_hash text not null check (ip_hash ~ '^[a-f0-9]{64}$'),
  attempted_at timestamptz not null default now()
);
create index lead_attempts_by_ip on public.lead_rate_attempts (ip_hash, attempted_at);
create index lead_attempts_by_time on public.lead_rate_attempts (attempted_at);
alter table public.leads enable row level security;
alter table public.lead_rate_attempts enable row level security;
revoke all on public.leads, public.lead_rate_attempts from anon, authenticated;
grant select, insert on public.leads to service_role;
grant select, insert, delete on public.lead_rate_attempts to service_role;

create function public.claim_lead_attempt(p_hash text) returns boolean
language plpgsql set search_path = '' as $$
declare
  cutoff timestamptz;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_hash, 0));
  cutoff := pg_catalog.clock_timestamp() - interval '1 hour';
  if (select count(*) from public.lead_rate_attempts where ip_hash = p_hash and attempted_at > cutoff) >= 5 then
    return false;
  end if;
  insert into public.lead_rate_attempts (ip_hash, attempted_at)
    values (p_hash, pg_catalog.clock_timestamp());
  return true;
end;
$$;

create function public.save_website_lead(p_id uuid, p_name text, p_email text, p_phone text, p_source text, p_message text)
returns boolean language plpgsql set search_path = '' as $$
begin
  insert into public.leads (request_id, name, email, phone, source, message)
    values (p_id, p_name, p_email, p_phone, p_source, p_message)
    on conflict (request_id) do nothing;
  return exists (
    select from public.leads where request_id = p_id and name = p_name
      and email = p_email and phone = p_phone and source = p_source and message = p_message
  );
end;
$$;
revoke execute on function public.claim_lead_attempt(text) from public, anon, authenticated;
revoke execute on function public.save_website_lead(uuid,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.claim_lead_attempt(text) to service_role;
grant execute on function public.save_website_lead(uuid,text,text,text,text,text) to service_role;
commit;

-- Configure a scheduled cleanup before enabling leads:
-- delete from public.lead_rate_attempts where attempted_at <= now() - interval '1 hour';
