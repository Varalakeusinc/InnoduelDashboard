
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

SET default_with_oids = false;

CREATE TABLE arena (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    description text,
    info_text text NOT NULL,
    logo_image_url character varying(200),
    image_url character varying(255),
    start_date date,
    end_date date,
    arena_order integer,
    private boolean,
    allow_anon boolean DEFAULT true NOT NULL,
    active boolean DEFAULT true,
    pre_moderation boolean DEFAULT false NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    duration integer,
    login_option character varying,
    company_id bigint,
    is_preview boolean DEFAULT false,
    redirect_url character varying(255),
    is_deleted boolean DEFAULT false,
    is_deleted_by_user_id bigint,
    is_deleted_time timestamp without time zone,
    language character varying(3),
    is_template boolean DEFAULT false,
    voting_disabled boolean DEFAULT false,
    mode character varying(24) DEFAULT 'automatic'::character varying NOT NULL,
    short_url text
);

CREATE TABLE arena_end_screen (
    arena_id bigint NOT NULL,
    end_screen_id bigint NOT NULL,
    screen_order integer DEFAULT 0
);

CREATE SEQUENCE arena_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE arena_id_seq OWNED BY arena.id;

CREATE TABLE company (
    id integer NOT NULL,
    name character varying,
    billing_address character varying,
    city character varying,
    zip character varying,
    country character varying,
    logo_image_url character varying,
    plan_id bigint,
    valid_until timestamp without time zone,
    stripe_customer_id character varying(64),
    is_trial boolean
);

CREATE TABLE company_enterprise_link (
    id bigint NOT NULL,
    company_id integer NOT NULL,
    enterprise_id bigint NOT NULL
);

CREATE SEQUENCE company_enterprise_link_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE company_enterprise_link_id_seq OWNED BY company_enterprise_link.id;

CREATE SEQUENCE company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE company_id_seq OWNED BY company.id;

CREATE TABLE end_screen (
    id integer NOT NULL,
    description character varying,
    action_text character varying,
    screen_type character varying
);

CREATE SEQUENCE end_screen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE end_screen_id_seq OWNED BY end_screen.id;

CREATE TABLE enterprise (
    id bigint NOT NULL,
    plan_id integer NOT NULL,
    name text NOT NULL
);

CREATE SEQUENCE enterprise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE enterprise_id_seq OWNED BY enterprise.id;

CREATE TABLE flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);

CREATE TABLE idea (
    id integer NOT NULL,
    idea_text character varying(140) NOT NULL,
    user_id integer NOT NULL,
    arena_id integer NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    active boolean DEFAULT true NOT NULL,
    win_rate integer,
    win_rate_updated timestamp without time zone,
    is_deleted boolean DEFAULT false,
    is_deleted_time timestamp without time zone,
    is_deleted_by_user_id bigint,
    is_seed boolean DEFAULT false
);

CREATE SEQUENCE idea_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE idea_id_seq OWNED BY idea.id;

