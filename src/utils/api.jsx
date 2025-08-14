import axiosInstance from "./axiosInstance";
import { useQuery } from "@tanstack/react-query"


export const useGetWeather = (lat, long) => {
    return useQuery({
        queryKey: ["weatherData"],
        queryFn: async () => await axiosInstance.get(
            `/weather?latitude=${lat}&longitude=${long}`
        ),
    });
}