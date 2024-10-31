import useUser from "../utils/hooks/useUser";

const UserPage = () => {
  const { accessToken, protectedData, username, handleProtectedRequest } =
    useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#1c1c22] to-gray-900 text-white">
      <div className="bg-[#1c1c22] text-gray-300  p-8 sm:p-10 md:p-12 rounded-xl shadow-xl border border-gray-700 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl text-center my-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#00ff99]">
          Welcome, {username}
        </h1>

        <p className="mb-4 text-gray-400 text-left">
          <span className="text-lg text-green-400">1. </span>Click on "Access
          Protected Resource" to retrieve protected data using your access
          token.
        </p>
        <p className="mb-4 text-gray-400 text-left ">
          <span className="text-lg text-green-400">2. </span>Wait for 30
          Seconds, then click on 'Access Protected Resource' again to see the
          access token change, along with the iat (issued at) and exp
          (expiration) fields in the Protected Data.
        </p>
        <p className="mb-4 text-gray-400 text-left">
          <span className="text-lg text-green-400">3. </span>If you click on the
          "Access Protected Resource" button before 30 Seconds are up, you will
          notice that nothing happens, as the token has not yet changed.
        </p>
        <p className="mb-4 text-gray-400 text-left">
          <span className="text-lg text-green-400">4. </span>The refresh token
          expires in 2 minutes, allowing access token renewal every 30 seconds
          within that period. Once the refresh token expires, any attempt to
          access protected resources will prompt an alert to log in again,
          indicating the refresh token is no longer valid
        </p>

        <button
          onClick={handleProtectedRequest}
          className="w-full rounded-lg bg-[#00ff99] px-4 py-2 text-[#1c1c22] font-semibold shadow hover:bg-[#00e187]  transition-colors mb-4"
        >
          Access Protected Resource
        </button>
        {protectedData && (
          <div className="flex flex-col gap-2">
            <p className="text-gray-300 bg-[#1c1c22] p-3 rounded-lg border border-gray-700 w-full text-center break-words overflow-auto">
              <span className="text-[#00ff99] text-lg italic">
                Protected Data
              </span>
              :{" "}
              {
                <div>
                  <p>Message: {protectedData.message}</p>
                  <p>Issued At: {protectedData.user.iat}</p>
                  <p>Expiry: {protectedData.user.exp}</p>
                </div>
              }
            </p>
            <p className="text-gray-300 bg-[#1c1c22] p-3 rounded-lg border border-gray-700 w-full text-center break-words overflow-auto">
              <span className="text-[#00ff99] text-lg italic">
                Access Token
              </span>
              : {accessToken}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
