import React, {createContext, useState, ReactNode, Dispatch, SetStateAction, FC,} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {User} from "../types";

interface OnLoginOptions {
    shouldNavigate?: boolean;
}

export interface AccountContextValues {
    user: User | null;
    onLogin: (user: User, options?: OnLoginOptions) => void;
    onLogout: () => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const AccountContext = createContext<AccountContextValues>({
    user: null,
    onLogin: () => {
    },
    onLogout: () => {
    },
    isSidebarOpen: false,
    setIsSidebarOpen: () => {}
});

interface AccountProviderProps {
    children: ReactNode;
}

export const AccountProvider: FC<AccountProviderProps> = ({children}) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState<User | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleLogin = (user: User, options: OnLoginOptions = {shouldNavigate: false}) => {
        const {shouldNavigate} = options;
        setUser(user);
        if (shouldNavigate) {
            const origin = location.state?.from || '/'; // remember the origin
            navigate(origin);
        }
    };

    const handleLogout = () => {
        setUser(null);
        navigate("/", {replace: true});
    };

    const contextValues: AccountContextValues = {
        user,
        onLogin: handleLogin,
        onLogout: handleLogout,
        isSidebarOpen,
        setIsSidebarOpen
    }

    return (
        <AccountContext.Provider value={contextValues}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;