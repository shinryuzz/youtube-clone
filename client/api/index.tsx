import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videoBase = `${base}/api/videos`;

export function registerUser(payload: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}) {
  return axios.post(userBase, payload).then((res) => res.data);
}

export function login(payload: { email: string; password: string }) {
  return axios
    .post(authBase, payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
}

export function getMe() {
  return axios
    .get(userBase, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch(() => {
      return null;
    });
}

export function uploadVideo({
  formData,
  config,
}: {
  formData: FormData;
  config: { onUploadProgress: (progressEvent: any) => void };
}) {
  return axios
    .post(videoBase, formData, {
      withCredentials: true,
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function updateVideo({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) {
  return axios.patch(`${videoBase}/${videoId}`, payload, {
    withCredentials: true,
  });
}

export function getVideos() {
  return axios.get(videoBase).then((res) => res.data);
}
