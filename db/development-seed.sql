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

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

SET default_tablespace = '';

CREATE TABLE public.arena (
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

ALTER TABLE public.arena OWNER TO innoduel;

CREATE TABLE public.arena_end_screen (
    arena_id bigint NOT NULL,
    end_screen_id bigint NOT NULL,
    screen_order integer DEFAULT 0
);

ALTER TABLE public.arena_end_screen OWNER TO innoduel;

CREATE SEQUENCE public.arena_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.arena_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.arena_id_seq OWNED BY public.arena.id;

CREATE TABLE public.company (
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

ALTER TABLE public.company OWNER TO innoduel;

CREATE TABLE public.company_enterprise_link (
    id bigint NOT NULL,
    company_id integer NOT NULL,
    enterprise_id bigint NOT NULL
);

ALTER TABLE public.company_enterprise_link OWNER TO innoduel;

CREATE SEQUENCE public.company_enterprise_link_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.company_enterprise_link_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.company_enterprise_link_id_seq OWNED BY public.company_enterprise_link.id;

CREATE SEQUENCE public.company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.company_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;

CREATE TABLE public.end_screen (
    id integer NOT NULL,
    description character varying,
    action_text character varying,
    screen_type character varying
);

ALTER TABLE public.end_screen OWNER TO innoduel;

CREATE SEQUENCE public.end_screen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.end_screen_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.end_screen_id_seq OWNED BY public.end_screen.id;

CREATE TABLE public.enterprise (
    id bigint NOT NULL,
    plan_id integer NOT NULL,
    name text NOT NULL
);

ALTER TABLE public.enterprise OWNER TO innoduel;

CREATE SEQUENCE public.enterprise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.enterprise_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.enterprise_id_seq OWNED BY public.enterprise.id;

CREATE TABLE public.idea (
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

ALTER TABLE public.idea OWNER TO innoduel;

CREATE SEQUENCE public.idea_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.idea_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.idea_id_seq OWNED BY public.idea.id;

CREATE TABLE public.inappropriate_idea (
    user_id integer NOT NULL,
    idea_id integer NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.inappropriate_idea OWNER TO innoduel;

CREATE TABLE public.password_recovery_token (
    user_id integer NOT NULL,
    token character varying(500) NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    used boolean DEFAULT false
);

ALTER TABLE public.password_recovery_token OWNER TO innoduel;

CREATE TABLE public.plan (
    id integer NOT NULL,
    name character varying NOT NULL,
    amount numeric,
    description character varying,
    stripe_id character varying(30),
    currency character varying(3),
    metadata jsonb,
    is_legacy boolean DEFAULT true
);

ALTER TABLE public.plan OWNER TO innoduel;

CREATE SEQUENCE public.plan_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.plan_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.plan_id_seq OWNED BY public.plan.id;

CREATE TABLE public.public_report (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    arena_id bigint NOT NULL,
    type text NOT NULL
);

ALTER TABLE public.public_report OWNER TO innoduel;

CREATE TABLE public.session (
    id bigint NOT NULL,
    name text NOT NULL,
    is_template boolean NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    active boolean NOT NULL,
    company_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.session OWNER TO innoduel;

CREATE TABLE public.session_arena (
    id bigint NOT NULL,
    session_id bigint NOT NULL,
    arena_id integer NOT NULL,
    order_number integer NOT NULL
);

ALTER TABLE public.session_arena OWNER TO innoduel;

CREATE SEQUENCE public.session_arena_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.session_arena_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.session_arena_id_seq OWNED BY public.session_arena.id;

CREATE SEQUENCE public.session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.session_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;

CREATE TABLE public.session_slide (
    id bigint NOT NULL,
    session_id bigint NOT NULL,
    session_slide_type_id text NOT NULL,
    order_number integer NOT NULL,
    title text NOT NULL,
    html_contents text,
    results_count integer,
    session_arena_id bigint
);

ALTER TABLE public.session_slide OWNER TO innoduel;

CREATE SEQUENCE public.session_slide_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.session_slide_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.session_slide_id_seq OWNED BY public.session_slide.id;

CREATE TABLE public.session_slide_type (
    id text NOT NULL,
    description text NOT NULL
);

ALTER TABLE public.session_slide_type OWNER TO innoduel;

CREATE TABLE public.user_enterprise_link (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    enterprise_id bigint NOT NULL
);

ALTER TABLE public.user_enterprise_link OWNER TO innoduel;

CREATE SEQUENCE public.user_enterprise_link_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.user_enterprise_link_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.user_enterprise_link_id_seq OWNED BY public.user_enterprise_link.id;

CREATE TABLE public.user_info (
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

ALTER TABLE public.user_info OWNER TO innoduel;

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.user_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.user_id_seq OWNED BY public.user_info.id;

CREATE TABLE public.user_role (
    id integer NOT NULL,
    role_description character varying(128) NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    name character varying(18)
);

ALTER TABLE public.user_role OWNER TO innoduel;

CREATE TABLE public.user_role_link (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);

CREATE TABLE public.schema_version (
    version_rank   INT,
    installed_rank INT,
    version        VARCHAR(50) PRIMARY KEY,
    description    VARCHAR(200),
    type           VARCHAR(20),
    script         VARCHAR(1000),
    checksum       INT,
    installed_by   VARCHAR(100),
    installed_on   TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    execution_time INT,
    success        BOOLEAN
);

CREATE INDEX schema_version_ir_idx ON public.schema_version (installed_rank);
CREATE INDEX schema_version_s_idx ON public.schema_version (success);
CREATE INDEX schema_version_vr_idx ON public.schema_version (version_rank);

ALTER TABLE public.schema_version OWNER TO innoduel;


ALTER TABLE public.user_role_link OWNER TO innoduel;

CREATE TABLE public.user_secrets (
    user_id bigint NOT NULL,
    secret character varying(64) NOT NULL
);

ALTER TABLE public.user_secrets OWNER TO innoduel;

CREATE TABLE public.user_token (
    user_id integer NOT NULL,
    token character varying(500) NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.user_token OWNER TO innoduel;

CREATE TABLE public.vote (
    id integer NOT NULL,
    user_id integer NOT NULL,
    idea_id integer NOT NULL,
    win boolean NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.vote OWNER TO innoduel;

CREATE SEQUENCE public.vote_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.vote_id_seq OWNER TO innoduel;

ALTER SEQUENCE public.vote_id_seq OWNED BY public.vote.id;

ALTER TABLE ONLY public.arena ALTER COLUMN id SET DEFAULT nextval('public.arena_id_seq'::regclass);

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);

ALTER TABLE ONLY public.company_enterprise_link ALTER COLUMN id SET DEFAULT nextval('public.company_enterprise_link_id_seq'::regclass);

ALTER TABLE ONLY public.end_screen ALTER COLUMN id SET DEFAULT nextval('public.end_screen_id_seq'::regclass);

ALTER TABLE ONLY public.enterprise ALTER COLUMN id SET DEFAULT nextval('public.enterprise_id_seq'::regclass);

ALTER TABLE ONLY public.idea ALTER COLUMN id SET DEFAULT nextval('public.idea_id_seq'::regclass);

ALTER TABLE ONLY public.plan ALTER COLUMN id SET DEFAULT nextval('public.plan_id_seq'::regclass);

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);

ALTER TABLE ONLY public.session_arena ALTER COLUMN id SET DEFAULT nextval('public.session_arena_id_seq'::regclass);

ALTER TABLE ONLY public.session_slide ALTER COLUMN id SET DEFAULT nextval('public.session_slide_id_seq'::regclass);

ALTER TABLE ONLY public.user_enterprise_link ALTER COLUMN id SET DEFAULT nextval('public.user_enterprise_link_id_seq'::regclass);

ALTER TABLE ONLY public.user_info ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);

ALTER TABLE ONLY public.vote ALTER COLUMN id SET DEFAULT nextval('public.vote_id_seq'::regclass);

ALTER TABLE ONLY public.arena_end_screen
    ADD CONSTRAINT arena_end_screen_pkey PRIMARY KEY (arena_id, end_screen_id);

ALTER TABLE ONLY public.arena
    ADD CONSTRAINT arena_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.arena
    ADD CONSTRAINT arena_short_url_key UNIQUE (short_url);

ALTER TABLE ONLY public.company_enterprise_link
    ADD CONSTRAINT company_enterprise_link_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.end_screen
    ADD CONSTRAINT end_screen_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.enterprise
    ADD CONSTRAINT enterprise_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.idea
    ADD CONSTRAINT idea_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.inappropriate_idea
    ADD CONSTRAINT inappropriate_idea_pkey PRIMARY KEY (user_id, idea_id);

ALTER TABLE ONLY public.password_recovery_token
    ADD CONSTRAINT password_recovery_token_pkey PRIMARY KEY (user_id, token);

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT plan_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.public_report
    ADD CONSTRAINT public_report_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.session_arena
    ADD CONSTRAINT session_arena_arena_id_key UNIQUE (arena_id);

ALTER TABLE ONLY public.session_arena
    ADD CONSTRAINT session_arena_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.session_arena
    ADD CONSTRAINT session_arena_session_id_order_number_key UNIQUE (session_id, order_number);

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.session_slide
    ADD CONSTRAINT session_slide_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.session_slide
    ADD CONSTRAINT session_slide_session_id_order_number_key UNIQUE (session_id, order_number) DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE ONLY public.session_slide_type
    ADD CONSTRAINT session_slide_type_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.company
    ADD CONSTRAINT stripe_customer_id_unique UNIQUE (stripe_customer_id);

ALTER TABLE ONLY public.plan
    ADD CONSTRAINT stripe_id_unique UNIQUE (stripe_id);

ALTER TABLE ONLY public.user_enterprise_link
    ADD CONSTRAINT user_enterprise_link_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_role_link
    ADD CONSTRAINT user_role_link_pkey PRIMARY KEY (user_id, role_id);

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_name_key UNIQUE (name);

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_secrets
    ADD CONSTRAINT user_secrets_pkey PRIMARY KEY (user_id);

ALTER TABLE ONLY public.user_token
    ADD CONSTRAINT user_token_pkey PRIMARY KEY (user_id, token);

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT vote_pkey PRIMARY KEY (id);

CREATE INDEX arena_indx_1 ON public.arena USING btree (active, id);

CREATE INDEX idea_indx_3 ON public.idea USING btree (user_id, id);

CREATE INDEX idea_user ON public.vote USING btree (user_id, idea_id);

CREATE INDEX idea_votelist_indx ON public.idea USING btree (active, user_id, win_rate, arena_id, id);

CREATE INDEX session_arena_arena_id_idx ON public.session_arena USING btree (arena_id);

CREATE INDEX session_arena_session_id_idx ON public.session_arena USING btree (session_id);

CREATE INDEX session_company_id_idx ON public.session USING btree (company_id);

CREATE INDEX session_slide_session_id_idx ON public.session_slide USING btree (session_id);

CREATE INDEX session_slide_session_slide_type_id_idx ON public.session_slide USING btree (session_slide_type_id);

CREATE INDEX vote_id_index ON public.vote USING btree (idea_id);

CREATE INDEX vote_list_query_indx ON public.idea USING btree (win_rate DESC, user_id DESC, arena_id, id);

CREATE INDEX vote_user_id_indx ON public.vote USING btree (user_id, id);

CREATE INDEX vote_userid_indx ON public.vote USING btree (user_id, id);

ALTER TABLE ONLY public.arena
    ADD CONSTRAINT arena_companyfk FOREIGN KEY (company_id) REFERENCES public.company(id);

ALTER TABLE ONLY public.arena_end_screen
    ADD CONSTRAINT arena_end_screen_arena_id_fkey FOREIGN KEY (arena_id) REFERENCES public.arena(id);

ALTER TABLE ONLY public.arena_end_screen
    ADD CONSTRAINT arena_end_screen_end_screen_id_fkey FOREIGN KEY (end_screen_id) REFERENCES public.end_screen(id);

ALTER TABLE ONLY public.company_enterprise_link
    ADD CONSTRAINT company_enterprise_link_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.company_enterprise_link
    ADD CONSTRAINT company_enterprise_link_enterprise_id_fkey FOREIGN KEY (enterprise_id) REFERENCES public.enterprise(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plan(id);

ALTER TABLE ONLY public.enterprise
    ADD CONSTRAINT enterprise_plan_id_fkey FOREIGN KEY (plan_id) REFERENCES public.plan(id);

ALTER TABLE ONLY public.idea
    ADD CONSTRAINT idea_arena_id_fkey FOREIGN KEY (arena_id) REFERENCES public.arena(id);

ALTER TABLE ONLY public.idea
    ADD CONSTRAINT idea_deleted_userfk FOREIGN KEY (is_deleted_by_user_id) REFERENCES public.user_info(id);

ALTER TABLE ONLY public.idea
    ADD CONSTRAINT idea_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(id);

ALTER TABLE ONLY public.inappropriate_idea
    ADD CONSTRAINT inappropriate_idea_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES public.idea(id);

ALTER TABLE ONLY public.inappropriate_idea
    ADD CONSTRAINT inappropriate_idea_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(id);

ALTER TABLE ONLY public.arena
    ADD CONSTRAINT is_deleted_by_userfk FOREIGN KEY (is_deleted_by_user_id) REFERENCES public.user_info(id);

ALTER TABLE ONLY public.password_recovery_token
    ADD CONSTRAINT password_recovery_token_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(id);

ALTER TABLE ONLY public.public_report
    ADD CONSTRAINT public_report_fkey FOREIGN KEY (arena_id) REFERENCES public.arena(id);

ALTER TABLE ONLY public.session_arena
    ADD CONSTRAINT session_arena_arena_id_fkey FOREIGN KEY (arena_id) REFERENCES public.arena(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.session_arena
    ADD CONSTRAINT session_arena_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.session(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.session_slide
    ADD CONSTRAINT session_slide_session_arena_id_fkey FOREIGN KEY (session_arena_id) REFERENCES public.session_arena(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.session_slide
    ADD CONSTRAINT session_slide_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.session(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.session_slide
    ADD CONSTRAINT session_slide_session_slide_type_id_fkey FOREIGN KEY (session_slide_type_id) REFERENCES public.session_slide_type(id);

ALTER TABLE ONLY public.user_enterprise_link
    ADD CONSTRAINT user_enterprise_link_enterprise_id_fkey FOREIGN KEY (enterprise_id) REFERENCES public.enterprise(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.user_enterprise_link
    ADD CONSTRAINT user_enterprise_link_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_companyfk FOREIGN KEY (company_id) REFERENCES public.company(id);

ALTER TABLE ONLY public.user_role_link
    ADD CONSTRAINT user_role_link_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.user_role(id);

ALTER TABLE ONLY public.user_role_link
    ADD CONSTRAINT user_role_link_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(id);

ALTER TABLE ONLY public.user_secrets
    ADD CONSTRAINT user_secrets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.user_token
    ADD CONSTRAINT user_token_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(id);

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT vote_idea_id_fkey FOREIGN KEY (idea_id) REFERENCES public.idea(id);

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT vote_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(id);



COPY public.plan (id, name, amount, description, stripe_id, currency, metadata, is_legacy) FROM stdin;
1	Basic	0	\N	basic-prod	eur	{"can-edit-duration": "false", "can-edit-end-date": "false", "can-edit-exit-link": "false", "can-edit-start-date": "false", "can-see-admins-page": "false", "can-see-all-answers": "false", "can-edit-login-option": "false", "duration-default-value": "10", "end-date-default-value": "indefinetely", "can-change-company-logo": "false", "exit-link-default-value": "http://innoduel.com", "can-have-multiple-arenas": "false", "can-add-arena-cover-image": "false", "can-see-full-arena-report": "false", "can-disable-end-screen-results": "false", "can-disable-end-screen-ask-email": "false", "end-screen-results-default-value": "true", "end-screen-ask-email-default-value": "true", "can-enable-end-screen-request-answers": "false", "end-screen-request-answers-default-value": "true"}	t
2	Advanced	3900	\N	advanced-prod	eur	{"can-edit-duration": "true", "can-edit-end-date": "true", "can-edit-exit-link": "false", "can-edit-start-date": "true", "can-see-admins-page": "true", "can-see-all-answers": "true", "can-edit-login-option": "true", "duration-default-value": "10", "end-date-default-value": "indefinetely", "can-change-company-logo": "true", "exit-link-default-value": "http://innoduel.com", "can-have-multiple-arenas": "false", "can-add-arena-cover-image": "true", "can-see-full-arena-report": "true", "can-disable-end-screen-results": "true", "can-disable-end-screen-ask-email": "true", "end-screen-results-default-value": "true", "end-screen-ask-email-default-value": "true", "can-enable-end-screen-request-answers": "true", "end-screen-request-answers-default-value": "true"}	t
3	Pro	9900	\N	pro-prod	eur	{"can-edit-duration": "true", "can-edit-end-date": "true", "can-edit-exit-link": "true", "can-edit-start-date": "true", "can-see-admins-page": "true", "can-see-all-answers": "true", "can-edit-login-option": "true", "duration-default-value": "10", "end-date-default-value": "indefinetely", "can-change-company-logo": "true", "exit-link-default-value": "innoduel.com", "can-have-multiple-arenas": "true", "can-add-arena-cover-image": "true", "can-see-full-arena-report": "true", "can-disable-end-screen-results": "true", "can-disable-end-screen-ask-email": "true", "end-screen-results-default-value": "true", "end-screen-ask-email-default-value": "true", "can-enable-end-screen-request-answers": "true", "end-screen-request-answers-default-value": "true"}	t
4	Silver	14900	\N	silver	eur	{"version": "2", "support-type": "Chat", "max-active-arenas": "10", "can-edit-exit-link": "false", "max-active-sessions": "1"}	f
5	Gold	29900	\N	gold	eur	{"version": "2", "support-type": "Phone", "max-active-arenas": "20", "can-edit-exit-link": "true", "max-active-sessions": "5"}	f
\.
SELECT pg_catalog.setval('public.plan_id_seq', 6, false);

COPY public.user_role (id, role_description, created, name) FROM stdin;
1	super-user	2022-11-21 13:41:58.516772	super-user
2	basic-user	2022-11-21 13:41:58.516772	basic-user
3	admin	2022-11-21 13:41:58.516772	admin
4	operator	2022-11-21 13:41:58.516772	operator
5	enterprise	2022-11-21 13:41:58.516772	enterprise
6	enterprise-user	2022-11-21 13:41:58.516772	enterprise-user
7	session-user	2022-11-28 12:18:00.877968	session-user
\.

COPY public.session_slide_type (id, description) FROM stdin;
html	Free form content
arenas-collect	Arena idea collecting
arenas-vote	Arena voting
results-top	Top results
results-bottom	Bottom results
results-links	Result links
title	Title slide
results-top-all	Top results for all arenas
results-bottom-all	Bottom results for all arenas
arenas-vote-links	Voting links for all arenas
\.

-- The business logic depends on these ids being exactly 2 and 3...
COPY public.end_screen (id, description, action_text, screen_type) FROM stdin;
2	Palvelu pyytää lopuksi tutustumaan tuloksiin	Show results	view-results
3	Leave email	Ask for email address	leave-email
\.
SELECT pg_catalog.setval('public.end_screen_id_seq', 4, false);



COPY public.enterprise (id, plan_id, name) FROM stdin;
1	1	Development community
\.
SELECT pg_catalog.setval('public.enterprise_id_seq', 2, true);

COPY public.company (id, name, billing_address, city, zip, country, logo_image_url, plan_id, valid_until, stripe_customer_id, is_trial) FROM stdin;
1	Admin company	Katu 1	Helsinki	00100	Finland	http://localhost:5000/admin-app/img/innoduel-logo.svg	1	2100-01-01 00:00:00	cus_MiMmGKqANADgKn	f
2	User company	Katu 1	Helsinki	00100	Finland	http://localhost:5000/admin-app/img/innoduel-logo.svg	1	2100-01-01 00:00:00	cus_MiMmGKqANADgKm	f
\.
SELECT pg_catalog.setval('public.company_id_seq', 3, true);

COPY public.user_info (id, name, email, password, anon, created, last_login, company_id, marketing_consent) FROM stdin;
1	Jane Doe	admin@example.com	bcrypt+sha512$7c07ff75bf985cd00498909da38f72c8$12$8cdd176a49ae10fbe75b42a405c9a153e9a95c7275ba454b	f	2022-11-21 13:41:58.515331	2022-11-28 08:13:20.815	1	t
2	John Doe	user@example.com	bcrypt+sha512$7c07ff75bf985cd00498909da38f72c8$12$8cdd176a49ae10fbe75b42a405c9a153e9a95c7275ba454b	f	2022-11-21 13:41:58.515331	2022-11-28 08:13:20.815	2	t
3	Default seed idea user	nop@example.com		f	2022-11-21 13:41:58.515331	2022-11-28 08:13:20.815	1	f
\.
SELECT pg_catalog.setval('public.user_id_seq', 4, true);

COPY public.user_role_link (user_id, role_id) FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
2	2
2	3
2	6
2	7
\.

COPY public.company_enterprise_link (id, company_id, enterprise_id) FROM stdin;
1	1	1
2	2	1
\.
SELECT pg_catalog.setval('public.company_enterprise_link_id_seq', 3, true);

COPY public.user_enterprise_link (id, user_id, enterprise_id) FROM stdin;
1	1	1
2	2	1
\.

COPY public.arena (id, name, description, info_text, logo_image_url, image_url, start_date, end_date, arena_order, private, allow_anon, active, pre_moderation, created, duration, login_option, company_id, is_preview, redirect_url, is_deleted, is_deleted_by_user_id, is_deleted_time, language, is_template, voting_disabled, mode, short_url) FROM stdin;
1	Existential questions	\N	To be or not to be?	\N	\N	2023-09-11	\N	\N	t	t	t	t	2023-09-11 10:32:14.073232	0	no-login	1	f	https://hubs.ly/H08Nv1x0	f	\N	\N	en	f	f	automatic	369d4
\.
SELECT pg_catalog.setval('public.arena_id_seq', 2, false);

COPY public.idea (id, idea_text, user_id, arena_id, created, active, win_rate, win_rate_updated, is_deleted, is_deleted_time, is_deleted_by_user_id, is_seed) FROM stdin;
1	To not to be	3	1	2023-09-11 10:32:34.634178	t	\N	2023-09-11 07:35:10.01	f	\N	\N	t
2	To be	3	1	2023-09-11 10:32:34.634178	t	\N	2023-09-11 07:35:10.01	f	\N	\N	t
\.
SELECT pg_catalog.setval('public.idea_id_seq', 3, false);