CREATE TABLE inappropriate_idea (
    user_id integer NOT NULL,
    idea_id integer NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE password_recovery_token (
    user_id integer NOT NULL,
    token character varying(500) NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    used boolean DEFAULT false
);

CREATE TABLE plan (
    id integer NOT NULL,
    name character varying NOT NULL,
    amount numeric,
    description character varying,
    stripe_id character varying(30),
    currency character varying(3),
    metadata jsonb,
    is_legacy boolean DEFAULT true
);

CREATE SEQUENCE plan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE plan_id_seq OWNED BY plan.id;

CREATE TABLE public_report (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    arena_id bigint NOT NULL,
    type text NOT NULL
);

CREATE TABLE session (
    id bigint NOT NULL,
    name text NOT NULL,
    is_template boolean NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    active boolean NOT NULL,
    company_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE session_arena (
    id bigint NOT NULL,
    session_id bigint NOT NULL,
    arena_id integer NOT NULL,
    order_number integer NOT NULL
);

CREATE SEQUENCE session_arena_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE session_arena_id_seq OWNED BY session_arena.id;

CREATE SEQUENCE session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE session_id_seq OWNED BY session.id;

CREATE TABLE session_slide (
    id bigint NOT NULL,
    session_id bigint NOT NULL,
    session_slide_type_id text NOT NULL,
    order_number integer NOT NULL,
    title text NOT NULL,
    html_contents text,
    results_count integer,
    session_arena_id bigint
);

CREATE SEQUENCE session_slide_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE session_slide_id_seq OWNED BY session_slide.id;

CREATE TABLE session_slide_type (
    id text NOT NULL,
    description text NOT NULL
);

CREATE TABLE user_enterprise_link (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    enterprise_id bigint NOT NULL
);

CREATE SEQUENCE user_enterprise_link_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE user_enterprise_link_id_seq OWNED BY user_enterprise_link.id;

CREATE TABLE user_info (
    id integer NOT NULL,
    name text,
    email character varying(100),
    password character varying(256),
    anon boolean NOT NULL,
    created timestamp without time zone DEFAULT now(),
    last_login timestamp without time zone,
    company_id bigint,
    marketing_consent boolean DEFAULT false
);

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE user_id_seq OWNED BY user_info.id;

CREATE TABLE user_role (
    id integer NOT NULL,
    role_description character varying(128) NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    name character varying(18)
);

CREATE TABLE user_role_link (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);

CREATE TABLE user_secrets (
    user_id bigint NOT NULL,
    secret character varying(64) NOT NULL
);

CREATE TABLE user_token (
    user_id integer NOT NULL,
    token character varying(500) NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL
);

CREATE TABLE vote (
    id integer NOT NULL,
    user_id integer NOT NULL,
    idea_id integer NOT NULL,
    win boolean NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL
);

CREATE SEQUENCE vote_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE vote_id_seq OWNED BY vote.id;

ALTER TABLE ONLY arena ALTER COLUMN id SET DEFAULT nextval('arena_id_seq'::regclass);

ALTER TABLE ONLY company ALTER COLUMN id SET DEFAULT nextval('company_id_seq'::regclass);

ALTER TABLE ONLY company_enterprise_link ALTER COLUMN id SET DEFAULT nextval('company_enterprise_link_id_seq'::regclass);

ALTER TABLE ONLY end_screen ALTER COLUMN id SET DEFAULT nextval('end_screen_id_seq'::regclass);

ALTER TABLE ONLY enterprise ALTER COLUMN id SET DEFAULT nextval('enterprise_id_seq'::regclass);

ALTER TABLE ONLY idea ALTER COLUMN id SET DEFAULT nextval('idea_id_seq'::regclass);

ALTER TABLE ONLY plan ALTER COLUMN id SET DEFAULT nextval('plan_id_seq'::regclass);

ALTER TABLE ONLY session ALTER COLUMN id SET DEFAULT nextval('session_id_seq'::regclass);

ALTER TABLE ONLY session_arena ALTER COLUMN id SET DEFAULT nextval('session_arena_id_seq'::regclass);

ALTER TABLE ONLY session_slide ALTER COLUMN id SET DEFAULT nextval('session_slide_id_seq'::regclass);

ALTER TABLE ONLY user_enterprise_link ALTER COLUMN id SET DEFAULT nextval('user_enterprise_link_id_seq'::regclass);

ALTER TABLE ONLY user_info ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);

ALTER TABLE ONLY vote ALTER COLUMN id SET DEFAULT nextval('vote_id_seq'::regclass);

ALTER TABLE ONLY arena_end_screen
    ADD CONSTRAINT arena_end_screen_pkey PRIMARY KEY (arena_id, end_screen_id);

ALTER TABLE ONLY arena
    ADD CONSTRAINT arena_pkey PRIMARY KEY (id);

ALTER TABLE ONLY arena
    ADD CONSTRAINT arena_short_url_key UNIQUE (short_url);

ALTER TABLE ONLY company_enterprise_link
    ADD CONSTRAINT company_enterprise_link_pkey PRIMARY KEY (id);

ALTER TABLE ONLY company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);

ALTER TABLE ONLY end_screen
    ADD CONSTRAINT end_screen_pkey PRIMARY KEY (id);

ALTER TABLE ONLY enterprise
    ADD CONSTRAINT enterprise_pkey PRIMARY KEY (id);

