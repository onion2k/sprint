import firebase from "./firebase";

export const load = project => {
  return function(dispatch, getState) {
    return firebase
      .database()
      .ref("project")
      .once("value")
      .then(
        function(snapshot) {
          dispatch({
            type: "LOAD_PROJECT",
            contents: snapshot.val()
          });
        },
        function(error) {
          console.error(error);
        }
      );
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

export const updateFeature = (history, feature) => {
  return function(dispatch, getState) {
    if (feature.id === undefined) {
      feature.id = Date.now();
    }

    let p = dispatch({
      type: "UPDATE_FEATURE",
      contents: feature
    });

    history.push("/project/" + feature.id);
    return p;
  };
};

export const deleteFeature = (history, feature) => {
  return function(dispatch, getState) {
    let p = dispatch({
      type: "DELETE_FEATURE",
      contents: feature
    });

    history.push("/");
    return p;
  };
};
