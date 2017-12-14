import {
  DELETE_PROJECT,
  LOAD_PROJECT,
  ADD_PROJECT,
  UPDATE_PROJECT,
  UPDATE_FEATURE
} from "./constants.js";

const initialState = {
  title: "",
  client: "elanders",
  description: "Project desc",
  task: "design",
  risks: "design",
  features: ["abcdef123", "abcdef456", "abcdef789", "abcdef100"],
  feature: {
    abcdef123: { title: "Feature 1" },
    abcdef456: { title: "Feature 2" },
    abcdef789: { title: "Feature 3" },
    abcdef100: { title: "Feature 4" }
  },
  tasks: {
    abcdef123: [
      {
        id: "task123",
        title: "Task 1",
        min: 25,
        max: 50,
        type: "development",
        comments: "Blah blah blah"
      },
      {
        id: "task234",
        title: "Task 2",
        min: 5,
        max: 37.5,
        type: "design",
        comments: ""
      },
      {
        id: "task456",
        title: "Task 3",
        min: 5,
        max: 25,
        type: "projectmanagement",
        comments: ""
      },
      {
        id: "task567",
        title: "Task 4",
        min: 5,
        max: 15,
        type: "development",
        comments: ""
      }
    ],
    abcdef456: [],
    abcdef789: [],
    abcdef100: []
  }
};

export default function project(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECT:
      state.title = action.contents;
      return { ...state };

    case UPDATE_PROJECT:
      state.title = action.contents.title;
      return { ...state };

    case UPDATE_FEATURE:
      console.log("Update feature from reducer: ", action.contents);
      return { ...state };

    case ADD_PROJECT:
      return { project: action.project, contents: action.contents };

    default:
      return state;
  }
}
