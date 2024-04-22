
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

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."attendance_records" (
    "id" bigint NOT NULL,
    "studentId" "uuid" NOT NULL,
    "classId" "uuid" NOT NULL,
    "date" "date" NOT NULL,
    "morningStatus" "text",
    "afternoonStatus" "text",
    "morningComment" "text",
    "afternoonComment" "text",
    "morningAttendanceTakenAt" timestamp with time zone,
    "afternoonAttendanceTakenAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "attendance_records_afternoonStatus_check" CHECK (("afternoonStatus" = ANY (ARRAY['present'::"text", 'absent'::"text", 'on-leave'::"text"]))),
    CONSTRAINT "attendance_records_morningStatus_check" CHECK (("morningStatus" = ANY (ARRAY['present'::"text", 'absent'::"text", 'on-leave'::"text"])))
);

ALTER TABLE "public"."attendance_records" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."attendance_records_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."attendance_records_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."attendance_records_id_seq" OWNED BY "public"."attendance_records"."id";

CREATE TABLE IF NOT EXISTS "public"."attendance_reports" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "teacherId" "uuid" NOT NULL,
    "reportType" "text" NOT NULL,
    "reportScope" "text" NOT NULL,
    "studentId" "uuid",
    "classId" "uuid",
    "startDate" "date" NOT NULL,
    "endDate" "date" NOT NULL,
    "reportData" "jsonb" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "attendance_reports_reportScope_check" CHECK (("reportScope" = ANY (ARRAY['week'::"text", 'month'::"text", 'year'::"text", 'overall'::"text"]))),
    CONSTRAINT "attendance_reports_reportType_check" CHECK (("reportType" = ANY (ARRAY['student'::"text", 'class'::"text"])))
);

ALTER TABLE "public"."attendance_reports" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."classes" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "teacherId" "uuid" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "section" "text" DEFAULT 'A'::"text" NOT NULL
);

ALTER TABLE "public"."classes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."students" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "studentId" "text" NOT NULL,
    "classId" "uuid" NOT NULL,
    "rollNumber" integer,
    "createdAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);

ALTER TABLE "public"."students" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."teachers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "email" "text" NOT NULL,
    "passwordHash" "text" NOT NULL,
    "name" "text" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);

ALTER TABLE "public"."teachers" OWNER TO "postgres";

ALTER TABLE ONLY "public"."attendance_records" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."attendance_records_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."attendance_records"
    ADD CONSTRAINT "attendance_records_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."attendance_reports"
    ADD CONSTRAINT "attendance_reports_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_studentId_key" UNIQUE ("studentId");

ALTER TABLE ONLY "public"."teachers"
    ADD CONSTRAINT "teachers_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."teachers"
    ADD CONSTRAINT "teachers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."attendance_records"
    ADD CONSTRAINT "unique_studentId_date" UNIQUE ("studentId", "date");

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "unique_teacherId" UNIQUE ("teacherId", "section", "name");

CREATE INDEX "attendance_records_studentId_classId_date_idx" ON "public"."attendance_records" USING "btree" ("studentId", "classId", "date");

CREATE INDEX "attendance_reports_teacherId_reportType_reportScope_student_idx" ON "public"."attendance_reports" USING "btree" ("teacherId", "reportType", "reportScope", "studentId", "classId", "startDate", "endDate");

CREATE INDEX "students_classId_idx" ON "public"."students" USING "btree" ("classId");

ALTER TABLE ONLY "public"."attendance_records"
    ADD CONSTRAINT "attendance_records_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id");

ALTER TABLE ONLY "public"."attendance_records"
    ADD CONSTRAINT "attendance_records_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."students"("id");

ALTER TABLE ONLY "public"."attendance_reports"
    ADD CONSTRAINT "attendance_reports_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id");

ALTER TABLE ONLY "public"."attendance_reports"
    ADD CONSTRAINT "attendance_reports_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."students"("id");

ALTER TABLE ONLY "public"."attendance_reports"
    ADD CONSTRAINT "attendance_reports_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."teachers"("id");

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "public"."teachers"("id");

ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classes"("id");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."attendance_records" TO "anon";
GRANT ALL ON TABLE "public"."attendance_records" TO "authenticated";
GRANT ALL ON TABLE "public"."attendance_records" TO "service_role";

GRANT ALL ON SEQUENCE "public"."attendance_records_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."attendance_records_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."attendance_records_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."attendance_reports" TO "anon";
GRANT ALL ON TABLE "public"."attendance_reports" TO "authenticated";
GRANT ALL ON TABLE "public"."attendance_reports" TO "service_role";

GRANT ALL ON TABLE "public"."classes" TO "anon";
GRANT ALL ON TABLE "public"."classes" TO "authenticated";
GRANT ALL ON TABLE "public"."classes" TO "service_role";

GRANT ALL ON TABLE "public"."students" TO "anon";
GRANT ALL ON TABLE "public"."students" TO "authenticated";
GRANT ALL ON TABLE "public"."students" TO "service_role";

GRANT ALL ON TABLE "public"."teachers" TO "anon";
GRANT ALL ON TABLE "public"."teachers" TO "authenticated";
GRANT ALL ON TABLE "public"."teachers" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
