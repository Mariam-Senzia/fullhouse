import useStore from "../store/useStore";

const RefreshAccessToken = async () => {
  const { tokens, setTokens } = useStore.getState();

  const response = await fetch(
    "https://fullhouse-ktih.onrender.com/api/v1/auth/refresh",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens?.refresh_token}`,
      },
    }
  );

  const data = await response.json();

  setTokens({
    access_token: data.access_token,
    refresh_token: tokens?.refresh_token as string,
  });

  return data.access_token;
};

export default RefreshAccessToken;
