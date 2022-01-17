import { AppState } from "./state/appStateReducer";

/* This could be replaced by axious as always did */

export const save = (payload: AppState) => {
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Error while saving the state.")
      }
    })
}

export const load = () => {
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/load`).then(
    (response) => {
      if (response.ok) {
        return response.json() as Promise<AppState>
      } else {
        throw new Error("Error while loading the state.")
      }
    }
  )
}

/* Other methods like put etc would be done here, but I would prefer to just use Axios within the Types, but I don't know,
this is also kinda great because you could do some type "omit" that would be very useful. */