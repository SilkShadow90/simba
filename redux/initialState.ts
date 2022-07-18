export const initialState = {
  usersState: {
    isLoading: false,
    isError: false,
    users: [],
  },
  userState: {
    isLoading: false,
    isError: false,
    user: null,
    id: undefined,
  },
  adminState: {
    openedMain: false,
    openedCats: false,
    openedDocs: false,
    openedShows: false,
    openedClubs: false,
    openedContacts: false,
  }
};
