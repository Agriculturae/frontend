interface NavList {
  title: string;
  path: string;
}

interface UserModel {
  id: string;
  name: string;
  surname: string;
  email: string;
  type: string;
  isActive: boolean;
}

interface LoginPayloadUserModel {
  user: UserModel | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
