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
  adminState: {},
  docsState: {
    openedvstuplenie: true,
    openedtitul: false,
    openedregister: false,
    openedvyazka: false,
    // openedClubs: false,
    // openedContacts: false,
  }
};