ALTER TABLE ONLY flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);

ALTER TABLE ONLY idea
    ADD CONSTRAINT idea_pkey PRIMARY KEY (id);

ALTER TABLE ONLY inappropriate_idea
    ADD CONSTRAINT inappropriate_idea_pkey PRIMARY KEY (user_id, idea_id);

ALTER TABLE ONLY password_recovery_token
    ADD CONSTRAINT password_recovery_token_pkey PRIMARY KEY (user_id, token);

ALTER TABLE ONLY plan
    ADD CONSTRAINT plan_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public_report
    ADD CONSTRAINT public_report_pkey PRIMARY KEY (id);

ALTER TABLE ONLY session_arena
    ADD CONSTRAINT session_arena_arena_id_key UNIQUE (arena_id);

ALTER TABLE ONLY session_arena
    ADD CONSTRAINT session_arena_pkey PRIMARY KEY (id);

ALTER TABLE ONLY session_arena
    ADD CONSTRAINT session_arena_session_id_order_number_key UNIQUE (session_id, order_number);

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);

ALTER TABLE ONLY session_slide
    ADD CONSTRAINT session_slide_pkey PRIMARY KEY (id);

ALTER TABLE ONLY session_slide
    ADD CONSTRAINT session_slide_session_id_order_number_key UNIQUE (session_id, order_number) DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE ONLY session_slide_type
    ADD CONSTRAINT session_slide_type_pkey PRIMARY KEY (id);

ALTER TABLE ONLY company
    ADD CONSTRAINT stripe_customer_id_unique UNIQUE (stripe_customer_id);

ALTER TABLE ONLY plan
    ADD CONSTRAINT stripe_id_unique UNIQUE (stripe_id);

ALTER TABLE ONLY user_enterprise_link
    ADD CONSTRAINT user_enterprise_link_pkey PRIMARY KEY (id);

ALTER TABLE ONLY user_info
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY user_role_link
    ADD CONSTRAINT user_role_link_pkey PRIMARY KEY (user_id, role_id);

ALTER TABLE ONLY user_role
    ADD CONSTRAINT user_role_name_key UNIQUE (name);

ALTER TABLE ONLY user_role
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);

ALTER TABLE ONLY user_secrets
    ADD CONSTRAINT user_secrets_pkey PRIMARY KEY (user_id);

ALTER TABLE ONLY user_token
    ADD CONSTRAINT user_token_pkey PRIMARY KEY (user_id, token);

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_pkey PRIMARY KEY (id);

CREATE INDEX arena_indx_1 ON arena USING btree (active, id);

CREATE INDEX flyway_schema_history_s_idx ON flyway_schema_history USING btree (success);

CREATE INDEX idea_indx_3 ON idea USING btree (user_id, id);

CREATE INDEX idea_user ON vote USING btree (user_id, idea_id);

CREATE INDEX idea_votelist_indx ON idea USING btree (active, user_id, win_rate, arena_id, id);

CREATE INDEX session_arena_arena_id_idx ON session_arena USING btree (arena_id);

CREATE INDEX session_arena_session_id_idx ON session_arena USING btree (session_id);

CREATE INDEX session_company_id_idx ON session USING btree (company_id);

CREATE INDEX session_slide_session_id_idx ON session_slide USING btree (session_id);

CREATE INDEX session_slide_session_slide_type_id_idx ON session_slide USING btree (session_slide_type_id);

CREATE INDEX vote_id_index ON vote USING btree (idea_id);

CREATE INDEX vote_list_query_indx ON idea USING btree (win_rate DESC, user_id DESC, arena_id, id);

CREATE INDEX vote_user_id_indx ON vote USING btree (user_id, id);

CREATE INDEX vote_userid_indx ON vote USING btree (user_id, id);

ALTER TABLE ONLY arena
    ADD CONSTRAINT arena_companyfk FOREIGN KEY (company_id) REFERENCES company(id);

ALTER TABLE ONLY arena_end_screen
    ADD CONSTRAINT arena_end_screen_arena_id_fkey FOREIGN KEY (arena_id) REFERENCES arena(id);

