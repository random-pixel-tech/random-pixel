SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."teachers" ("id", "school_name", "teacher_name", "tenant_id") VALUES
	(1, 'Maple High School', 'Mr. Johnson', 'MHS400'),
	(2, 'Maple High School', 'Mrs. Lee', 'MHS400'),
	(3, 'Maple High School', 'Mr. Patel', 'MHS400'),
	(4, 'Maple High School', 'Mrs. Garcia', 'MHS400'),
	(5, 'Maple High School', 'Ms. Smith', 'MHS400'),
	(6, 'Maple High School', 'Mr. Wilson', 'MHS400'),
	(7, 'Maple High School', 'Mr. Thompson', 'MHS400'),
	(8, 'Maple High School', 'Mrs. Martinez', 'MHS400'),
	(9, 'Maple High School', 'Mr. Brown', 'MHS400'),
	(10, 'Maple High School', 'Ms. Nguyen', 'MHS400'),
	(11, 'Maple High School', 'Mrs. White', 'MHS400'),
	(12, 'Maple High School', 'Mr. Rodriguez', 'MHS400'),
	(13, 'Maple High School', 'Ms. Davis', 'MHS400'),
	(14, 'Maple High School', 'Mrs. Taylor', 'MHS400'),
	(15, 'Maple High School', 'Mr. Clark', 'MHS400'),
	(16, 'Maple High School', 'Mrs. Rodriguez', 'MHS400'),
	(17, 'Maple High School', 'Ms. Williams', 'MHS400'),
	(18, 'Maple High School', 'Ms. Martinez', 'MHS400');


