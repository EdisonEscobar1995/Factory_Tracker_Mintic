import { ILoginValues, IRol, IUser } from '../Interfaces/Login/login';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, User, UserCredential } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from '../utils/firebaseConfig';
import { getUserById } from './user';

// Metodo con mongo
/* const login = (data: ILoginValues) => {
    return instance.post('login', data);
}; */

const login = (credentials: ILoginValues) => {
  const { email, password } = credentials;
  return signInWithEmailAndPassword(auth, email, password);
}

const loginWithGoogle = async (setAuthentication: Function, setLoading: Function) => {
  try {
    const provider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    if (token) {
      await updateDataUser(user, '');
      const { providerData, uid, email } = user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ providerData, uid, email }));
      setAuthentication({
        logged: true,
        loading: false,
        user
      });
    }
    setLoading(false);
  } catch (error) {
    console.log('Error con google = ', error);
  }
}

const register = (credentials: ILoginValues) => {
  const { email, password } = credentials;
  return createUserWithEmailAndPassword(auth, email, password);
}

const updateDataUser = async (user: User, displayName: string) => {
  try {
    let rolesAux: IRol = {
      seller: true,
    };
    let userDb = await getUserById(user.uid);
    if (userDb) {
      rolesAux = userDb.roles;
    }
    const dataUser: IUser = {
      id: user.uid,
      email: user.email,
      displayName: user.displayName ? user.displayName : displayName,
      roles: rolesAux
    };
    let referencia = doc(db, 'users', user.uid);
    return setDoc(referencia, dataUser);
  } catch (error) {
      
  }
  // return setDoc(doc(db, `users/${user.uid}`, 'LA'), dataUser);
};

const getCurrentUser = async () => {
  let userLogged = null;
  const user = auth.currentUser;
  if (user) {
    let resultado = await getUserById(user.uid);
    userLogged = resultado;
  }
  return userLogged;
};

/* const verifyLogin = () => {
  const user = auth.currentUser;
  console.log('user == ', user);
  if (user) return true;
  return false;
}; */

export {
  login,
  loginWithGoogle,
  updateDataUser,
  register,
  getCurrentUser,
  auth
}
