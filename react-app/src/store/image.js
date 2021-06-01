//constraints

const GET_IMAGES = "images/GET_IMAGES";
const GET_FARM_IMAGES = "images/GET_FARM_IMAGES";

const getImages = (images) => ({
    type: GET_IMAGES,
    payload: images
})

const getFarmImages = (images) => ({
    type: GET_FARM_IMAGES,
    payload: images
})

export const getImagesThunk = () => async (dispatch)  => {
    const response = await fetch('/api/images/')
    if (!response.ok) {
      throw response
    }
    const images = await response.json();
    dispatch(getImages(images))
}

export const getFarmImagesThunk = (id) => async (dispatch)  => {
    const response = await fetch(`/api/images/farm/${id}`)
    if (!response.ok) {
      throw response
    }
    const images = await response.json();
    dispatch(getFarmImages(images))
}

const initialState = {}

const imagesReducer = (images = initialState, action) => {
    switch(action.type){
        case GET_IMAGES:
            const imagesPayload = action.payload;
            const newImages = {};
            for (const image of imagesPayload.images){
                newImages[image.id] = image
            }
            return newImages;
        case GET_FARM_IMAGES:
            const farmImagesPayload = action.payload;
            const newFarmImages = {}
            for (const image of farmImagesPayload.images){
                newFarmImages[image.id] = image
            }
            return newFarmImages
        default:
            return images
    }
}

export default imagesReducer;