ALTER TABLE ONLY arena_end_screen
    ADD CONSTRAINT arena_end_screen_end_screen_id_fkey FOREIGN KEY (end_screen_id) REFERENCES end_screen(id);

ALTER TABLE ONLY company_enterprise_link
    ADD CONSTRAINT company_enterprise_link_company_id_fkey FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE;

ALTER TABLE ONLY company_enterprise_link
    ADD CONSTRAINT company_enterprise_link_enterprise_id_fkey FOREIGN KEY (enterprise_id) REFERENCES enterprise(id) ON DELETE CASCADE;

ALTER TABLE ONLY company
    ADD CONSTRAINT company_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES plan(id);

ALTER TABLE ONLY enterprise
    ADD CONSTRAINT enterprise_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES plan(id);

ALTER TABLE ONLY idea
    ADD CONSTRAINT idea_arena_id_fkey FOREIGN KEY (arena_id) REFERENCES arena(id);

ALTER TABLE ONLY idea
    ADD CONSTRAINT idea_deleted_userfk FOREIGN KEY (is_deleted_by_user_id) REFERENCES user_info(id);

ALTER TABLE ONLY idea
    ADD CONSTRAINT idea_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_info(id);

ALTER TABLE ONLY inappropriate_idea
    ADD CONSTRAINT inappropriate_idea_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES idea(id);

ALTER TABLE ONLY inappropriate_idea
    ADD CONSTRAINT inappropriate_idea_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_info(id);

ALTER TABLE ONLY arena
    ADD CONSTRAINT is_deleted_by_userfk FOREIGN KEY (is_deleted_by_user_id) REFERENCES user_info(id);

ALTER TABLE ONLY password_recovery_token
    ADD CONSTRAINT password_recovery_token_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_info(id);

ALTER TABLE ONLY public_report
    ADD CONSTRAINT public_report_fkey FOREIGN KEY (arena_id) REFERENCES arena(id);

ALTER TABLE ONLY session_arena
    ADD CONSTRAINT session_arena_arena_id_fkey FOREIGN KEY (arena_id) REFERENCES arena(id) ON DELETE CASCADE;

ALTER TABLE ONLY session_arena
    ADD CONSTRAINT session_arena_session_id_fkey FOREIGN KEY (session_id) REFERENCES session(id) ON DELETE CASCADE;

ALTER TABLE ONLY session
    ADD CONSTRAINT session_company_id_fkey FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE;

ALTER TABLE ONLY session_slide
    ADD CONSTRAINT session_slide_session_arena_id_fkey FOREIGN KEY (session_arena_id) REFERENCES session_arena(id) ON DELETE SET NULL;

ALTER TABLE ONLY session_slide
    ADD CONSTRAINT session_slide_session_id_fkey FOREIGN KEY (session_id) REFERENCES session(id) ON DELETE CASCADE;

ALTER TABLE ONLY session_slide
    ADD CONSTRAINT session_slide_session_slide_type_id_fkey FOREIGN KEY (session_slide_type_id) REFERENCES session_slide_type(id);

ALTER TABLE ONLY user_enterprise_link
    ADD CONSTRAINT user_enterprise_link_enterprise_id_fkey FOREIGN KEY (enterprise_id) REFERENCES enterprise(id) ON DELETE CASCADE;

ALTER TABLE ONLY user_enterprise_link
    ADD CONSTRAINT user_enterprise_link_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_info(id) ON DELETE CASCADE;

ALTER TABLE ONLY user_info
    ADD CONSTRAINT user_info_companyfk FOREIGN KEY (company_id) REFERENCES company(id);

ALTER TABLE ONLY user_role_link
    ADD CONSTRAINT user_role_link_role_id_fkey FOREIGN KEY (role_id) REFERENCES user_role(id);

ALTER TABLE ONLY user_role_link
    ADD CONSTRAINT user_role_link_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_info(id);

ALTER TABLE ONLY user_secrets
    ADD CONSTRAINT user_secrets_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_info(id) ON DELETE CASCADE;

ALTER TABLE ONLY user_token
    ADD CONSTRAINT user_token_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_info(id);

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES idea(id);

ALTER TABLE ONLY vote
    ADD CONSTRAINT vote_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_info(id);

