import { createContext } from 'react';

const UserContext = createContext<any>({username: '', setUsernameCB: ()=>{return }});

export default UserContext;