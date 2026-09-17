export const authProvider = {
  login: async ({ username, password }: any) => {
    const request = new Request("http://localhost:3000/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data = await response.json();
    localStorage.setItem("token", data.accessToken);
  },

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error: any) => {
    const status = error.status || error.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject({ redirectTo: "/login" });
    }

    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};