--
-- Data for Name: classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."classes" ("id", "school_name", "class_name", "section", "teacher_id", "class_teacher_name", "tenant_id") VALUES
	(1, 'Maple High School', '1', 'A', 1, 'Mr. Johnson', 'MHS400'),
	(2, 'Maple High School', '2', 'A', 2, 'Mrs. Lee', 'MHS400'),
	(3, 'Maple High School', '2', 'B', 3, 'Mr. Patel', 'MHS400'),
	(4, 'Maple High School', '3', 'A', 4, 'Mrs. Garcia', 'MHS400'),
	(5, 'Maple High School', '3', 'B', 5, 'Ms. Smith', 'MHS400'),
	(6, 'Maple High School', '3', 'C', 6, 'Mr. Wilson', 'MHS400'),
	(7, 'Maple High School', '4', 'A', 7, 'Mr. Thompson', 'MHS400'),
	(8, 'Maple High School', '4', 'B', 8, 'Mrs. Martinez', 'MHS400'),
	(9, 'Maple High School', '4', 'C', 9, 'Mr. Brown', 'MHS400'),
	(10, 'Maple High School', '5', 'A', 10, 'Ms. Nguyen', 'MHS400'),
	(11, 'Maple High School', '5', 'B', 11, 'Mrs. White', 'MHS400'),
	(12, 'Maple High School', '6', 'A', 12, 'Mr. Rodriguez', 'MHS400'),
	(13, 'Maple High School', '6', 'B', 13, 'Ms. Davis', 'MHS400'),
	(14, 'Maple High School', '7', NULL, 14, 'Mrs. Taylor', 'MHS400'),
	(15, 'Maple High School', '8', NULL, 15, 'Mr. Clark', 'MHS400'),
	(16, 'Maple High School', '9', NULL, 16, 'Mrs. Rodriguez', 'MHS400'),
	(17, 'Maple High School', '10', NULL, 17, 'Ms. Williams', 'MHS400');


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."students" ("id", "school_name", "student_name", "class_id", "roll_number", "class_name", "section", "scholar_id", "tenant_id") VALUES
	(1, 'Maple High School', 'Alexander Lee', 16, 1, '9', NULL, 'MHS_SI591982', 'MHS400'),
	(2, 'Maple High School', 'Ava Lee', 16, 2, '9', NULL, 'MHS_SI735125', 'MHS400'),
	(3, 'Maple High School', 'Emma Wilson', 16, 3, '9', NULL, 'MHS_SI661789', 'MHS400'),
	(4, 'Maple High School', 'Ethan Davis', 16, 4, '9', NULL, 'MHS_SI302419', 'MHS400'),
	(5, 'Maple High School', 'Isabella Taylor', 16, 5, '9', NULL, 'MHS_SI290816', 'MHS400'),
	(6, 'Maple High School', 'Lucas Garcia', 16, 6, '9', NULL, 'MHS_SI677829', 'MHS400'),
	(7, 'Maple High School', 'Mia Thompson', 16, 7, '9', NULL, 'MHS_SI611735', 'MHS400'),
	(8, 'Maple High School', 'Noah Clark', 16, 8, '9', NULL, 'MHS_SI382321', 'MHS400'),
	(9, 'Maple High School', 'Olivia Brown', 16, 9, '9', NULL, 'MHS_SI296341', 'MHS400'),
	(10, 'Maple High School', 'Sophia Martinez', 16, 10, '9', NULL, 'MHS_SI078109', 'MHS400'),
	(11, 'Maple High School', 'Ava Martinez', 11, 1, '5', 'B', 'MHS_SI942044', 'MHS400'),
	(12, 'Maple High School', 'Chloe Rodriguez', 11, 2, '5', 'B', 'MHS_SI786329', 'MHS400'),
	(13, 'Maple High School', 'Daniel Lee', 11, 3, '5', 'B', 'MHS_SI848569', 'MHS400'),
	(14, 'Maple High School', 'David Nguyen', 11, 4, '5', 'B', 'MHS_SI668840', 'MHS400'),
	(15, 'Maple High School', 'Elijah Taylor', 11, 5, '5', 'B', 'MHS_SI094847', 'MHS400'),
	(16, 'Maple High School', 'Emily Chen', 11, 6, '5', 'B', 'MHS_SI800801', 'MHS400'),
	(17, 'Maple High School', 'Joshua White', 11, 7, '5', 'B', 'MHS_SI954809', 'MHS400'),
	(18, 'Maple High School', 'Madison Patel', 11, 8, '5', 'B', 'MHS_SI828864', 'MHS400'),
	(19, 'Maple High School', 'Mia Clark', 11, 9, '5', 'B', 'MHS_SI943730', 'MHS400'),
	(20, 'Maple High School', 'Samuel Wilson', 11, 10, '5', 'B', 'MHS_SI487085', 'MHS400'),
	(21, 'Maple High School', 'Alexander Taylor', 12, 1, '6', 'A', 'MHS_SI995616', 'MHS400'),
	(22, 'Maple High School', 'Emily Wilson', 12, 2, '6', 'A', 'MHS_SI320530', 'MHS400'),
	(23, 'Maple High School', 'Emma Thompson', 12, 3, '6', 'A', 'MHS_SI298134', 'MHS400'),
	(24, 'Maple High School', 'Ethan Brown', 12, 4, '6', 'A', 'MHS_SI535681', 'MHS400'),
	(25, 'Maple High School', 'Isabella Rodriguez', 12, 5, '6', 'A', 'MHS_SI613114', 'MHS400'),
	(26, 'Maple High School', 'Jacob Smith', 12, 6, '6', 'A', 'MHS_SI658091', 'MHS400'),
	(27, 'Maple High School', 'Michael Johnson', 12, 7, '6', 'A', 'MHS_SI082168', 'MHS400'),
	(28, 'Maple High School', 'Noah Garcia', 12, 8, '6', 'A', 'MHS_SI525303', 'MHS400'),
	(29, 'Maple High School', 'Olivia Davis', 12, 9, '6', 'A', 'MHS_SI402330', 'MHS400'),
	(30, 'Maple High School', 'Sophia Martinez', 12, 10, '6', 'A', 'MHS_SI685155', 'MHS400');


