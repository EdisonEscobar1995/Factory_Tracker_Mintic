import { ILoginValues, IRol, IUser } from '../Interfaces/Login/login';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, User, UserCredential } from "firebase/auth";
import { setDoc, getFirestore, doc } from "firebase/firestore";

// Metodo con mongo
/* const login = (data: ILoginValues) => {
    return instance.post('login', data);
}; */

const auth = getAuth();

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
      const { providerData, uid, email } = user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ providerData, uid, email }));
      setAuthentication({
        logged: true,
        loading: false,
        user
      })
    }
    setLoading(false);
  } catch (error) {
    console.log('Error con google = ', error);
  }
}

const register = (credentials: ILoginValues) => {
  const { email, password, name, lastname } = credentials;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: `${name} ${lastname}`,
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

const updateDataUser = (user: User) => {
  const db = getFirestore();
  // collection(db, 'users').where("author", "==", user.uid).get()
  let rolesAux: IRol = {
    seller: true,
  };
  if (user.email === 'pachaedison@gmail.com') rolesAux = { admin: true };
  const dataUser: IUser = {
    id: user.uid,
    email: user.email,
    displayName: user.displayName ? user.displayName : 'Administrador',
    roles: rolesAux
  }
  let referencia = doc(db, 'users', user.uid);
  return setDoc(referencia, dataUser);
  // return setDoc(doc(db, `users/${user.uid}`, 'LA'), dataUser);
};


export {
  login,
  loginWithGoogle,
  updateDataUser,
  auth
}
