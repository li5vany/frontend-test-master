import {client} from "./createRestApiClient";

export default () => ({
  getJobs: ({description = "", page = "", location = "", full_time = false}) => client.request(
    {
      method: 'GET',
      url: `positions.json?description=${description}&page=${page}&location=${location}&full_time=${full_time ? "on" : ""}`
    }
  )
})