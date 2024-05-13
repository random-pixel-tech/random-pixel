
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

CREATE SCHEMA IF NOT EXISTS "public";

ALTER SCHEMA "public" OWNER TO "pg_database_owner";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."generate_scholar_id"("tenant_id" character varying) RETURNS character varying
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  max_numeric_part INTEGER;
  new_scholar_id VARCHAR(20);
BEGIN
  -- Get the maximum numeric part of the scholar_id for the given tenant_id
  SELECT COALESCE(MAX(SUBSTRING(scholar_id, '[0-9]+')::INTEGER), 0) INTO max_numeric_part
  FROM students
  WHERE students.tenant_id = generate_scholar_id.tenant_id;
  
  -- Generate the new scholar_id by incrementing the maximum numeric part
  new_scholar_id := tenant_id || '_' || LPAD((max_numeric_part + 1)::TEXT, 6, '0');
  
  RETURN new_scholar_id;
END;
$$;

ALTER FUNCTION "public"."generate_scholar_id"("tenant_id" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."generate_scholar_id_new"("school_name" character varying) RETURNS character varying
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  school_initials VARCHAR(10);
  new_scholar_id VARCHAR(20);
BEGIN
  -- Extract school initials from the school name
  SELECT UPPER(STRING_AGG(LEFT(word, 1), '')) INTO school_initials
  FROM UNNEST(STRING_TO_ARRAY(school_name, ' ')) AS word;
  
  LOOP
    -- Generate a new scholar_id with school initials and random number
    new_scholar_id := school_initials || '_SI' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
    
    -- Check if the generated scholar_id already exists in the students table
    IF NOT EXISTS (SELECT 1 FROM students WHERE scholar_id = new_scholar_id) THEN
      -- If the scholar_id is unique, exit the loop and return it
      EXIT;
    END IF;
  END LOOP;
  
  RETURN new_scholar_id;
END;
$$;

ALTER FUNCTION "public"."generate_scholar_id_new"("school_name" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."generate_tenant_id"("school_name" character varying) RETURNS character varying
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  words TEXT[];
  initials VARCHAR(10) := '';
  i INT;
BEGIN
  words := string_to_array(school_name, ' ');
  FOR i IN 1..array_length(words, 1) LOOP
    initials := initials || UPPER(LEFT(words[i], 1));
  END LOOP;
  RETURN initials || LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');
END;
$$;

ALTER FUNCTION "public"."generate_tenant_id"("school_name" character varying) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_attendance_records"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the school_name and tenant_id in the attendance_records table based on the school_info table
  SELECT school_name, tenant_id INTO NEW.school_name, NEW.tenant_id
  FROM school_info
  WHERE school_name = (SELECT school_name FROM students WHERE scholar_id = NEW.scholar_id);
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_attendance_records"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_attendance_reports"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the school_name and tenant_id in the attendance_reports table based on the school_info table
  SELECT school_name, tenant_id INTO NEW.school_name, NEW.tenant_id
  FROM school_info
  WHERE school_name = (SELECT school_name FROM teachers WHERE id = NEW.teacher_id);
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_attendance_reports"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_class_teacher"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the tenant_id in the class_teacher table based on the school_info table
  NEW.tenant_id := (SELECT tenant_id FROM school_info LIMIT 1);
  
  -- Update class_id based on class_name and section
  NEW.class_id := (
    SELECT id FROM classes
    WHERE class_name = NEW.class_name AND section = NEW.section AND tenant_id = NEW.tenant_id
  );
  
  -- Update teacher_id based on teacher_name
  NEW.teacher_id := (
    SELECT id FROM teachers
    WHERE teacher_name = NEW.teacher_name AND tenant_id = NEW.tenant_id
  );
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_class_teacher"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_class_teacher_foreign_keys"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Update class_id
  UPDATE class_teacher
  SET class_id = classes.id
  FROM classes
  WHERE class_teacher.class_name = classes.class_name AND class_teacher.section = classes.section AND class_teacher.tenant_id = classes.tenant_id AND class_teacher.id = NEW.id;

  -- Update teacher_id
  UPDATE class_teacher
  SET teacher_id = teachers.id
  FROM teachers
  WHERE class_teacher.teacher_name = teachers.teacher_name AND class_teacher.tenant_id = teachers.tenant_id AND class_teacher.id = NEW.id;

  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_class_teacher_foreign_keys"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_classes"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the school_name and tenant_id in the classes table based on the school_info table
  SELECT school_name, tenant_id INTO NEW.school_name, NEW.tenant_id
  FROM school_info
  WHERE school_name = NEW.school_name;
  
  -- Update teacher_id based on class_teacher_name and school_name
  NEW.teacher_id := (
    SELECT id FROM teachers
    WHERE teacher_name = NEW.class_teacher_name AND school_name = NEW.school_name
  );
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_classes"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_holidays"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the school_name and tenant_id in the holidays table based on the school_info table
  SELECT school_name, tenant_id INTO NEW.school_name, NEW.tenant_id
  FROM school_info
  WHERE school_name = NEW.school_name;
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_holidays"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_school_info"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_tenant_id VARCHAR(10);
BEGIN
  -- Check if the tenant_id is already provided
  IF NEW.tenant_id IS NULL THEN
    -- Generate tenant_id based on school name initials
    v_tenant_id := generate_tenant_id(NEW.school_name);
    
    -- Insert the school into the schools table
    INSERT INTO schools (school_name, tenant_id)
    VALUES (NEW.school_name, v_tenant_id);
    
    -- Set the tenant_id in the school_info table
    NEW.tenant_id := v_tenant_id;
  END IF;
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_school_info"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_school_info_tenant_id"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  v_tenant_id VARCHAR(10);
BEGIN
  v_tenant_id := generate_tenant_id(NEW.school_name);
  
  -- Insert the school into the schools table
  INSERT INTO schools (school_name, tenant_id)
  VALUES (NEW.school_name, v_tenant_id);
  
  -- Set the tenant_id in the school_info table
  NEW.tenant_id := v_tenant_id;
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_school_info_tenant_id"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_students"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the tenant_id in the students table based on the school_name from the school_info table
  SELECT si.tenant_id INTO NEW.tenant_id
  FROM school_info si
  WHERE si.school_name = NEW.school_name;

  -- Update class_id based on class_name, section, and school_name
  NEW.class_id := (
    SELECT id FROM classes
    WHERE class_name = NEW.class_name AND (section = NEW.section OR (section IS NULL AND NEW.section IS NULL)) AND school_name = NEW.school_name
  );
  
  -- Generate scholar_id if not provided
  IF NEW.scholar_id IS NULL THEN
    NEW.scholar_id := generate_scholar_id_new(NEW.school_name);
  END IF;
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_students"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_students_foreign_keys"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Update class_id
  UPDATE students
  SET class_id = classes.id
  FROM classes
  WHERE students.class_name = classes.class_name AND students.section = classes.section AND students.tenant_id = classes.tenant_id AND students.id = NEW.id;

  -- Generate scholar_id if not provided
  IF NEW.scholar_id IS NULL THEN
    NEW.scholar_id := generate_scholar_id(NEW.tenant_id);
  END IF;

  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_students_foreign_keys"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_subject_teacher"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the school_name and tenant_id in the subject_teacher table based on the school_info table
  SELECT school_name, tenant_id INTO NEW.school_name, NEW.tenant_id
  FROM school_info
  WHERE school_name = NEW.school_name;
  
  -- Update subject_id based on subject_name and school_name
  NEW.subject_id := (
    SELECT id FROM subjects
    WHERE subject_name = NEW.subject_name AND school_name = NEW.school_name
  );
  
  -- Update teacher_id based on subject_teacher_name and school_name
  NEW.teacher_id := (
    SELECT id FROM teachers
    WHERE teacher_name = NEW.subject_teacher_name AND school_name = NEW.school_name
  );
  
  -- Update class_id based on class_name, section, and school_name
  NEW.class_id := (
    SELECT id FROM classes
    WHERE class_name = NEW.class_name AND (section = NEW.section OR (section IS NULL AND NEW.section IS NULL)) AND school_name = NEW.school_name
  );
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_subject_teacher"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_subject_teacher_foreign_keys"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Update subject_id
  UPDATE subject_teacher
  SET subject_id = subjects.id
  FROM subjects
  WHERE subject_teacher.subject_name = subjects.subject_name AND subject_teacher.tenant_id = subjects.tenant_id AND subject_teacher.id = NEW.id;

  -- Update teacher_id
  UPDATE subject_teacher
  SET teacher_id = teachers.id
  FROM teachers
  WHERE subject_teacher.teacher_name = teachers.teacher_name AND subject_teacher.tenant_id = teachers.tenant_id AND subject_teacher.id = NEW.id;

  -- Update class_id
  UPDATE subject_teacher
  SET class_id = classes.id
  FROM classes
  WHERE subject_teacher.class_name = classes.class_name AND subject_teacher.section = classes.section AND subject_teacher.tenant_id = classes.tenant_id AND subject_teacher.id = NEW.id;

  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_subject_teacher_foreign_keys"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_subjects"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the school_name and tenant_id in the subjects table based on the school_info table
  SELECT school_name, tenant_id INTO NEW.school_name, NEW.tenant_id
  FROM school_info
  WHERE school_name = NEW.school_name;
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_subjects"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."update_teachers"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  -- Set the school_name and tenant_id in the teachers table based on the school_info table
  SELECT school_name, tenant_id INTO NEW.school_name, NEW.tenant_id
  FROM school_info
  WHERE school_name = NEW.school_name;
  
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."update_teachers"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."attendance_records" (
    "id" bigint NOT NULL,
    "scholar_id" character varying(20) NOT NULL,
    "class_id" integer NOT NULL,
    "date" "date" NOT NULL,
    "morning_status" "text",
    "afternoon_status" "text",
    "morning_comment" "text",
    "afternoon_comment" "text",
    "morning_attendance_taken_at" timestamp with time zone,
    "afternoon_attendance_taken_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "school_name" character varying(255),
    "tenant_id" character varying(10),
    CONSTRAINT "attendance_records_afternoon_status_check" CHECK (("afternoon_status" = ANY (ARRAY['present'::"text", 'absent'::"text", 'on-leave'::"text"]))),
    CONSTRAINT "attendance_records_morning_status_check" CHECK (("morning_status" = ANY (ARRAY['present'::"text", 'absent'::"text", 'on-leave'::"text"])))
);

ALTER TABLE "public"."attendance_records" OWNER TO "postgres";

ALTER TABLE "public"."attendance_records" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."attendance_records_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."attendance_reports" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "teacher_id" integer NOT NULL,
    "report_type" "text" NOT NULL,
    "report_scope" "text" NOT NULL,
    "scholar_id" character varying(20),
    "class_id" integer,
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "report_data" "jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "school_name" character varying(255),
    "tenant_id" character varying(10),
    CONSTRAINT "attendance_reports_report_scope_check" CHECK (("report_scope" = ANY (ARRAY['week'::"text", 'month'::"text", 'year'::"text", 'overall'::"text"]))),
    CONSTRAINT "attendance_reports_report_type_check" CHECK (("report_type" = ANY (ARRAY['student'::"text", 'class'::"text"])))
);

ALTER TABLE "public"."attendance_reports" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."classes" (
    "id" integer NOT NULL,
    "school_name" character varying(255),
    "class_name" character varying(255) NOT NULL,
    "section" character varying(255),
    "teacher_id" integer,
    "class_teacher_name" character varying(255),
    "tenant_id" character varying(10)
);

ALTER TABLE "public"."classes" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."classes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."classes_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."classes_id_seq" OWNED BY "public"."classes"."id";

CREATE TABLE IF NOT EXISTS "public"."holidays" (
    "id" integer NOT NULL,
    "school_name" character varying(255),
    "holiday_name" character varying(255) NOT NULL,
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "tenant_id" character varying(10)
);

ALTER TABLE "public"."holidays" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."holidays_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."holidays_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."holidays_id_seq" OWNED BY "public"."holidays"."id";

CREATE TABLE IF NOT EXISTS "public"."school_info" (
    "id" integer NOT NULL,
    "school_name" character varying(255) NOT NULL,
    "tenant_id" character varying(10),
    "calendar_days_per_week" integer,
    "calendar_closing_day" character varying(255),
    "has_two_sessions" character varying(10),
    "first_session_start_time" time without time zone,
    "second_session_start_time" time without time zone,
    CONSTRAINT "check_has_two_sessions" CHECK (("upper"(("has_two_sessions")::"text") = ANY (ARRAY['TRUE'::"text", 'FALSE'::"text"])))
);

ALTER TABLE "public"."school_info" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."school_info_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."school_info_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."school_info_id_seq" OWNED BY "public"."school_info"."id";

CREATE TABLE IF NOT EXISTS "public"."schools" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "school_name" "text" NOT NULL,
    "tenant_id" character varying(10) NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "public"."schools" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."students" (
    "id" integer NOT NULL,
    "school_name" character varying(255),
    "student_name" character varying(255) NOT NULL,
    "class_id" integer,
    "roll_number" integer NOT NULL,
    "class_name" character varying(255),
    "section" character varying(255),
    "scholar_id" character varying(20),
    "tenant_id" character varying(10)
);

ALTER TABLE "public"."students" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."students_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."students_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."students_id_seq" OWNED BY "public"."students"."id";

CREATE TABLE IF NOT EXISTS "public"."subject_teacher" (
    "id" integer NOT NULL,
    "school_name" character varying(255),
    "subject_id" integer,
    "teacher_id" integer,
    "class_id" integer,
    "subject_name" character varying(255),
    "subject_teacher_name" character varying(255),
    "class_name" character varying(255),
    "section" character varying(255),
    "tenant_id" character varying(10)
);

ALTER TABLE "public"."subject_teacher" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."subject_teacher_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."subject_teacher_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."subject_teacher_id_seq" OWNED BY "public"."subject_teacher"."id";

CREATE TABLE IF NOT EXISTS "public"."subjects" (
    "id" integer NOT NULL,
    "school_name" character varying(255),
    "subject_name" character varying(255) NOT NULL,
    "tenant_id" character varying(10)
);

ALTER TABLE "public"."subjects" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."subjects_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."subjects_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."subjects_id_seq" OWNED BY "public"."subjects"."id";

CREATE TABLE IF NOT EXISTS "public"."teachers" (
    "id" integer NOT NULL,
    "school_name" character varying(255),
    "teacher_name" character varying(255) NOT NULL,
    "tenant_id" character varying(10)
);

ALTER TABLE "public"."teachers" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."teachers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."teachers_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."teachers_id_seq" OWNED BY "public"."teachers"."id";

ALTER TABLE ONLY "public"."classes" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."classes_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."holidays" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."holidays_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."school_info" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."school_info_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."students" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."students_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."subject_teacher" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."subject_teacher_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."subjects" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."subjects_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."teachers" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."teachers_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."attendance_records"
    ADD CONSTRAINT "attendance_records_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."attendance_records"
    ADD CONSTRAINT "attendance_records_scholar_id_date_key" UNIQUE ("scholar_id", "date");

ALTER TABLE ONLY "public"."attendance_reports"
    ADD CONSTRAINT "attendance_reports_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."holidays"
    ADD CONSTRAINT "holidays_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."school_info"
    ADD CONSTRAINT "school_info_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."schools"
    ADD CONSTRAINT "schools_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."schools"
    ADD CONSTRAINT "schools_tenant_id_key" UNIQUE ("tenant_id");

ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_scholar_id_key" UNIQUE ("scholar_id");

ALTER TABLE ONLY "public"."subject_teacher"
    ADD CONSTRAINT "subject_teacher_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."subjects"
    ADD CONSTRAINT "subjects_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."teachers"
    ADD CONSTRAINT "teachers_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE TRIGGER "update_attendance_records_trigger" BEFORE INSERT ON "public"."attendance_records" FOR EACH ROW EXECUTE FUNCTION "public"."update_attendance_records"();

CREATE OR REPLACE TRIGGER "update_attendance_reports_trigger" BEFORE INSERT ON "public"."attendance_reports" FOR EACH ROW EXECUTE FUNCTION "public"."update_attendance_reports"();

CREATE OR REPLACE TRIGGER "update_classes_trigger" BEFORE INSERT ON "public"."classes" FOR EACH ROW EXECUTE FUNCTION "public"."update_classes"();

CREATE OR REPLACE TRIGGER "update_holidays_trigger" BEFORE INSERT ON "public"."holidays" FOR EACH ROW EXECUTE FUNCTION "public"."update_holidays"();

CREATE OR REPLACE TRIGGER "update_school_info_trigger" BEFORE INSERT ON "public"."school_info" FOR EACH ROW EXECUTE FUNCTION "public"."update_school_info"();

CREATE OR REPLACE TRIGGER "update_students_trigger" BEFORE INSERT ON "public"."students" FOR EACH ROW EXECUTE FUNCTION "public"."update_students"();

CREATE OR REPLACE TRIGGER "update_subject_teacher_trigger" BEFORE INSERT ON "public"."subject_teacher" FOR EACH ROW EXECUTE FUNCTION "public"."update_subject_teacher"();

CREATE OR REPLACE TRIGGER "update_subjects_trigger" BEFORE INSERT ON "public"."subjects" FOR EACH ROW EXECUTE FUNCTION "public"."update_subjects"();

CREATE OR REPLACE TRIGGER "update_teachers_trigger" BEFORE INSERT ON "public"."teachers" FOR EACH ROW EXECUTE FUNCTION "public"."update_teachers"();

ALTER TABLE ONLY "public"."attendance_records"
    ADD CONSTRAINT "attendance_records_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id");