--
-- Data for Name: attendance_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."attendance_records" ("id", "scholar_id", "class_id", "date", "morning_status", "afternoon_status", "morning_comment", "afternoon_comment", "morning_attendance_taken_at", "afternoon_attendance_taken_at", "created_at", "updated_at", "school_name", "tenant_id") OVERRIDING SYSTEM VALUE VALUES
	(1, 'MHS_SI591982', 16, '2024-05-06', 'present', 'present', NULL, NULL, NULL, NULL, '2024-05-06 13:11:53.599141+00', '2024-05-06 13:11:53.599141+00', 'Maple High School', 'MHS400'),
	(2, 'MHS_SI735125', 16, '2024-05-06', 'absent', 'present', NULL, NULL, '2024-05-06 13:22:27.056+00', '2024-05-06 13:22:55.951+00', '2024-05-06 13:22:27.764804+00', '2024-05-06 13:22:27.764804+00', 'Maple High School', 'MHS400'),
	(3, 'MHS_SI661789', 16, '2024-05-06', 'on-leave', NULL, NULL, NULL, '2024-05-06 13:33:06.948+00', NULL, '2024-05-06 13:31:49.244604+00', '2024-05-06 13:31:49.244604+00', 'Maple High School', 'MHS400'),
	(4, 'MHS_SI591982', 16, '2024-05-07', 'present', NULL, NULL, NULL, '2024-05-07 11:45:31.95+00', NULL, '2024-05-07 11:45:32.692622+00', '2024-05-07 11:45:32.692622+00', 'Maple High School', 'MHS400');


--
-- Data for Name: attendance_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: holidays; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."holidays" ("id", "school_name", "holiday_name", "start_date", "end_date", "tenant_id") VALUES
	(1, 'Maple High School', 'Diwali', '2024-10-24', '2024-10-29', 'MHS400'),
	(2, 'Maple High School', 'Republic Day', '2025-01-26', '2025-01-26', 'MHS400'),
	(3, 'Maple High School', 'Holi', '2025-03-09', '2025-03-09', 'MHS400'),
	(4, 'Maple High School', 'Independence Day', '2025-08-15', '2025-08-15', 'MHS400'),
	(5, 'Maple High School', 'Christmas', '2024-12-25', '2025-01-02', 'MHS400');


--
-- Data for Name: school_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."school_info" ("id", "school_name", "tenant_id", "calendar_days_per_week", "calendar_closing_day", "has_two_sessions", "first_session_start_time", "second_session_start_time") VALUES
	(1, 'Maple High School', 'MHS400', 5, 'Friday', 'TRUE', '08:00:00', '13:00:00');


--
-- Data for Name: schools; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."schools" ("id", "school_name", "tenant_id", "created_at", "updated_at") VALUES
	('9b2942a3-aa97-4da1-bd61-ff088b357b21', 'Maple High School', 'MHS400', '2024-05-03 15:40:28.544696+00', '2024-05-03 15:40:28.544696+00');


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."subjects" ("id", "school_name", "subject_name", "tenant_id") VALUES
	(1, 'Maple High School', 'English', 'MHS400'),
	(2, 'Maple High School', 'History', 'MHS400'),
	(3, 'Maple High School', 'Physics', 'MHS400'),
	(4, 'Maple High School', 'Chemistry', 'MHS400'),
	(5, 'Maple High School', 'Biology', 'MHS400');


--
-- Data for Name: subject_teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."subject_teacher" ("id", "school_name", "subject_id", "teacher_id", "class_id", "subject_name", "subject_teacher_name", "class_name", "section", "tenant_id") VALUES
	(1, 'Maple High School', 1, 9, 2, 'English', 'Mr. Brown', '2', 'A', 'MHS400'),
	(2, 'Maple High School', 2, 18, 1, 'History', 'Ms. Martinez', '1', 'A', 'MHS400'),
	(3, 'Maple High School', 3, 7, 16, 'Physics', 'Mr. Thompson', '9', NULL, 'MHS400'),
	(4, 'Maple High School', 4, 11, 5, 'Chemistry', 'Mrs. White', '3', 'B', 'MHS400'),
	(5, 'Maple High School', 5, 12, 13, 'Biology', 'Mr. Rodriguez', '6', 'B', 'MHS400');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: attendance_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."attendance_records_id_seq"', 4, true);


--
-- Name: classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."classes_id_seq"', 17, true);


--
-- Name: holidays_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."holidays_id_seq"', 5, true);


--
-- Name: school_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."school_info_id_seq"', 1, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."students_id_seq"', 30, true);


--
-- Name: subject_teacher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."subject_teacher_id_seq"', 5, true);


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."subjects_id_seq"', 5, true);


--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."teachers_id_seq"', 18, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
