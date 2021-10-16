import { collection, getDocs, query, where } from "firebase/firestore";
import { IDataMenu } from "../Interfaces/menu";
import { db } from "../utils/firebaseConfig";
import { getUserById } from "./user";


const getMenus = async (user: any) => {
  const response: IDataMenu[] = [];
  const localMenus = JSON.parse(localStorage.getItem('menus') || '[]');
  if (localMenus.length > 0) return localMenus;
  const userLog = await getUserById(user.uid);
  if (userLog) {
    const consulta = collection(db, 'menus');
    const roles = Object.keys(userLog.roles);
    const q = query(consulta, where("rol", "array-contains-any", roles));
    let resultado = await getDocs(q);
    if (resultado && resultado.docs.length > 0) {
      resultado.docs.forEach(documento => {
        response.push({
          index: documento.data().index,
          rol: documento.data().rol,
        })
      })
    }
    localStorage.setItem('menus', JSON.stringify(response));
  }
  return response;
};

export {
  getMenus
}
