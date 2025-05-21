export const BASE_URL = "https://polling-app-ke30.onrender.com";

// utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "api/v1/auth/login",
    REGISTER: "api/v1/auth/register",
    GET_USER_INFO: "api/v1/auth/getUser",
    UPDATE_PROFILE: "api/v1/auth/update",
  },
  POLLS: {
    CREATE: "/api/v1/poll/create",
    GET_ALL: "/api/v1/poll/getAllPolls",
    GET_BY_ID: (pollId) => `api/v1/poll/${pollId}`,
    VOTE: (pollId) => `api/v1/poll/${pollId}/vote`,
    CLOSE: (pollId) => `api/v1/poll/${pollId}/close`,
    BOOKMARK: (pollId) => `api/v1/poll/${pollId}/bookmark`,
    GET_BOOKMARKED: `api/v1/poll/user/bookmarked`,
    VOTED_POLLS: `api/v1/poll/votedPolls`,
    DELETE: (pollId) => `api/v1/poll/${pollId}/delete`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "api/v1/auth/upload-image",
  },
};
