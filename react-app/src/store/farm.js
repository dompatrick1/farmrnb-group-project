//constraints

const GET_FARMS = "farms/GET_FARMS";
const GET_ONE_FARM = "farms/GET_ONE_FARM";

const getFarms = (farms) => ({
  type: GET_FARMS,
  payload: farms
})

const getOneFarm = (farm) => ({
  type: GET_ONE_FARM,
  payload: farm
})

//thunks

export const getFarmsThunk = () => async (dispatch) => {
  const response = await fetch('/api/farms/')
  if (!response.ok) {
    throw response
  }
  const farms = await response.json();
  dispatch(getFarms(farms))
}

export const getOneFarmThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/farms/${id}`)
  if (!response.ok) {
    throw response
  }
  const farm = await response.json();
  dispatch(getOneFarm(farm))
}

const initialState = {}

const farmsReducer = (farms = initialState, action) => {
  switch (action.type) {
    case GET_FARMS:
      const farmsPayload = action.payload
      const newFarms = {};
      for (const farm of farmsPayload.farms) {
        newFarms[farm.id] = farm
      }
      return newFarms;
    case GET_ONE_FARM:
      const farmPayload = action.payload
      return farmPayload
    default:
      return farms;
  }
}

export default farmsReducer;
