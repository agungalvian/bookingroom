--
-- PostgreSQL database dump
--

\restrict GDAFAvSShXwr3fgmQVuUkIzTWbuT8U2mW0ItQ7fFPnaFA7NOy5A893fYflLcuFh

-- Dumped from database version 15.15 (Debian 15.15-1.pgdg13+1)
-- Dumped by pg_dump version 15.15 (Debian 15.15-1.pgdg13+1)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: admin
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO admin;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: admin
--

COMMENT ON SCHEMA public IS '';


--
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'CANCELLED'
);


ALTER TYPE public."BookingStatus" OWNER TO admin;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Booking; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Booking" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "roomId" text NOT NULL,
    title text NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL,
    description text,
    status public."BookingStatus" DEFAULT 'PENDING'::public."BookingStatus" NOT NULL,
    notes text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Booking" OWNER TO admin;

--
-- Name: Room; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Room" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    capacity integer NOT NULL,
    facilities text[],
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Room" OWNER TO admin;

--
-- Name: Setting; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Setting" (
    id text DEFAULT 'global'::text NOT NULL,
    key text NOT NULL,
    value text NOT NULL
);


ALTER TABLE public."Setting" OWNER TO admin;

--
-- Name: User; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    password text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "isLdap" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    username text
);


ALTER TABLE public."User" OWNER TO admin;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO admin;

--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Booking" (id, "userId", "roomId", title, "startTime", "endTime", description, status, notes, "createdAt", "updatedAt") FROM stdin;
cml9ksv520002mg0ugbymbe0t	cml9krlr20000mg0uilvbdx02	ruang-rapat-kecil-1	tes rapat lah	2026-02-06 06:52:00	2026-02-06 10:52:00	ayo rapat	APPROVED	\N	2026-02-05 14:52:53.799	2026-02-05 15:00:07.834
cml9epx1u0001oy0u3vu6ht0a	cml9ei2sd0000o2981ya89ihk	ruang-rapat-kecil-1	tes pesan	2026-02-09 02:00:00	2026-02-09 06:00:00	agenda banyak deh	REJECTED	no	2026-02-05 12:02:38.611	2026-02-05 15:00:19.728
\.


--
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Room" (id, name, description, capacity, facilities, image, "createdAt", "updatedAt") FROM stdin;
ruang-rapat-utama	Ruang Rapat Utama	Lantai 2, Sayap Timur	20	{Projector,"VC System",Whiteboard}	\N	2026-02-05 11:56:32.8	2026-02-05 14:56:09.811
ruang-rapat-kecil-1	Ruang Rapat Kecil 1	Lantai 1, Dekat Lobby	6	{"LED TV",Whiteboard}	\N	2026-02-05 11:56:32.801	2026-02-05 14:56:09.814
executive-lounge	Executive Lounge	Lantai 5	10	{"Premium VC","Coffee Maker",Sofa}	\N	2026-02-05 11:56:32.802	2026-02-05 14:56:09.815
\.


--
-- Data for Name: Setting; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Setting" (id, key, value) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."User" (id, name, email, password, role, "isLdap", "createdAt", "updatedAt", username) FROM stdin;
cml9pcfr00000nr0uu1sksqxo	System admin	sysadm@tapera.go.id	$2b$10$hqnmWeoF/RaNowrywrlOy.y5shCaKiiYHCzRe/8QPj17vgCjoxVAu	ADMIN	f	2026-02-05 17:00:05.437	2026-02-05 17:00:05.437	sysadm
cml9ei2sd0000o2981ya89ihk	Administrator	adminbooking@bptapera.go.id	$2b$10$5NMDI0IKprUpLQLYupNZRuHdHoG/tlckmznq.EkMr4.PFiouNcQ3G	ADMIN	f	2026-02-05 11:56:32.797	2026-02-05 17:00:40.748	admin
cml9krlr20000mg0uilvbdx02	user01	user@tapera.go.id	$2b$10$opQ7E6j1CFxvRa.ODo0oaugJ91WJjgdWwafsHGuwd/CeytVQjwrzy	USER	f	2026-02-05 14:51:54.974	2026-02-05 17:00:53.831	user01
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c8fa42d4-cec0-4fb6-a792-c6a9169c1c9e	55d696fd8c5ecbcb732e8945d5d0e481e5a069bba3ca4216c33335db3fd5e07f	2026-02-05 11:56:32.347968+00	20260205113450_init	\N	\N	2026-02-05 11:56:32.335496+00	1
\.


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY (id);


--
-- Name: Setting Setting_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Setting"
    ADD CONSTRAINT "Setting_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Setting_key_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "Setting_key_key" ON public."Setting" USING btree (key);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Booking Booking_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: admin
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict GDAFAvSShXwr3fgmQVuUkIzTWbuT8U2mW0ItQ7fFPnaFA7NOy5A893fYflLcuFh

