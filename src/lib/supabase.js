import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * 쿼리 실행 결과를 표준화된 형식으로 반환
 */
const formatResult = (result) => {
  const { data, error } = result;

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return {
    data: Array.isArray(data) ? data : [data],
    count: data?.length || 0,
  };
};

/**
 * 쿼리 실행을 위한 래퍼 함수
 */
const executeQuery = async (queryBuilder, params = []) => {
  try {
    let result;

    if (typeof queryBuilder === "function") {
      result = await queryBuilder(...params);
    } else {
      result = await queryBuilder;
    }

    return formatResult(result);
  } catch (error) {
    console.error("Query execution error:", {
      error: error.message,
      query: queryBuilder.toString(),
      params,
    });
    throw error;
  }
};

/**
 * 데이터베이스 쿼리 정의
 */
const queries = {
  // Magazine 관련 쿼리
  magazine: {
    getAll: () =>
      supabase
        .from("magazines")
        .select(
          `
          *,
          user:users(nickname)
        `
        )
        .order("created_at", { ascending: false }),

    getById: (id) =>
      supabase
        .from("magazines")
        .select(
          `
          *,
          user:users(nickname)
        `
        )
        .eq("id", id)
        .single(),

    create: (data) => supabase.from("magazines").insert(data).select().single(),

    update: (id, data) =>
      supabase.from("magazines").update(data).eq("id", id).select().single(),

    delete: (id) => supabase.from("magazines").delete().eq("id", id),

    count: () =>
      supabase.from("magazines").select("*", { count: "exact", head: true }),
  },

  // Review 관련 쿼리
  review: {
    getAll: () =>
      supabase
        .from("reviews")
        .select(
          `
          *,
          user:users(nickname)
        `
        )
        .order("created_at", { ascending: false }),

    getById: (id) =>
      supabase
        .from("reviews")
        .select(
          `
          *,
          user:users(nickname)
        `
        )
        .eq("id", id)
        .single(),

    create: (data) => supabase.from("reviews").insert(data).select().single(),

    update: (id, data) =>
      supabase.from("reviews").update(data).eq("id", id).select().single(),

    delete: (id) => supabase.from("reviews").delete().eq("id", id),

    count: () =>
      supabase.from("reviews").select("*", { count: "exact", head: true }),
  },

  // User 관련 쿼리
  user: {
    getById: (id) => supabase.from("users").select("*").eq("id", id).single(),

    getByEmail: (email) =>
      supabase.from("users").select("*").eq("email", email).single(),

    create: (data) => supabase.from("users").insert(data).select().single(),

    update: (id, data) =>
      supabase.from("users").update(data).eq("id", id).select().single(),

    delete: (id) => supabase.from("users").delete().eq("id", id),

    count: () =>
      supabase.from("users").select("*", { count: "exact", head: true }),

    getByRole: (role) =>
      supabase.from("users").select("id, name, email").eq("role", role),
  },
};

/**
 * 쿼리 실행을 위한 메인 함수
 * @param {string} path - 쿼리 경로 (예: 'magazine.getById')
 * @param {Array} params - 쿼리 파라미터
 */
const query = async (path, params = []) => {
  const [category, action] = path.split(".");

  if (!queries[category] || !queries[category][action]) {
    throw new Error(`Query not found: ${path}`);
  }

  const queryBuilder = queries[category][action];
  return executeQuery(queryBuilder, params);
};

export { supabase, query, queries };
