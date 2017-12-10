// import firebase from "./firebase";

export const load = project => {
  return function(dispatch, getState) {
    let p = dispatch({
      type: "LOAD_PROJECT",
      contents: project
    });

    return p;
  };
};

export const update = project => {
  return function(dispatch, getState) {
    let p = dispatch({
      type: "UPDATE_PROJECT",
      contents: project
    });

    return p;
  };
};