ALTER TABLE ONLY "public"."attendance_records"
    ADD CONSTRAINT "attendance_records_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "public"."students"("scholar_id");

ALTER TABLE ONLY "public"."attendance_reports"
    ADD CONSTRAINT "attendance_reports_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id");

ALTER TABLE ONLY "public"."attendance_reports"
    ADD CONSTRAINT "attendance_reports_scholar_id_fkey" FOREIGN KEY ("scholar_id") REFERENCES "public"."students"("scholar_id");

ALTER TABLE ONLY "public"."attendance_reports"
    ADD CONSTRAINT "attendance_reports_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id");

ALTER TABLE ONLY "public"."classes"
    ADD CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id");

ALTER TABLE ONLY "public"."students"
    ADD CONSTRAINT "students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id");

ALTER TABLE ONLY "public"."subject_teacher"
    ADD CONSTRAINT "subject_teacher_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("id");

ALTER TABLE ONLY "public"."subject_teacher"
    ADD CONSTRAINT "subject_teacher_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id");

ALTER TABLE ONLY "public"."subject_teacher"
    ADD CONSTRAINT "subject_teacher_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id");

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."generate_scholar_id"("tenant_id" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."generate_scholar_id"("tenant_id" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_scholar_id"("tenant_id" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."generate_scholar_id_new"("school_name" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."generate_scholar_id_new"("school_name" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_scholar_id_new"("school_name" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."generate_tenant_id"("school_name" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."generate_tenant_id"("school_name" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."generate_tenant_id"("school_name" character varying) TO "service_role";

GRANT ALL ON FUNCTION "public"."update_attendance_records"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_attendance_records"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_attendance_records"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_attendance_reports"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_attendance_reports"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_attendance_reports"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_class_teacher"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_class_teacher"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_class_teacher"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_class_teacher_foreign_keys"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_class_teacher_foreign_keys"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_class_teacher_foreign_keys"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_classes"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_classes"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_classes"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_holidays"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_holidays"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_holidays"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_school_info"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_school_info"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_school_info"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_school_info_tenant_id"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_school_info_tenant_id"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_school_info_tenant_id"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_students"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_students"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_students"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_students_foreign_keys"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_students_foreign_keys"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_students_foreign_keys"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_subject_teacher"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_subject_teacher"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_subject_teacher"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_subject_teacher_foreign_keys"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_subject_teacher_foreign_keys"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_subject_teacher_foreign_keys"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_subjects"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_subjects"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_subjects"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_teachers"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_teachers"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_teachers"() TO "service_role";

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

GRANT ALL ON SEQUENCE "public"."classes_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."classes_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."classes_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."holidays" TO "anon";
GRANT ALL ON TABLE "public"."holidays" TO "authenticated";
GRANT ALL ON TABLE "public"."holidays" TO "service_role";

GRANT ALL ON SEQUENCE "public"."holidays_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."holidays_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."holidays_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."school_info" TO "anon";
GRANT ALL ON TABLE "public"."school_info" TO "authenticated";
GRANT ALL ON TABLE "public"."school_info" TO "service_role";

GRANT ALL ON SEQUENCE "public"."school_info_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."school_info_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."school_info_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."schools" TO "anon";
GRANT ALL ON TABLE "public"."schools" TO "authenticated";
GRANT ALL ON TABLE "public"."schools" TO "service_role";

GRANT ALL ON TABLE "public"."students" TO "anon";
GRANT ALL ON TABLE "public"."students" TO "authenticated";
GRANT ALL ON TABLE "public"."students" TO "service_role";

GRANT ALL ON SEQUENCE "public"."students_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."students_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."students_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."subject_teacher" TO "anon";
GRANT ALL ON TABLE "public"."subject_teacher" TO "authenticated";
GRANT ALL ON TABLE "public"."subject_teacher" TO "service_role";

GRANT ALL ON SEQUENCE "public"."subject_teacher_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subject_teacher_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subject_teacher_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."subjects" TO "anon";
GRANT ALL ON TABLE "public"."subjects" TO "authenticated";
GRANT ALL ON TABLE "public"."subjects" TO "service_role";

GRANT ALL ON SEQUENCE "public"."subjects_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subjects_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subjects_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."teachers" TO "anon";
GRANT ALL ON TABLE "public"."teachers" TO "authenticated";
GRANT ALL ON TABLE "public"."teachers" TO "service_role";

GRANT ALL ON SEQUENCE "public"."teachers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."teachers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."teachers_id_seq" TO "service_role";

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
