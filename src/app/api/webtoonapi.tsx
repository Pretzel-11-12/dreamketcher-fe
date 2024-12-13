import axiosInstance from "@/app/utils/axiosInstance";

interface RequestBody {
  code: string;
  email: string;
}

export const fetchWebtoons = async (body: RequestBody) => {
  try {
    const response = await axiosInstance.get("/api/v1/webtoons", {
      params: body,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching webtoons:", error);
    throw error;
  }
};
