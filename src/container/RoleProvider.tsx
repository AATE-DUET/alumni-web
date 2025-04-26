import { createContext, FC, ReactNode, useContext } from "react";

interface SuperUserContext {
  isSuperUser?: boolean;
  isModarator?: boolean;
  isAdmin?: boolean;
  userID?: string | number;
}

const RoleContext = createContext<SuperUserContext>({
  isSuperUser: false,
  isModarator: false,
  isAdmin: false,
  userID: "",
});
export const useUserDetails = () => useContext(RoleContext);

type FeaturesProviderProps = {
  children: ReactNode;
};

const ProfileProvider: FC<FeaturesProviderProps> = (props) => {
  const userProfile = JSON.parse(localStorage.getItem("user-profile") || "[]");

  return (
    <RoleContext.Provider
      value={{
        userID: userProfile?.id,
        isSuperUser: userProfile?.role === 'admin',
        isAdmin: userProfile?.role === 'admin',
        isModarator: userProfile?.role == 'moderator',
      }}
    >
      {props.children}
    </RoleContext.Provider>
  );
};

export default ProfileProvider;
